import {
  Avatar,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState, useEffect } from "react";

const memberImages = [
  "/sin-san.png",
  "/makochi-san.png",
  "/nurse-san.png",
  "/keity-san.png",
];


const CustomTextField = ({
    label,
    value,
    onChange,
    typographyVariant = "body1",
    fullWidth = true,
  }) => (
    <Stack spacing={1.5} width={fullWidth ? "100%" : "auto"}>
      <Typography variant="body1" component="label" sx={{
          fontFamily: "Zen Kaku Gothic New",
          color: "#333",
          p: 2.5,
          fontWeight: "bold",

        }}>
        {label}
      </Typography>
      <TextField
        fullWidth={fullWidth}
        value={value}
        onChange={onChange}
        sx={{
          bgcolor: "#ffffff",
          "& .MuiOutlinedInput-root": {
            fontFamily: '"Zen Kaku Gothic New", sans-serif',
            padding: 0, 
            "& fieldset": {
              borderColor: "#ddd",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#252e37",
            },
            scrollbarWidth: 'none',
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
          "& .MuiInputBase-input": {
            padding: 2.5, 
            minHeight: 'auto',
          },
        }}
      />
    </Stack>
  );
  const LabeledTextField = ({ label, value, onChange, ...props }) => (
    <Stack spacing={1} >     
      <Typography
        variant="body1"
        component="label"
        sx={{
          fontFamily: "Zen Kaku Gothic New",
          color: "#333",
          fontWeight: "bold",
          p: 2.5,
        }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={4}
        value={value}
        getOptionLabel={(option) => option}
        onChange={onChange}
        {...props}
         sx={{
          bgcolor: "#ffffff",
          "& .MuiOutlinedInput-root": {
            fontFamily: '"Zen Kaku Gothic New", sans-serif',
            padding: 0, 
            "& fieldset": {
              borderColor: "#ddd",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#252e37",
            },
            scrollbarWidth: 'none',
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
          "& .MuiInputBase-input": {
            padding: 2.5, 
            minHeight: 'auto',
          },
        }}
      />
    </Stack>
  );


export function ProductDialog({ isDialogOpen, setIsRegistered }) {
  const [isOpen, setIsOpen] = useState(isDialogOpen);
  const sessionjsonKey = "productData";
  const rawData = sessionStorage.getItem(sessionjsonKey);
  const parse = JSON.parse(rawData);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState(parse.department.map((d) => d.departmentName !== "不明" ? d.departmentName : null).filter((name) => name !== null));
  const [productName, setProductName] = useState(parse.issues.Name);
  const [issuesContent, setIssuesContent] = useState(parse.issues.Content);
  const [providedOutcome, setProvidedOutcome] = useState(
    `${parse.provided.Why}より、${parse.provided.Outcome}`,
  );
  const [mainCategory, setMainCategory] = useState(
    parse.classification[0].mainCategory,
  );
  const [subCategory, setSubCategory] = useState(
    parse.classification[0].subCategory,
  );
  const [minorCategory, setMinorCategory] = useState(
    parse.classification[0].minorCategory,
  );

  const categoryFields = [
    { label: "業務カテゴリ", value: mainCategory },
    { label: "業務領域", value: subCategory },
    { label: "業務", value: minorCategory },
  ];

  const datas = [];
  useEffect(() => {
    console.log(parse);

    const fetchDepartments = async () => {
      try {
        const res = await fetch("/department");

        if (!res.ok) {
          throw new Error(`APIエラー: ${res.status}`);
        }
        const data = await res.json();
        setDepartmentOptions(data.map((d) => d.departmentName));
      } catch (error) {
        console.error("部署一覧の取得に失敗しました", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleClose = () => onClose();

  const handleRegister = async () => {
    const req = {
      product: {
        name: productName,
        issuesWho: Array.isArray(parse.issues.Who)
          ? parse.issues.Who.join(",")
          : parse.issues.Who,
        issuesWhat: parse.issues.What,
        issuesWhen: parse.issues.When,
        issuesWhere: parse.issues.Where,
        issuesWhy: parse.issues.Why,
        issuesHow: parse.issues.How,
        issuesWhatWhy: parse.issues.What_Why,
        issuesContent: issuesContent,
        providedHow: Array.isArray(parse.provided.How)
          ? parse.provided.How.join(",")
          : parse.provided.How,
        providedWhy: parse.provided.Why,
        providedOutcome: providedOutcome,
      },
      department: selectedDepartments.map((name) => ({
        departmentName: name,
        officeName: "",
      })),

      classification: [
        {
          mainCategory: mainCategory,
          subCategory: subCategory,
          minorCategory: minorCategory,
        },
      ],
    };
    console.log(req);
    try {
      const res = await fetch("/projectdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      if (!res.ok) {
        throw new Error(`APIエラー: ${res.status}`);
      }
      setIsOpen(false);
      setIsRegistered(true);
    } catch (error) {
      console.error("プロダクト登録に失敗しました", error);
    }
  };
  const handleChange = (e, newValue) => {
    setSelectedDepartments(newValue);
  };

  
  return (
    <>
      <Dialog
        open={isOpen}
        id="product-dialog"
        onClose={handleClose}
        component="section"
        fullWidth={true}
        maxWidth="lg"
        sx={{
          width: "100%",
          minHeight: 800,
          color: "#05101b",
           '& .MuiPaper-root': {
              borderRadius: '24px'}
        }}
        PaperProps={{
          sx: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 800,
            height: "90%",
            }
          }}
      >
          {/* <Stack direction="row" sx={{ mb: 5,px: 5,pt: 5, justifyContent: "flex-end" }}> */}
          <Stack direction="row" sx={{ mb: 5,px: 10,pt: 10, justifyContent: "flex-end" }}>
            <IconButton
              aria-label="close"
              size="large"
              sx={{
                p: 0,
                color: "#252e37",
              }}
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Stack>
        <Box
        id="test"
          sx={{
            maxWidth: "None",
            width: "98%",
            mx: "auto",
            px: 4,
            pr: 10,
            pb: 6,
            flex: 1, 
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >

          <Stack direction="row" spacing={4} sx={{ flex: 1 }}>
            <Box
            id="aaa"
              sx={{
                flex: 1,
                minWidth: 0,
                maxWidth: 1400,
                width: 1000,
                maxHeight: 603,
                overflowY: "auto",
                pr: 10,
                pl:8,
                scrollbarColor: "#B78F00 #D9D9D9",
                scrollbarWidth: "thin", 

                "&::-webkit-scrollbar": {
                  width: "4px",           
                  height: "8px",          // 水平スクロールバーの高さ
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#D9D9D9", 
                  borderRadius: "4px",        
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#B78F00", 
                  borderRadius: "4px",        
                },
              }}
            >
              <Stack spacing={4} sx={{ px: { xs: 0, md: 2 }}}>
                <LabeledTextField
                  label="プロダクト名"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  typographyVariant="body1"
                />
                <Stack spacing={1.5} maxWidth={609}>
                  <Typography
                    variant="body1"
                    component="label"
                    sx={{
                      fontFamily: "Zen Kaku Gothic New",
                      color: "#333",
                      letterSpacing: 0,
                      p: 2.5,
                      fontWeight: "bold",

                    }}
                  >
                    ステークホルダー
                  </Typography>
                  <Autocomplete
                    multiple
                    options={departmentOptions}
                    value={selectedDepartments}
                    onChange={handleChange}
                    sx={{
                      bgcolor: "#ffffff",
                      "& .MuiOutlinedInput-root": {
                        fontFamily: '"Zen Kaku Gothic New", sans-serif',
                        padding: 1.25, 
                        "& fieldset": {
                          borderColor: "#ddd",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#252e37",
                        },
                        scrollbarWidth: 'none',
                        "&::-webkit-scrollbar": {
                          display: "none",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: 3, 
                        minHeight: 'auto',
                      },
                    }}
                    // sx={{
                    //   fontFamily: "Zen Kaku Gothic New",
                    //   "& .MuiOutlinedInput-root": {
                    //     "&.Mui-focused fieldset": {
                    //       borderColor: "#252e37",
                    //     },
                    //   },
                    // }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="部署名を候補から選択"
                        sx={{
                          fontFamily: "Zen Kaku Gothic New",
                          color: "#333",
                        }}
                      />
                    )}
                  />
                </Stack>
                <LabeledTextField
                  label="解決したい課題"
                  value={issuesContent}
                  onChange={(e) => setIssuesContent(e.target.value)}
                  typographyVariant="body1"
                />
                <LabeledTextField
                  label="提供価値"
                  value={providedOutcome}
                  onChange={(e) => setProvidedOutcome(e.target.value)}
                  typographyVariant="body1"
                />
                <Grid
                  container
                  columnSpacing={14.25}
                  rowSpacing={2}
                  maxWidth={820}
                >
                  {categoryFields.map((field) => (
                    <Grid key={field.label} size={{ xs: 12, sm: 4 }}>
                      <CustomTextField
                        label={field.label}
                        value={field.value}
                        typographyVariant="body1"
                      />
                    </Grid>
                  ))}
                </Grid>
                <Stack spacing={2.375} maxWidth={572}>
                  <Typography variant="body1" sx={{
                      fontFamily: "Zen Kaku Gothic New",
                      color: "#333",
                      p: 2.5,
                      fontWeight: "bold",
                    }}>
                    開発メンバー
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={4.75}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    {memberImages.map((src, index) => (
                      <Avatar
                        key={src}
                        alt={`開発メンバー ${index + 1}`}
                        src={src}
                        sx={{ width: 84, height: 84 }}
                      />
                    ))}
                    <Box
                      component="button"
                      type="button"
                      aria-label="開発メンバーを追加"
                      sx={{
                        width: 84,
                        height: 84,
                        border: 0,
                        p: 0,
                        bgcolor: "#ebebe7",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        "&:hover": {
                          border: "1px solid #000000",
                        },
                      }}
                    >
                      <AddIcon sx={{ fontSize: 28, color: "#252e37" ,}} />
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <Divider sx={{ opacity: 0, my: 2 }} />
          <Stack
            direction="row"
            justifyContent="center"
            spacing={10}
            sx={{
              width: "100%",
              maxWidth: 450,
              mx: "auto",
              alignSelf: "center",
              mt: "auto",
              pt: 2,
              pl: 16,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                fontFamily: "Zen Kaku Gothic New",
                fontSize: '16px',
                minWidth: 90,
                padding: 4,
                color: "#b78f00",
                fontWeight: "bold",
                // height: 40,
                borderColor: "#b78f00",
                "&:hover": {
                  borderColor: "#b78f00",
                  bgcolor: "rgba(183, 143, 0, 0.04)",
                },
              }}
              onClick={() => setIsOpen(false)}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              color="#b78f00"
              sx={{
                fontFamily: "Zen Kaku Gothic New",
                fontSize: '16px',
                padding: 4,
                minWidth: 210,
                fontWeight: "bold",
                bgcolor: "#b78f00",
                color: "#ffffff",
                "&:hover": {
                  bgcolor: "#9a7800",
                },
              }}
              onClick={handleRegister}
            >
              このプロダクトを登録する
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}

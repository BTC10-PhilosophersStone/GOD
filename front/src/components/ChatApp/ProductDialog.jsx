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

const parse = {
  issue: {
    name: "サンプルネーム",
    issue: "サンプルイッシュー",
    value: "サンプルバリュー",
    category: "サンプルカテゴリー",
    domain: "サンプルドメイン",
    work: "サンプル業務",
  },
};

const memberImages = [
  "front/src/assets/hero.png",
  "front/src/assets/react.svg",
  "front/src/assets/vite.svg",
];

export function ProductDialog({ isDialogOpen }) {
  const [isOpen, setIsOpen] = useState(isDialogOpen);
  const sessionjsonKey = "productData";
  // const rawData = sessionStorage.getItem(sessionjsonKey);
  // const parse = JSON.parse(rawData);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([
    "人事部",
    "人材開発",
    "人材開発G",
    // parse.department.map((d) => d.departmentName),
  ]);
  const [productName, setProductName] = useState(parse.issue.name);
  const [issue, setIssue] = useState(parse.issue.issue);
  const [value, setValue] = useState(parse.issue.value);
  const [category, setCategory] = useState(parse.issue.category);
  const [domain, setDomain] = useState(parse.issue.domain);
  const [work, setWork] = useState(parse.issue.work);
  // const [issuesContent, setIssuesContent] = useState(parse.issues.Content);
  // const [providedOutcome, setProvidedOutcome] = useState(
  //   parse.provided.Outcome,
  // );
  // const [providedWho, setProvidedWho] = useState(parse.provided.Who);
  // const [issuesWhat, setIssuesWhat] = useState(parse.issues.What);  //これは何？
  const categoryFields = [
    { label: "業務カテゴリ", value: category },
    { label: "業務領域", value: domain },
    { label: "業務", value: work },
  ];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("/departments");

        // if (!res.ok) {
        //   throw new Error(`APIエラー: ${res.status}`);
        // }
        // const data = await res.json();
        // setDepartmentOptions(data.map((d) => d.departmentName));

        // 動作確認用の配列
        setDepartmentOptions([
          "ＴＧＲ－ＷＲＴ",
          "Ｂ．Ｎ．Ｉ．Ｎ．",
          "Ｔ．Ｍ．Ｍ．Ｔ．",
          "国際エネルギー機関",
          "連合燃料電池システム研究開発",
        ]);
      } catch (error) {
        console.error("部署一覧の取得に失敗しました", error);
      }
    };
    fetchDepartments();
  }, []);

  // const req = {
  //   // Nameカラム追加に伴うバックエンド実装完了次第、
  //   // プロパティを追加すること

  //   product: {
  //     name: parse.issues.Name,
  //     issuesWho: parse.issues.Who,
  //     issuesWhat,
  //     issuesWhen: parse.issues.When,
  //     issuesWhere: parse.issues.Where,
  //     issuesWhy: parse.issues.Why,
  //     issuesHow: parse.issues.How,
  //     issuesWhatWhy: parse.issues.What_Why,
  //     issuesContent,
  //     providedWho,
  //     providedWhy: parse.provided.What,
  //     providedOutcome,
  //   },
  //   department: selectedDepartments.map((name) => ({ departmentName: name })),
  //   classification: parse.classification,
  // };

  const handleClose = () => onClose();

  const handleRegister = async () => {
    try {
      const res = await fetch("/projectdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      if (!res.ok) {
        throw new Error(`APIエラー: ${res.status}`);
      }

      const vector = await fetch("/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.product),
      });

      // バックエンドでエンドポイントのメソッドをGETに変更したらこちらを採用する
      // const vector = await fetch("/product");

      if (!vector.ok) {
        throw new Error(`APIエラー: ${vector.status}`);
      }
      const data = await vector.json();
      console.log(data);
    } catch (error) {
      console.error("プロダクト登録に失敗しました", error);
    }
  };
  const handleChange = (e, newValue) => {
    setSelectedDepartments(newValue);
  };

  const CustomTextField = ({
    label,
    value,
    onChange,
    typographyVariant = "body1",
    fullWidth = true,
  }) => (
    <Stack spacing={1.625} width={fullWidth ? "100%" : "auto"}>
      <Typography variant="body1" component="label">
        {label}
      </Typography>
      <TextField
        fullWidth={fullWidth}
        value={value}
        onChange={onChange}
        sx={{
          "& input": { typography: typographyVariant },
          bgcolor: "#ffffff",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "ddd",
              borderWidth: "2px",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#b78f00",
            },
          },
        }}
      />
    </Stack>
  );
  const LabeledTextField = ({ label, value, onChange, ...props }) => (
    <Stack spacing={1}>
      {" "}
      <Typography
        variant="body1"
        component="label"
        sx={{
          fontFamily: '"Noto Sans JP", "Roboto", Helvetica, Arial, sans-serif',
          color: "#333",
        }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        value={value}
        onChange={onChange}
        {...props}
        sx={{
          bgcolor: "#ffffff",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "ddd",
              borderWidth: "2px",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#b78f00",
            },
          },
        }}
      />
    </Stack>
  );

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        component="section"
        fullWidth={true}
        maxWidth="lg"
        PaperProps={{
          sx: {
            width: "100%",
            minHeight: 800,
            color: "#05101b", //
            bgcolor: "#7f2222",
          },
        }}
      >
        <Box
          sx={{
            maxWidth: 1257,
            mx: "auto",
            px: 4,
            pt: 3.5,
            pb: 3,
            display: "flex",
            flexDirection: "column",
            height: 800,
          }}
        >
          <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
            {" "}
            <IconButton
              aria-label="close"
              size="large"
              sx={{ p: 0, color: "#252e37" }}
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Stack>
          <Stack
            direction="row"
            alignItems="flex-start"
            spacing={3}
            sx={{ flex: 1 }}
          >
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                maxHeight: 603,
                overflowY: "auto",
                pr: 3,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <Stack spacing={2.875} sx={{ px: { xs: 0, md: 2 } }}>
                <LabeledTextField
                  label="プロダクト名"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  typographyVariant="body1"
                />
                <Stack spacing={1.625} maxWidth={609}>
                  <Typography
                    variant="body1"
                    component="label"
                    sx={{
                      fontFamily:
                        '"Noto Sans JP", "Roboto", Helvetica, Arial, sans-serif',
                      letterSpacing: 0,
                    }}
                  >
                    ステークホルダー
                  </Typography>

                  <Autocomplete
                    multiple
                    options={selectedDepartments}
                    value={selectedDepartments}
                    disableClearable
                    popupIcon={
                      <KeyboardArrowDownIcon
                        sx={{ color: "#252e37", fontSize: 20 }}
                      />
                    }
                    sx={{
                      maxWidth: 609,
                      "& .MuiOutlinedInput-root": {
                        minHeight: 50,
                        py: 0,
                        pr: 0,
                        borderRadius: 1,
                        bgcolor: "background.paper",
                        "& .MuiAutocomplete-input": { minWidth: 0 },
                      },
                      "& .MuiAutocomplete-endAdornment": {
                        position: "static",
                        transform: "none",
                        margin: 0,
                        alignSelf: "stretch",
                        display: "flex",
                        alignItems: "stretch",
                      },
                      "& .MuiAutocomplete-popupIndicator": {
                        borderLeft: "1px solid #49454f",
                        borderRadius: 0,
                        px: 1.5,
                        color: "#252e37",
                      },
                      "& .MuiAutocomplete-clearIndicator": {
                        display: "none",
                      },
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                          <Chip
                            key={key}
                            label={option}
                            deleteIcon={<CloseIcon sx={{ fontSize: 14 }} />}
                            {...tagProps}
                          />
                        );
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder=""
                        InputProps={{ ...params.InputProps, readOnly: true }}
                      />
                    )}
                  />
                </Stack>
                <LabeledTextField
                  label="解決したい課題"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  typographyVariant="body1"
                />
                <LabeledTextField
                  label="提供価値"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
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
                  <Typography variant="body1" component="h2">
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
                      }}
                    >
                      <AddIcon sx={{ fontSize: 28, color: "#252e37" }} />
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Stack>{" "}
          <Divider sx={{ opacity: 0, my: 2 }} />
          <Stack
            direction="row"
            justifyContent="center"
            spacing={5}
            sx={{
              width: "100%",
              maxWidth: 400,
              mx: "auto",
              alignSelf: "center",
              mt: "auto",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                minWidth: 91,
                color: "#b78f00",
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
                minWidth: 187,
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

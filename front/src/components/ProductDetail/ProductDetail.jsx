import { useState, useEffect } from "react";
import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Button,
  Container,
  Typography,
  Box,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import ButtonBase from "@mui/material/ButtonBase";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import IosShareIcon from "@mui/icons-material/IosShare";

export function ProductDetail({
  editModalIsOpen,
  setEditModalIsOpen,
  productDetail,
  setproductDetail,
  setIsShowDetail,
}) {
  // const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [tabSelected, setTabSelected] = useState("overview");
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  const stakeholders = [
    "品質保証部 - 車体維持管理室",
    "サービス部 - お客様支援室",
    "サービス部 - お客様支援室",
  ];

  // productをインサートする処理にテーブルを追加して、抽出するときも同じようにすると成り立つ res.mebers的なイメージ
  // そうなると、issuesWhoの部分から、対象のユーザーを取得する
  const members = [
    {
      name: "上谷 圭人",
      department: "トヨタ記念病院",
      position: "PM",
      eMail: "keito_kamiya@mail.toyota.co.jp",
      img: "/keity-san.png",
    },
    {
      name: "竹口 慧",
      department: "設計部",
      position: "PD",
      eMail: "satoshi_takeguchi@mail.toyota.co.jp",
      img: "/makochi-san.png",
    },
    {
      name: "下川 和希",
      department: "トヨタ記念病院",
      position: "Devs",
      eMail: "simo@mail.toyota.co.jp",
      img: "/nurse-san.png",
    },
    {
      name: "中山 晋之介",
      department: "トヨタ車体",
      position: "Devs",
      eMail: "shinnosuke_nakayama@mail.toyota.co.jp",
      img: "/sin-san.png",
    },
  ];

  useEffect(() => {
    console.log(productDetail);
  }, []);

  const profileCard = (member) => (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingTop: "8px",
        paddingLeft: "8px",
        gap: "6px",
        position: "relative",
        width: "176px",
        height: "108px",
        boxShadow: "none",
        backgroundColor: "transparent",
      }}
    >
      <CardContent
        sx={{
          p: 0,
          "&:last-child": { paddingBottom: 0 },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: "Zen Kaku Gothic New",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "34px",
            color: "#252e37",
            marginBottom: "8px",
          }}
        >
          {member.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            padding: "0px",
            gap: "4px",
            width: "52px",
            height: "18px",
            marginBottom: "8px",
          }}
        >
          <PersonIcon sx={{ fontSize: 16 }} />
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Zen Kaku Gothic New",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "18px",
              color: "#252e37",
            }}
          >
            {member.position}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "4px",
            padding: "0px",
          }}
        >
          <WorkIcon sx={{ fontSize: 16 }} />
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Zen Kaku Gothic New",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "18px",
              color: "#252e37",
            }}
          >
            {member.department}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditModalIsOpen(true);
        }}
        style={{
          marginBottom: "32px",
        }}
      >
        モーダル開く
      </Button> */}
      <Modal
        appElement={document.getElementById("root")}
        isOpen={editModalIsOpen}
        style={{
          content: {
            borderRadius: "32px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            zIndex: "1000",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Box
          component="section"
          data-model-id="1261:1488"
          sx={{
            minWidth: 1257,
            minHeight: 600,
            position: "relative",
          }}
        >
          <Box
            component="article"
            sx={{
              position: "relative",
              minWidth: 1257,
              height: "160px", // 固定高さにする
              bgcolor: "background.paper",
              borderRadius: "40px",
              overflow: "hidden",

              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack
              direction="row"
              spacing={2.5}
              sx={{ px: "8px", pt: 3.5, pl: "51px", alignItems: "center" }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "Zen Kaku Gothic New",
                  fontWeight: 400,
                  color: "#252e37",
                  fontSize: "20px",
                  lineHeight: "30px",
                  letterSpacing: "-0.022em",
                }}
              >
                {productDetail.product.id}
              </Typography>
              <Chip
                label="企画検討"
                size="small"
                sx={{
                  height: 24,
                  bgcolor: "rgba(37, 46, 55, 0.08)",
                  "& .MuiChip-label": {
                    px: 1.5,
                    fontFamily: "Zen Kaku Gothic New",
                    fontWeight: 400,
                    fontSize: 13,
                    lineHeight: "18px",
                    letterSpacing: "1px",
                    color: "rgba(0, 0, 0, 0.87)",
                  },
                }}
              />
            </Stack>
            <Typography
              component="h1"
              variant="h1"
              sx={{
                mt: "29px",
                ml: "51px",
                fontFamily: "Zen Kaku Gothic New",
                fontWeight: 700,
                color: "#252e37",
                fontSize: "40px",
                lineHeight: "34px",
                letterSpacing: "0.125em",
                paddingBottom: "40px",
              }}
            >
              {productDetail.product.name}
              <IosShareIcon
                sx={{ fontSize: 34, marginLeft: 2, color: "#757575" }}
              />
            </Typography>
            <IconButton
              aria-label="close"
              sx={{
                position: "absolute",
                top: 20,
                right: 8,
                width: 40,
                height: 40,
                color: "#252e37",
              }}
              onClick={async () => {
                setEditModalIsOpen(false);
                setIsShowDetail(false);
                const res = await fetch("/summarize");
              }}
            >
              <CloseIcon sx={{ fontSize: 40 }} />
            </IconButton>
            {/* <Box> */}
            {/* </Box> */}
          </Box>
          <Tabs
            value={tab}
            onChange={(_, newValue) => {
              setTab(newValue);
              setTabSelected((ele) =>
                ele === "overview" ? "transition" : "overview",
              );
            }}
            aria-label="content tabs"
            textColor="inherit"
            sx={{
              minHeight: 76,
              px: 0,
              borderTop: "1px solid #ebebe7",
              borderBottom: "1px solid #ebebe7",
              "& .MuiTabs-flexContainer": {
                pl: "53px",
                pr: 10,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#b78f00",
                height: 4,
              },
            }}
          >
            <Tab
              label="概要"
              sx={{
                fontWeight: tabSelected === "overview" ? 700 : 400,
                fontFamily: "Zen Kaku Gothic New",
                fontSize: "20px",
                lineHeight: "24px",
                letterSpacing: "0.15px",
                color: "#252e37",
                minHeight: 76,
                paddingLeft: "40px",
                paddingRight: "40px",
                textTransform: "none",
                borderBottom: "1px solid #ebebe7",
                opacity: 1,
                "& Mui-selected": {
                  color: "#252e37",
                },
              }}
            />
            <Tab
              label="変遷"
              disabled
              sx={{
                fontWeight: tabSelected === "transition" ? 700 : 400,
                fontSize: "20px",
                lineHeight: "24px",
                letterSpacing: "0.15px",
                color: "#252e37",
                minHeight: 76,
                paddingLeft: "40px",
                paddingRight: "40px",
                textTransform: "none",
                opacity: 1,
                "& Mui-selected": {
                  color: "#252e37",
                },
              }}
            />
          </Tabs>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              px: "24px",
              pt: 3.5,
              pb: 6,
              flex: 1,
              minHeight: 0,
            }}
          >
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                minHeight: 0,
                height: 384,
                overflowY: "auto",
                scrollbarColor: "#B78F00 #D9D9D9",
              }}
            >
              <Stack spacing={3}>
                <Box component="section">
                  <Typography
                    variant="subtitle2"
                    sx={{
                      // fontFamily: "Zen Kaku Gothic New",
                      mb: 1,
                      fontWeight: 600,
                      color: "#252e37",
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0.15px",
                    }}
                  >
                    解決したい課題
                  </Typography>
                  <Box
                    sx={{
                      px: 2,
                      py: 1.625,
                      borderRadius: "5px",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Zen Kaku Gothic New",
                        color: "#252e37",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "0.15px",
                        maxWidth: "110ch",
                      }}
                    >
                      {productDetail.product.issuesContent}
                    </Typography>
                  </Box>
                </Box>
                <Box component="section">
                  <Typography
                    variant="subtitle2"
                    sx={{
                      // fontFamily: "Zen Kaku Gothic New",
                      mb: 1,
                      fontWeight: 600,
                      color: "#252e37",
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0.15px",
                    }}
                  >
                    提供価値
                  </Typography>
                  <Box
                    sx={{
                      px: 2,
                      py: 1.625,
                      borderRadius: "5px",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Zen Kaku Gothic New",
                        color: "#252e37",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "24px",
                        letterSpacing: "0.15px",
                      }}
                    >
                      {productDetail.product.providedOutcome}
                    </Typography>
                  </Box>
                </Box>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 3, md: 8 }}
                  sx={{ maxWidth: 820 }}
                >
                  <Box component="section" sx={{ minWidth: 246 }}>
                    <Typography
                      sx={{
                        md: 2,
                        // fontFamily: "Zen Kaku Gothic New",
                        fontWeight: 700,
                        fontSize: 16,
                        lineHeight: "normal",
                        color: "#252e37",
                        paddingBottom: "16px",
                      }}
                    >
                      ステークホルダー
                    </Typography>
                    <Stack spacing="23px" sx={{ pl: 2 }}>
                      {productDetail.department.map((item, index) => {
                        return (
                          <Box
                            key={`${item.departmentName}-${index}`}
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              px: "11px",
                              bgcolor: "#ebebe7",
                              alignSelf: "flex-start",
                              borderRadius: "4px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Zen Kaku Gothic New",
                                fontWeight: 400,
                                fontSize: 16,
                                lineHeight: "34px",
                                color: "#252e37",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.departmentName}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>
                  <Stack
                    component="section"
                    spacing={3}
                    sx={{
                      width: 600,
                      pt: "2px",
                      position: "relative",
                    }}
                  >
                    <Timeline>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot
                            sx={{
                              backgroundColor: "#b78f00",
                              boxShadow: "none",
                            }}
                          />
                          <TimelineConnector
                            sx={{
                              backgroundColor: "#b78f00",
                              boxShadow: "none",
                            }}
                          />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // fontFamily: "Zen Kaku Gothic New",
                              fontWeight: 600,
                              color: "#252e37",
                              fontSize: "16px",
                              margin: "4px",
                            }}
                          >
                            業務カテゴリ
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: "Zen Kaku Gothic New",
                              pl: "8px",
                              color: "#252e37",
                              whiteSpace: "nowrap",
                              fontSize: "16px",
                              margin: "4px",
                            }}
                          >
                            {productDetail.classification[0].mainCategory}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot
                            sx={{
                              backgroundColor: "#b78f00",
                              boxShadow: "none",
                            }}
                          />
                          <TimelineConnector
                            sx={{
                              backgroundColor: "#b78f00",
                              boxShadow: "none",
                            }}
                          />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // fontFamily: "Zen Kaku Gothic New",
                              fontWeight: 600,
                              color: "#252e37",
                              fontSize: "16px",
                              margin: "4px",
                            }}
                          >
                            業務領域
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: "Zen Kaku Gothic New",
                              pl: "8px",
                              color: "#252e37",
                              whiteSpace: "nowrap",
                              fontSize: "16px",
                              margin: "4px",
                            }}
                          >
                            {productDetail.classification[0].subCategory}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot
                            sx={{
                              backgroundColor: "#b78f00",
                              boxShadow: "none",
                            }}
                          />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // fontFamily: "Zen Kaku Gothic New",
                              fontWeight: 600,
                              color: "#252e37",
                              fontSize: "16px",
                            }}
                          >
                            業務
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: "Zen Kaku Gothic New",
                              pl: "8px",
                              color: "#252e37",
                              whiteSpace: "nowrap",
                              fontSize: "16px",
                              margin: "4px",
                            }}
                          >
                            {productDetail.classification[0].minorCategory}
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    </Timeline>
                  </Stack>
                </Stack>
                <Box component="section" sx={{ width: 572, pd: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      // fontFamily: "Zen Kaku Gothic New",
                      mb: "19px",
                      fontWeight: 700,
                      color: "#252e37",
                      fontSize: "16px",
                      lineHeight: "24px",
                      letterSpacing: "0.15px",
                    }}
                  >
                    開発メンバー
                  </Typography>
                  <Stack
                    direction="row"
                    spacing="38px"
                    sx={{
                      alignItems: "center",
                    }}
                  >
                    {members.map((src, index) => (
                      <Tooltip
                        key={`tooltip-${src.name}-${index}`}
                        title={profileCard(src)}
                        placement="top-start"
                        slotProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: "#ebebe7",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                              borderBottomRightRadius: "16px",
                              borderBottomLeftRadius: "0px",
                            },
                          },
                          popper: {
                            modifiers: [
                              {
                                name: "offset",
                                options: {
                                  offset: [72, -52],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <Avatar
                          key={`${src.name}-${index}`}
                          src={src.img}
                          alt={`${src.name}-${index + 1}`}
                          component={ButtonBase}
                          sx={{
                            width: 84,
                            height: 84,
                            backgroundColor: "#466584",
                            "&:active": {
                              transform: "scale(0.94) translateY(2px)",
                              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                            },
                            "&:hover": {
                              border: "4px solid #b78f00",
                              cursor: "pointer",
                            },
                          }}
                          onClick={() =>
                            window.open(
                              `https://teams.microsoft.com/l/chat/0/0?users=${src.eMail}&message=【${productDetail.product.name}】について`,
                            )
                          }
                        />
                      </Tooltip>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Modal>
      <Box
        component={ButtonBase}
        onClick={() => setIsBookmark(!isBookmark)}
        sx={{
          position: "fixed",
          top: 165,
          left: 1348,
          bgcolor: "#b78f00",
          borderRadius: "0px 8px 8px 0px",
          p: 1.25,
          display: "inline-flex",
          "&:active": {
            transform: "scale(0.94) translateY(2px)",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
          },
          zIndex: 1400,
        }}
      >
        {isBookmark ? (
          <BookmarkIcon
            sx={{
              fontSize: 40,
              color: "#ffffff",
            }}
          />
        ) : (
          <BookmarkBorderRoundedIcon
            sx={{
              fontWeight: 2,
              fontSize: 40,
              color: "#ffffff",
            }}
          />
        )}
      </Box>
    </>
  );
}

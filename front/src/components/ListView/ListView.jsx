import AddIcon from "@mui/icons-material/Add";
import ArrowUpWardIcon from "@mui/icons-material/ArrowUpward";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Card,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PromptInputArea } from "../ChatApp/PromptInputArea";
import { ProductDetail } from "../ProductDetail/ProductDetail";
import { useEffect, useState, useRef } from "react";
import "@fontsource/hina-mincho";
import "@fontsource/zen-kaku-gothic-new";
import { GodMesseage } from "./GodMesseage";

export const ListView = ({ setIsShowDetail, isRegistered }) => {
  const [products, setProducts] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [productDetail, setproductDetail] = useState({});
  const scrollRef = useRef(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch("/product");
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch {
        console.error("error");
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    console.log(scrollRef.current);
    scrollRef.current.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [products]);

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "#ffffff",
        // minHeight: "100vh",
        // width: "100%",
        position: "relative",
        // overflowX: "hidden",
        pb: "180px",
      }}
    >
      {editModalIsOpen && (
        <ProductDetail
          editModalIsOpen={editModalIsOpen}
          setEditModalIsOpen={setEditModalIsOpen}
          productDetail={productDetail}
          setproductDetail={setproductDetail}
          setIsShowDetail={setIsShowDetail}
          onClose={() => setEditModalIsOpen(false)}
        />
      )}
      {/* <IconButton
        aria-label="menu"
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 3,
          color: "text.secoundary",
        }}
      >
        <MenuIcon sx={{ fontSize: 40 }} />
      </IconButton> */}
      <Container
        maxWidth={false}
        sx={{ maxWidth: "856px", pt: "82px", px: { xs: 3, sm: 4 } }}
      >
        <Stack spacing={7.75} alignitems="center">
          {/* <Typography
            component="p"
            align="center"
            sx={{
              fontFamily: "Hina Mincho",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "34px",
              letterSpacing: "5px",
              color: "#252e37",
              mt: "1px",
            }}
            ref={scrollRef}
          >
            <Box component="span" sx={{ letterSpacing: "4px" }}>
              そなたのプロダクトに似たものがないか、神が提案しよう。
              <br />
              <br />
              課題内容、提供価値、ステークホルダー、業務階層の4つの観点から
              <br />
              神が総合的に判断した5件が以下のプロダクトじゃ。
            </Box>
          </Typography> */}
          <GodMesseage scrollRef={scrollRef} />
          <Stack component="section" spacing={3.85} width="100%">
            {products.map((product) => (
              <Card
                key={product.id}
                variant="outlined"
                sx={{
                  px: 4,
                  py: 3,
                  borderColor: "#b78f00",
                  borderRadius: "8px",
                  bgcolor: "background.paper",
                }}
                onClick={async () => {
                  try {
                    const res = await fetch(`/product/${product.id}`);
                    const data = await res.json();
                    console.log(data);
                    setproductDetail(data);
                    setEditModalIsOpen(true);
                    setIsShowDetail(true);
                  } catch {
                    console.error("error");
                  }
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  sx={{ justifyContent: "space-between" }}
                  alignitems={{ xs: "flex-start", sm: "flex-start" }}
                >
                  <Stack
                    spacing="12px"
                    sx={{ minWidth: 0, maxWidth: "317px", width: "100%" }}
                  >
                    <Stack
                      direction="row"
                      spacing={2.5}
                      sx={{ alignItems: "center" }}
                      flexwrap="wrap"
                    >
                      <Typography
                        component="p"
                        sx={{
                          fontFamily: "Zen Kaku Gothic New",
                          fontWeight: 600,
                          fontSize: "20px",
                          lineHeight: "30px",
                          letterSpacing: "0.25px",
                          color: "#252e37",
                          whiteSpace: "nowrap",
                        }}
                      >
                        D-2026-07-{product.id}
                      </Typography>
                      <Chip
                        label="企画検討"
                        size="small"
                        sx={{
                          "& .MuiChip-label": {
                            fontFamily: "Zen Kaku Gothic New",
                            fontWeight: 700,
                            fontSize: "13px",
                            lineHeight: "18px",
                            letterSpacing: "1px",
                            m: 0.8,
                          },
                        }}
                      />
                    </Stack>
                    <Typography
                      component="h2"
                      sx={{
                        width: "500px",
                        fontFamily: "Zen Kaku Gothic New",
                        WebkitTextStroke: "0.09px currentColor",
                        fontWeight: "900",
                        fontSize: "24px",
                        lineHeight: "34px",
                        letterSpacing: "5px",
                        color: "#252e37",
                        wordBreak: "break-word",
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Stack>
                  <Stack
                    spacing="13px"
                    sx={{
                      width: { xs: "100%", sm: "162px" },
                      minWidth: { sm: "162px" },
                      alignItems: "flex-end",
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        paddingTop: "4px",
                      }}
                      width="100%"
                      spacing={4}
                    >
                      <Typography
                        component="p"
                        sx={{
                          fontFamily: "Zen Kaku Gothic New",
                          // WebkitTextStroke: "0.01px currentColor",
                          fontWeight: "600",
                          fontSize: "15px",
                          lineHeight: "17.8px",
                          letterSpacing: "0.8px",
                          color: "#252e37",
                          whiteSpace: "nowrap",
                        }}
                      >
                        総合関連度
                      </Typography>
                      <Stack
                        direction="row"
                        spacing="7px"
                        sx={{ alignItems: "flex-end" }}
                      >
                        <Typography
                          component="span"
                          sx={{
                            fontFamily: "Zen Kaku Gothic New",
                            WebkitTextStroke: "0.8px currentColor",
                            fontWeight: 900,
                            fontSize: "30px",
                            lineHeight: "30px",
                            letterSpacing: "2px",
                            color: "#252e37",
                            textAlign: "right",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {product.percent}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            fontFamily: "Zen Kaku Gothic New",
                            WebkitTextStroke: "1px currentColor",
                            fontWeight: 500,
                            fontSize: "15px",
                            lineHeight: "17.8px",
                            letterSpacing: "0.8px",
                            color: "#252e37",
                            whiteSpace: "nowrap",
                          }}
                        >
                          %
                        </Typography>
                      </Stack>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={product.percent}
                      sx={{
                        width: "100%",
                        height: 8,
                        borderRadius: "64px",
                        bgcolor: "grey.200",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: "64px",
                          bgcolor: "#b78f00",
                        },
                      }}
                    ></LinearProgress>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
      {/* <Box
        component="footer"
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 4,
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "center",
          px: 2,
          py: 2.5,

          "&::before": {
            content: '""',
            position: "absolute",
            top: -25,
            left: 0,
            right: 0,
            height: 40,
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,1))",
            pointerEvents: "none",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: "100%", maxWidth: "620px", alignItems: "center" }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="神に話しかけてみる"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AddIcon sx={{ color: "text.secondary", fontSize: 24 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <IconButton
                    aria-label="send"
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#466583",
                      color: "#ffffff",
                      borderRadius: "4px",
                      flexShrink: 0,
                      "&:hover": {
                        bgcolor: "#466583",
                      },
                    }}
                  >
                    <ArrowUpWardIcon sx={{ fontSize: 27 }} />
                  </IconButton>
                ),
              },
            }}
            sx={{
              inputProps: {
                ariaLabel: "神に話しかけてみる",
              },
              "& .MuiInputBase-input": {
                fontFamily: "Zen Kaku Gothic New",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0.15px",
                color: "text.secondary",
              },
            }}
          />
        </Stack>
      </Box> */}
    </Box>
  );
};

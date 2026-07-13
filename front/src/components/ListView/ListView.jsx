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
import { useEffect, useState } from "react";

export const ListView = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch("/product");
        const data = await res.json();
        setProducts(data);
      } catch {
        console.error("error");
      }
    };
    getProduct();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "#f5f5f3",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflowX: "hidden",
        pb: "180px",
      }}
    >
      <IconButton
        aria-label="menu"
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 3,
          color: "text.secoundary",
        }}
      >
        <MenuIcon sx={{ fontSize: 24 }} />
      </IconButton>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "856px", pt: "82px", px: { xs: 3, sm: 4 } }}
      >
        <Stack spacing={7.75} alignitems="center">
          <Typography
            component="p"
            align="center"
            sx={{
              fontFamily: '"Hina Mincho" , Helvetica, Arial, serif',
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "34px",
              letterSpacing: "5px",
              color: "#252e37",
              mt: "1px",
            }}
          >
            <Box component="span" sx={{ letterSpacing: "0.8px" }}>
              そなたのプロダクトに似たものがないか、神が提案しよう。
              <br />
              <br />
              課題内容、提供価値、ステークホルダー、業務階層の4つの観点から
              <br />
              神が総合的に判断した5件が以下のプロダクトじゃ。
            </Box>
          </Typography>
          <Stack component="section" spacing={2.75} width="100%"></Stack>
          {products.map((product) => (
            <Card
              key={product.id}
              variant="outlined"
              sx={{
                px: 4,
                py: 3,
                borderColor: "secondary.main",
                bgcolor: "background.paper",
              }}
              onClick={async () => {
                try {
                  const res = await fetch(`/product/${product.id}`);
                  const data = await res.json();
                  console.log(data);
                } catch {
                  console.error("error");
                }
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifycontent="space-between"
                alignitems={{ xs: "flex-start", sm: "flex-start" }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <Stack
                  spacing="9px"
                  sx={{ minWidth: 0, maxWidth: "317px", width: "100%" }}
                >
                  <Stack
                    direction="row"
                    spacing={2.5}
                    alignitems="center"
                    flexwrap="wrap"
                  >
                    <Typography
                      component="p"
                      sx={{
                        fontFamily:
                          '"Sawarabi Gothic", Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        fontSize: "20px",
                        lineHeight: "30px",
                        letterSpacing: "-0.44px",
                        color: "#252e37",
                        whiteSpace: "nowrap",
                      }}
                    >
                      product id : {product.id}
                    </Typography>
                    <Chip
                      label="企画検討"
                      size="small"
                      sx={{
                        "& .MuiChip-label": {
                          fontFamily:
                            '"Sawarabi Gothic", Helvetica, Arial, sans-serif',
                          fontWeight: 400,
                          fontSize: "13px",
                          lineHeight: "18px",
                          letterSpacing: "1px",
                          color: "text.primary",
                        },
                      }}
                    />
                  </Stack>
                  <Typography
                    component="h2"
                    sx={{
                      fontFamily:
                        '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif ',
                      fontWeight: 700,
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
                  spacing="15px"
                  alignitems="flex-end"
                  sx={{
                    width: { xs: "100%", sm: "162px" },
                    minWidth: { sm: "162px" },
                  }}
                >
                  <Stack
                    direction="row"
                    justifycontent="space-between"
                    alignitems="flex-end"
                    width="100%"
                  >
                    <Typography
                      component="p"
                      sx={{
                        fontFamily:
                          '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif ',
                        fontWeight: 700,
                        fontSize: "16px",
                        lineHeight: "17.8px",
                        letterSpacing: "0.8px",
                        color: "#252e37",
                        whiteSpace: "nowrap",
                      }}
                    >
                      総合関連度
                    </Typography>
                    <Stack direction="row" spacing="7px" alignitems="flex-end">
                      <Typography
                        component="span"
                        sx={{
                          fontFamily:
                            '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif ',
                          fontWeight: 700,
                          fontSize: "32px",
                          lineHeight: "29.4px",
                          letterSpacing: "1.6px",
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
                          fontFamily:
                            '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif ',
                          fontWeight: 700,
                          fontSize: "16px",
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
                      bgcolor: "gray.200",
                      "& MuiLinearProgress-bar": {
                        borderRadius: "64px",
                        bgcolor: "secondary.main",
                      },
                    }}
                  ></LinearProgress>
                </Stack>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Container>
      <Box
        component="footer"
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 4,
          bgcolor: "background.paper",
          borderTop: 1,
          borderColor: "devider",
          display: "flex",
          justifyContent: "center",
          px: 2,
          py: 2.5,
        }}
      >
        <Stack
          direction="row"
          alignitems="center"
          spacing={2}
          sx={{ width: "100%", maxWidth: "620px" }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="神に話しかけてみる"
            inputprops={{
              "aria-label": "神に話しかけてみる",
            }}
            inputprops={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddIcon sx={{ color: "text.secondary", fontSize: 24 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiInputBase-input": {
                fontFamily:
                  '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif ',
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "24px",
                letterSpacing: "0.15px",
                color: "text.secondary",
              },
            }}
          />
          <IconButton
            aria-label="send"
            sx={{
              width: 40,
              height: 40,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              borderRadius: "4px",
              flexShrink: 0,
              "&:hover": {
                bgcolor: "primary.main",
              },
            }}
          >
            <ArrowUpWardIcon sx={{ fontSize: 27 }} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

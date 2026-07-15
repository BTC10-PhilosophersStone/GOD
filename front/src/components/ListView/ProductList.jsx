import { Card, Stack, Typography, Chip, LinearProgress } from "@mui/material";
import { useEffect } from "react";

export const ProductList = ({
  products,
  setEditModalIsOpen,
  productDetail,
  setproductDetail,
  setIsShowDetail,
}) => {
  return (
    <Stack
      component="section"
      spacing={3.85}
      width="100%"
      sx={{
        // animation: "colorChange 2s ease-in-out",
        // "@keyframes colorChange": {
        //   "0%": { color: "#FFFFFF" },
        //   "25%": { color: "#c8c8c8" },
        //   "50%": { color: "#808080" },
        //   "100%": { color: "#252e37" },
        // },

        opacity: 0,
        animation: "fadeIn 0.5s ease-out forwards",

        "@keyframes fadeIn": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      }}
    >
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
  );
};

import { Typography, Box } from "@mui/material";

export const GodMesseage = ({ scrollRef, messeagePadding, startRef }) => {
  return (
    <>
      <div
        style={{ height: "900px", backgroundColor: "#FFFFFF" }}
        aria-hidden="true"
      />
      <div
        style={{ height: "60px", backgroundColor: "#FFFFFF" }}
        aria-hidden="true"
        ref={startRef}
      />
      <Typography
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
          animation: "colorChange 3s ease-in-out",
          "@keyframes colorChange": {
            "0%": { color: "#FFFFFF" },
            "25%": { color: "#FFFFFF" },
            "50%": { color: "#808080" },
            "100%": { color: "#252e37" },
          },
          // paddingTop: messeagePadding && "100px",
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
      </Typography>
    </>
  );
};

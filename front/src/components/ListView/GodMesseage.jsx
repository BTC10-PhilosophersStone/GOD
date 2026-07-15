export const GodMesseage = ({ scrollRef }) => {
  return (
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
  );
};

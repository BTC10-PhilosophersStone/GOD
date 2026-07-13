import { Box, Card, Stack, Typography } from "@mui/material";
import "@fontsource/hina-mincho";
import "@fontsource/zen-kaku-gothic-new";
export function MessageContent({ role, content }) {
  const isGod = role === "GOD";
  return (
    <>
      {/* <Card
        sx={{
          // maxWidth: 500,
          textAlign: "center",
          backgroundColor: isGod ? "none" : "#466584",
          color: isGod ? "#252e37" : "white",
          marginBottom: 4,
          // overlay: "auto",
          display: "flex",
          borderRadius: 8,
          padding: "24px 24px",
          // fontFamily: isGod
          //   ? '"Hina Mincho" , Helvetica, Arial, serif'
          //   : '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif ',
          // fontWeight: 400,
          // fontSize: "16px",
          // lineHeight: "34px",
          // letterSpacing: "5px",
          // color: "#252e37",
          // mt: "1px",
        }}
      >
      </Card> */}
      <Stack spacing={7.75} alignitems="center">
        <Typography
          component="p"
          align={isGod ? "center" : "justify-content"}
          sx={{
            fontFamily: isGod ? "Hina Mincho" : "Zen Kaku Gothic New",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "34px",
            letterSpacing: "5px",
            // color: "#252e37",
            mt: "1px",
            backgroundColor: isGod ? "none" : "#466584",
            color: isGod ? "#252e37" : "white",
            borderRadius: 8,
            padding: "24px 24px",
            width: "800px",
          }}
        >
          <Box component="span" sx={{ letterSpacing: "0.8px" }}>
            {content}
          </Box>
        </Typography>
        {/* <p>{content}</p> */}
      </Stack>
    </>
  );
}

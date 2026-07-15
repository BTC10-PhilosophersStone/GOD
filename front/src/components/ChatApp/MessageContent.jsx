import { Box, Card, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";
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
        {isGod ? (
          // <motion.div
          //   initial={{ opacity: 0, y: 0 }}
          //   animate={{ opacity: 1, y: 0 }}
          //   transition={{ duration: 3, ease: "easeOut" }}
          // >
          <Typography
            component="p"
            align="center"
            sx={{
              fontFamily: "Hina Mincho",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "34px",
              letterSpacing: "5px",
              mt: "1px",
              backgroundColor: "none",
              color: "#252e37",
              borderRadius: "24px 24px 0 24px",
              padding: "24px 24px",
              paddingBottom: "103px",
              width: "800px",
              animation: "colorChange 3s ease-in-out",
              "@keyframes colorChange": {
                "0%": { color: "#FFFFFF" },
                "25%": { color: "#FFFFFF" },
                "50%": { color: "#808080" },
                "100%": { color: "#252e37" },
              },
              animationPlayState: "paused",
              whiteSpace: "pre-line",
            }}
          >
            <Box component="span" sx={{ letterSpacing: "0.8px" }}>
              {content}
            </Box>
          </Typography>
        ) : (
          // </motion.div>
          <Typography
            component="p"
            align="justify-content"
            sx={{
              fontFamily: "Zen Kaku Gothic New",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "34px",
              letterSpacing: "5px",
              mt: "1px",
              backgroundColor: "#466584",
              color: "white",
              borderRadius: "24px 24px 0 24px",
              padding: "24px 24px",
              width: "800px",
              // animation: "colorChange 2s ease-in-out",
              // "@keyframes colorChange": {
              //   "0%": { color: "#FFFFFF" },
              //   "50%": { color: "#808080" },
              //   "100%": { color: "white" },
              // },
              whiteSpace: "pre-line",
            }}
          >
            <Box component="span" sx={{ letterSpacing: "0.8px" }}>
              {content}
            </Box>
          </Typography>
        )}
      </Stack>
    </>
  );
}

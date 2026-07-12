import { Stack } from "@mui/material";
import { PromptButton } from "./PromptButton";
import { PromptInput } from "./PromptInput";

export function Prompt() {
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <PromptInput />
        <PromptButton />
      </Stack>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      > */}
      {/* </div> */}
    </>
  );
}

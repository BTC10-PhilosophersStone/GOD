import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import { PromptButton } from "./PromptButton";
import { PromptInput } from "./PromptInput";
import { useAtom } from "jotai";
import { promptAtom } from "../atoms";

export function Prompt() {
  const [prompt, setPrompt] = useAtom(promptAtom);

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        {/* <Autocomplete
          freeSolo
          fullWidth
          // options={autocompleteOptions}
          value={prompt}
          popupIcon={null}
          clearIcon={null}
          // renderInput={(params) => <TextField {...params} />}
          renderInput={() => {}}
        /> */}

        <Box
          component="footer"
          sx={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 4,
            bgcolor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: 1,
            borderColor: "divider",
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
            {/* PromptInputの中で PromptButtonを呼び出すように変更 */}
            <PromptInput />
            {/* <PromptButton /> */}
          </Stack>
        </Box>
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

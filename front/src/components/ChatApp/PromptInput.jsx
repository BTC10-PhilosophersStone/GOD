import { useAtom } from "jotai";
import { promptAtom } from "../atoms";
import { InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { PromptButton } from "./PromptButton";
import "@fontsource/zen-kaku-gothic-new";

export function PromptInput() {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const handleChange = (e) => setPrompt(e.target.value);
  return (
    <TextField
      fullWidth
      value={prompt}
      onChange={handleChange}
      placeholder="神に話しかけてみる"
      variant="outlined"
      inputprops={{
        "aria-label": "神に話しかけてみる",
      }}
      slotProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ mr: 1 }}>
            <AddIcon sx={{ fontSize: 24, color: "text.primary" }} />
          </InputAdornment>
        ),
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <PromptButton />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        // "& MuiOutlinedInput-root": { minHeight: 56, pr: 1 },
        "& MuiOutlinedInput-input": {
          fontFamily: "Zen Kaku Gothic New",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "24px",
          letterSpacing: "0.15px",
          color: "text.secondary",
          p: 0,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "action.border",
        },
      }}
    />
  );
}

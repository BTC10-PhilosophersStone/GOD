import "./LoginApp.css";
import { useSetAtom, useAtomValue } from "jotai";
import { atomEmail, atomAuthError } from "./atoms";
import { TextField } from "@mui/material";

export function InputEmail() {
  const setEmail = useSetAtom(atomEmail);
  const authError = useAtomValue(atomAuthError); // エラー状態を監視

  return (
    <>
      <TextField
        // id="outlined-basic"
        label="メールアドレス"
        variant="outlined"
        aria-invalid="false"
        className="cert-con"
        type="text"
        data-testid="…"
        placeholder="example.toyota.co.jp"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        error={!!authError}
        // helperText={authError}
        sx={{
          // 1. デフォルト状態 (通常時)
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "& input": { color: "black" },
          },
          "& .MuiInputLabel-root": { color: "gray" },

          // 2. ホバー状態 (Hover)
          "& .MuiOutlinedInput-root:hover": {
            "& fieldset": { borderColor: "black" },
            "& input": { color: "black" }, // 文字色
          },
          "& .MuiInputLabel-root": { color: "gray" },

          // 3. 無効化状態 (Disabled)
          "& .MuiOutlinedInput-root.Mui-disabled": {
            "& fieldset": { borderColor: "lightgray" },
            "& input": { color: "lightgray" },
          },
          "& .MuiInputLabel-root.Mui-disabled": { color: "lightgray" },

          // 4. エラー状態 (Error)
          "& .MuiOutlinedInput-root.Mui-error": {
            "& fieldset": { borderColor: "red" },
            "& input": { color: "black" },
          },
          "& .MuiInputLabel-root.Mui-error": { color: "red" },
        }}
      ></TextField>
    </>
  );
}

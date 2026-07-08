import "./LoginApp.css";
import * as React from "react";
import { useSetAtom } from "jotai";
import { atomPass } from "./atoms";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";

export function InputPass() {
  const setPass = useSetAtom(atomPass);
  const filledPasswordId = React.useId();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const handleMouseUpPassword = (event) => {
  //   event.preventDefault();
  // };

  return (
    <>
      <FormControl
        sx={{ m: 1, width: "275px" }}
        variant="outlined"
        sx={{
          width: "275px",
          // 1. デフォルト状態 (通常時)
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "gray" },
            "& input": { color: "black" },
          },
          "& .MuiInputLabel-root": { color: "gray" },

          // 2. ホバー状態 (Hover)
          "& .MuiOutlinedInput-root:hover": {
            "& fieldset": { borderColor: "black" },
            "& input": { color: "black" },
          },

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
      >
        <InputLabel htmlFor={`${filledPasswordId}-input`}>
          パスワード
        </InputLabel>

        <OutlinedInput
          id={`${filledPasswordId}-input`}
          type={showPassword ? "text" : "password"}
          label="パスワード"
          placeholder="Password"
          className="cert-con"
          onChange={(e) => {
            console.log(e.target.value);
            setPass(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
}

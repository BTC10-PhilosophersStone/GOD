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
      {/* <input
        ref={ref}
        type="password"
        placeholder=""
        onChange={() => {
          console.log(ref.current.value);
          setPass(ref.current.value);
        }}
      /> */}
      <FormControl sx={{ m: 1, width: "275px" }} variant="filled">
        <InputLabel
          htmlFor={`${filledPasswordId}-input`}
          onChange={(e) => {
            console.log(e.target.value);
            setPass(e.target.value);
          }}
        >
          Password
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

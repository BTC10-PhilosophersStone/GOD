import { useSetAtom } from "jotai";
import { atomEmail } from "./atoms";
import { TextField } from "@mui/material";

export function InputEmail() {
  const setEmail = useSetAtom(atomEmail);

  return (
    <>
      <TextField
        sx={{ width: "275px" }}
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        aria-invalid="false"
        className="cert-con"
        type="text"
        data-testid="…"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></TextField>
    </>
  );
}

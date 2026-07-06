import { useAtomValue } from "jotai";
import { atomEmail, atomPass } from "./atoms";
import { useNavigate } from "react-router";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

export function SignUpBt() {
  const email = useAtomValue(atomEmail);
  const pass = useAtomValue(atomPass);
  const nav = useNavigate();

  const signUp = async () => {
    const reqSignUp = await fetch("/api/firebase/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email || "", pass: pass || "" }),
    });
    if (reqSignUp.ok) {
      nav("/main");
    } else {
      const json = await reqSignUp.json();
      console.log(json);
      alert(json.message);
    }
  };
  return (
    <Button
      id="right_button"
      variant="contained"
      endIcon={<SendIcon />}
      onClick={signUp}
    >
      認証
    </Button>
  );
}

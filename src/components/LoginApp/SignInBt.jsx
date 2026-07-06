import { useAtomValue } from "jotai";
import { atomEmail, atomPass } from "./atoms";
import { useNavigate } from "react-router";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import "./LoginApp.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export function SignInBt() {
  const email = useAtomValue(atomEmail);
  const pass = useAtomValue(atomPass);
  const nav = useNavigate();

  const signIn = async () => {
    // バリデーションチェック
    if (!email || !pass) {
      alert("メールアドレスとパスワードを入力してください。");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      nav("/chat");
    } catch (error) {
      console.error("Login Error:", error);
      const errorCode = error?.code;

      if (errorCode) {
        switch (error.code) {
          case "auth/invalid-email":
            alert("メールアドレスの形式が正しくありません。");
            break;
          case "auth/invalid-credential":
            alert("メールアドレスまたはパスワードが間違っています。");
            break;
          case "auth/user-disabled":
            alert("このユーザーアカウントは無効化されています。");
            break;
          default:
            alert("ログインに失敗しました。もう一度お試しください。");
        }
      } else {
        alert("システムエラーが発生しました。");
      }
    }
  };
  return (
    <Button
      id="right_button"
      variant="contained"
      endIcon={<SendIcon />}
      onClick={signIn}
    >
      認証
    </Button>
  );
}

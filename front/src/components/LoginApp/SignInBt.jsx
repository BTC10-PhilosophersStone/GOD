import "./LoginApp.css";
import { useAtomValue, useSetAtom } from "jotai";
import { atomEmail, atomPass, atomAuthError } from "./atoms";
import { useNavigate } from "react-router";
// import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export function SignInBt() {
  const email = useAtomValue(atomEmail);
  const pass = useAtomValue(atomPass);
  const setAuthError = useSetAtom(atomAuthError); // エラーを書き込むための関数
  const authError = useAtomValue(atomAuthError); // 自身のエラー状態を監視
  const nav = useNavigate();

  // メールアドレスとパスワードが未入力の場合はボタンを無効化（必要に応じて有効にしてください）
  const isDisabled = !email || !pass;

  const signIn = async () => {
    if (isDisabled) return;

    // 認証開始時に前回の認証エラーをクリア
    setAuthError("");

    let message = "";

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      nav("/chat");
    } catch (error) {
      console.error("Login Error:", error);
      const errorCode = error?.code;

      if (errorCode) {
        switch (errorCode) {
          case "auth/invalid-email":
            message = "メールアドレスの形式が正しくありません。";
            break;
          case "auth/invalid-credential":
            message = "メールアドレスまたはパスワードに誤りがあります。";
            break;
          case "auth/user-disabled":
            message = "このユーザーアカウントは無効化されています。";
            break;
          default:
            message = "ログインに失敗しました。もう一度お試しください。";
        }
      }
      setAuthError(message);
    }
  };
  return (
    <Button
      id="right_button"
      variant="contained"
      // disabled={isDisabled} // 未入力時にボタン自体を押せなくする場合はコメントアウトを解除
      onClick={signIn}
      className={authError ? "Mui-error" : ""}
      sx={{
        // 1. デフォルト状態 (通常時)
        bgcolor: "#d9b300",
        color: "#ffffff",
        textTransform: "none",

        // 2. ホバー状態 (Hover)
        "&:hover": {
          bgcolor: "#A38600",
          color: "#ffffff",
          textTransform: "none",
        },

        // 3. 無効化状態 (Disabled)
        "&.Mui-disabled": {
          bgcolor: "#d9b300",
          color: "#ffffff",
        },
        // 4. エラー状態 (Error)
        "&.Mui-error": {
          bgcolor: "#e0e0e0",
          color: "#a6a6a6",
        },
      }}
    >
      ようこそ
    </Button>
  );
}

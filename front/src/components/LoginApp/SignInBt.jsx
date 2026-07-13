import "./LoginApp.css";
import { useAtomValue, useSetAtom } from "jotai";
import { atomEmail, atomPass, atomAuthError } from "./atoms";
import { useNavigate } from "react-router";
// import SendIcon from "@mui/icons-material/Send";
import { Button, Box, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export function SignInBt() {
  const email = useAtomValue(atomEmail);
  const pass = useAtomValue(atomPass);
  const setAuthError = useSetAtom(atomAuthError); // エラーを書き込むための関数
  const authError = useAtomValue(atomAuthError); // 自身のエラー状態を監視
  const nav = useNavigate();

  // メールアドレスとパスワードが未入力の場合はボタンを無効化
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
      // console.error("Login Error:", error);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        width: "100%",
        maxWidth: "448px",
      }}
    >
      <Button
        id="right_button"
        variant="contained"
        onClick={signIn}
        className={authError ? "Mui-error" : ""}
        sx={{
          // 1. デフォルト状態 (通常時)
          bgcolor: "rgba(183, 143, 0, 1)",
          color: "rgba(255, 255, 255, 1)",
          textTransform: "none",

          // 2. ホバー状態 (Hover)
          "&:hover": {
            bgcolor: "rgba(152, 119, 0, 1)",
            color: "rgba(255, 255, 255, 1)",
            textTransform: "none",
          },

          // 3. 無効化状態 (Disabled)
          "&.Mui-disabled": {
            bgcolor: "rgba(228, 202, 77, 1)",
            color: "rgba(255, 255, 255, 1)",
          },
          // 4. エラー状態 (Error)
          "&.Mui-error": {
            bgcolor: "rgba(0, 0, 0, 0.12)",
            color: "rgba(0, 0, 0, 0.26)",
          },
        }}
      >
        ようこそ
      </Button>

      {authError && (
        <Typography
          id="right_button_m"
          variant="caption"
          color="error"
          sx={{
            width: "100%",
            textAlign: "left",
            mt: 0.0,
            px: 1,
          }}
        >
          {authError}
        </Typography>
      )}
    </Box>
  );
}

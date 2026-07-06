import { useAtomValue } from "jotai";
import { atomEmail, atomPass } from "./atoms";
import { useNavigate } from "react-router";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export function SignUpBt() {
  const email = useAtomValue(atomEmail);
  const pass = useAtomValue(atomPass);
  const nav = useNavigate();

  const signUp = async () => {
    if (!email || !pass) {
      alert("メールアドレスとパスワードを入力してください。");
      return;
    }
    if (pass.length < 8) {
      alert("パスワードは、英大小数字８桁以上で入力してください。");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      alert("登録が完了しました。");
      alert("登録の利用者IDでチャット画面に入ります。");

      nav("/chat");
    } catch (error) {
      console.error("Firebase作成エラー:", error.code);
      // エラーコードに応じた日本語メッセージ
      if (error.code === "auth/email-already-in-use") {
        alert("このメールアドレスは既に登録されています。");
      } else if (error.code === "auth/invalid-email") {
        alert("正しいメールアドレスの形式で入力してください。");
      } else if (error.code === "auth/weak-password") {
        alert("パスワードが短すぎるか、安全ではありません。");
      } else {
        alert(`登録エラー: ${error.message}`);
      }
    }
  };

  return (
    <Button
      id="right_button"
      variant="contained"
      endIcon={<SendIcon />}
      onClick={signUp}
    >
      登録（成功後チャット画面へ）
    </Button>
  );
}

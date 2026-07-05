import "./LoginApp.css";
// import { useNavigate } from "react-router";
// import { useEffect } from "react";
import { InputEmail } from "./InputEmail";
import { InputPass } from "./InputPass";
import { SignInBt } from "./SignInBt";
// import { atomNewForm } from "./atoms";
// import { useAtomValue } from "jotai";
// import { BackBt } from "./BackBt";
// import { NewAuthBt } from "./NewAuthBt";
// import { SignUpBt } from "./SignUpBt";
// import SendIcon from "@mui/icons-material/Send";

// import { auth } from "./firebaseConfig.js";
// import { onAuthStateChanged } from "firebase/auth";

export function LoginApp() {
  // const nav = useNavigate();
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       nav(`/chat`);
  //     } else {
  //       console.log("未ログイン、またはサインアウト状態です。");
  //     }
  //   });

  //   // クリーンアップ処理（コンポーネントが消えるときに監視を止める）
  //   return () => unsubscribe();
  // }, [nav]);

  return (
    <>
      <div className="app-container">
        <p id="title">GOD</p>
        <p id="user_id">利用者IDを入力してください（メールアドレス）</p>
        <InputEmail />
        <p id="pass">パスワードを入力してください（英大小数字８桁以上）</p>
        <InputPass id="pass" />
        <div>
          <SignInBt />
        </div>
      </div>
    </>
  );
}

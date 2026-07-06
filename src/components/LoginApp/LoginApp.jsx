import "./LoginApp.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { InputEmail } from "./InputEmail";
import { InputPass } from "./InputPass";
import { SignInBt } from "./SignInBt";
import { atomNewForm, atomEmail, atomPassword } from "./atoms";
import { useAtom, useAtomValue } from "jotai";
import { BackBt } from "./BackBt";
import { NewAuthBt } from "./NewAuthBt";
import { SignUpBt } from "./SignUpBt";
import { auth } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

// import SendIcon from "@mui/icons-material/Send";

export function LoginApp() {
  // const [newForm, setNewForm] = useAtom(atomNewForm);

  return (
    <>
      <div className="app-container">
        <p id="title">GOD</p>
        <p id="user_id">利用者IDを入力してください（メールアドレス）</p>
        <InputEmail />
        <p id="pass">パスワードを入力してください（英大小数字８桁以上）</p>
        <InputPass id="pass" />
        <div>
          <NewAuthBt />
          <SignInBt />
        </div>

        {/* {newForm ? (
          <div>
            <BackBt />
            <SignUpBt />
          </div>
        ) : (
          <div>
            <NewAuthBt />
            <SignInBt />
          </div>
        )} */}
      </div>
    </>
  );
}

import "./LoginApp.css";
import { atomNewForm } from "./atoms";
import { useAtomValue } from "jotai";
import { InputEmail } from "./InputEmail";
import { InputPass } from "./InputPass";
import { SignInBt } from "./SignInBt";
import { BackBt } from "./BackBt";
import { NewAuthBt } from "./NewAuthBt";
import { SignUpBt } from "./SignUpBt";

export function LoginApp() {
  const newForm = useAtomValue(atomNewForm);

  return (
    <>
      <div className="app-container">
        <p id="title">GOD</p>
        <p id="user_id">
          {newForm ? "【新規登録】" : ""}
          利用者IDを入力してください　　　（メールアドレス）
        </p>
        <InputEmail />

        <p id="pass">
          {newForm ? "【新規登録】" : ""}
          パスワードを入力してください
          {newForm ? "（英大小数字８桁以上）" : ""}
        </p>
        <InputPass id="pass" />

        {newForm ? (
          <div>
            <BackBt />
            <SignUpBt />
          </div>
        ) : (
          <div>
            <NewAuthBt />
            <SignInBt />
          </div>
        )}
      </div>
    </>
  );
}

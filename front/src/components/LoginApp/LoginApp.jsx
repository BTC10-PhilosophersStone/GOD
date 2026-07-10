import "./LoginApp.css";
// 利用者の新規登録機能が要件からなくなった為、削除部分をコメント化しました。
// import { atomNewForm } from "./atoms";
// import { useAtomValue } from "jotai";
import { InputEmail } from "./InputEmail";
import { InputPass } from "./InputPass";
import { SignInBt } from "./SignInBt";
// import { BackBt } from "./BackBt";
// import { NewAuthBt } from "./NewAuthBt";
// import { SignUpBt } from "./SignUpBt";
import godImage from "../../assets/god_image2.png";

export function LoginApp() {
  // const newForm = useAtomValue(atomNewForm);

  return (
    <>
      <div className="app-container">
        <p id="title">
          <img src={godImage} alt="GOD" />
        </p>
        <div className="sing-area">
          <div>
            {/* <p id="user_id">
              {newForm ? "【新規登録】" : ""}
          利用者IDを入力してください　　　（メールアドレス）
            </p> */}
            <InputEmail />
          </div>

          <div>
            {/* <p id="pass">
              {newForm ? "【新規登録】" : ""}
          パスワードを入力してください
          {newForm ? "（英大小数字８桁以上）" : ""}
            </p> */}
            <InputPass />
          </div>

          <div>
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
      </div>
    </>
  );
}

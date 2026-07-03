import { Link } from "react-router";

export function ChatApp() {
  return (
    <>
      <h1>チャット画面</h1>
      <Link to="/">ログイン画面に戻る</Link>
      <Link to="/product">product詳細</Link>
    </>
  );
}

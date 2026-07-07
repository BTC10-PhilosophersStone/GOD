import { Link } from "react-router";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { Prompt } from "./Prompt";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { messageListAtom } from "../atoms";
import { ProductDialog } from "./ProductDialog";

export function ChatApp() {
  const [messageList, setMessageList] = useAtom(messageListAtom);
  const [isOpen, setIsOpen] = useState(false);
  const product = {
    product: "GODの入力内容",
    abstract: "GODの入力内容",
    members: ["Aさん", "Bさん", "Cさん"],
    request: "GODの入力内容",
    stakeholders: ["部署A", "部署B", "部署C"],
  };
  useEffect(() => {
    // async () => {
    // const res = await fetch(`/api/message/${}`);
    // const data = res.json();
    // };
    const defaultMessage = {
      id: 1,
      post: "GOD",
      content: "テストメッセージ1",
    };
    setMessageList([defaultMessage]);
  }, []);

  return (
    <>
      <h1>チャット画面</h1>
      {/* <Link to="/">ログイン画面に戻る</Link>
      <Link to="/product">product詳細</Link> */}
      <ChatHeader />
      <MessageList messageList={messageList} />
      <Prompt />

      {/* 確認用 */}
      <button onClick={() => setIsOpen(!isOpen)}>ダイアログ表示</button>
      {isOpen && <ProductDialog isDialogOpen={isOpen} />}
    </>
  );
}

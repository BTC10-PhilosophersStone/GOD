import { Link } from "react-router";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { Prompt } from "./Prompt";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { messageListAtom } from "../atoms";

export function ChatApp() {
  const [messageList, setMessageList] = useAtom(messageListAtom);

  useEffect(() => {
    const defaultMessage = { id: 1, post: "GOD", content: "テストメッセージ1" };
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
    </>
  );
}

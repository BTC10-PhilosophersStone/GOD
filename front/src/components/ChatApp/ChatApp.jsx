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

  const sessionMessagesKey = "messages";
  // メッセージ配列をステートにする、初期値としてデフォルトメッセージを格納、もしくはチャット履歴を取得する
  const [value, setValue] = useState(() => {
    const defaultMessage = {
      id: 1,
      role: "GOD",
      content: "テストメッセージ1",
    };
    const sessionMessages = sessionStorage.getItem(sessionMessagesKey);
    const res = sessionMessages
      ? JSON.parse(sessionMessages)
      : [defaultMessage];
    return res;
  });

  useEffect(() => {
    // async () => {
    // const res = await fetch(`/api/message/${}`);
    // const data = res.json();
    // };
    const defaultMessage = {
      id: 1,
      role: "GOD",
      content: "テストメッセージ1",
    };
    const useSessonStorage = false;
    setMessageList(value);
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

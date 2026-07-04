import { useAtom } from "jotai";
import { MessageListItem } from "./MessageListItem";
import { messageListAtom } from "../atoms";

export function MessageList() {
  const [messageList, setMessageList] = useAtom(messageListAtom);
  return (
    <>
      <h1>メッセージリスト</h1>
      <MessageListItem />
      {console.log("messageList", messageList)}
      {messageList.map((message) => (
        <p key={message.id}>{message.content}</p>
      ))}
    </>
  );
}

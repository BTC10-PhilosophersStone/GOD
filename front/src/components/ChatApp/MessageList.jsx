import { useAtom } from "jotai";
import { MessageListItem } from "./MessageListItem";
import { messageListAtom } from "../atoms";
import { useEffect, useRef } from "react";

export function MessageList() {
  const [messageList, setMessageList] = useAtom(messageListAtom);
  const scrollRef = useRef(null);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || messageList.length === 0) return;
    const lastMessage = messageList[messageList.length - 1];
    const lastElement = container.children[messageList.length - 1];
    if (!lastElement) return;
    if (lastMessage.role === "GOD") {
      lastElement.scrollIntoView({ block: "start" });
    } else {
      container.scrollTop = container.scrollHeight;
    }
  }, [messageList]);
  return (
    <>
      <div
        style={{
          border: "solid",
          height: "500px",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
        }}
        ref={scrollRef}
      >
        {messageList.map((message) => (
          <MessageListItem key={message.id} message={message} />
        ))}
        <div style={{ height: "500px" }} aria-hidden="true" />
      </div>
    </>
  );
}

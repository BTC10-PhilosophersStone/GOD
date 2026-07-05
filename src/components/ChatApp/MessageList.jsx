import { useAtom } from "jotai";
import { MessageListItem } from "./MessageListItem";
import { messageListAtom } from "../atoms";
import { useEffect, useRef } from "react";

export function MessageList() {
  const [messageList, setMessageList] = useAtom(messageListAtom);
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messageList]);
  return (
    <>
      <div
        style={{ border: "solid", height: "200px", overflowY: "auto" }}
        ref={scrollRef}
      >
        {messageList.map((message) => (
          <MessageListItem key={message.id} message={message} />
        ))}
      </div>
    </>
  );
}

import { useAtom } from "jotai";
import { MessageListItem } from "./MessageListItem";
import { messageListAtom } from "../atoms";
import { useEffect, useRef } from "react";
import { Container } from "@mui/material";
import { ListView } from "../ListView/ListView";

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
      lastElement.scrollIntoView({ block: "start", behavior: "smooth" });
    } else {
      container.scrollTop = container.scrollHeight;
    }
  }, [messageList]);
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "856px",
          pt: "82px",
          px: { xs: 3, sm: 4 },
          height: "1000px",
          whiteSpace: "pre-wrap",
          backgroundColor: "#FFFFFF",
        }}
        ref={scrollRef}
      >
        {messageList.map((message) => (
          <MessageListItem key={message.id} message={message} />
        ))}
        {/* <ListView /> */}
        <div
          style={{ height: "850px", backgroundColor: "#FFFFFF" }}
          aria-hidden="true"
        />
      </Container>
    </>
  );
}

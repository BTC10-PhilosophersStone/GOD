import { useAtom } from "jotai";
import { MessageListItem } from "./MessageListItem";
import { messageListAtom } from "../atoms";
import { useEffect, useRef } from "react";
import { Container } from "@mui/material";
import { ListView } from "../ListView/ListView";

export function MessageList() {
  const [messageList, setMessageList] = useAtom(messageListAtom);
  const scrollRef = useRef(null);
  const spacerRef = useRef(null);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || messageList.length === 0) return;
    const lastMessage = messageList[messageList.length - 1];
    // 先頭にspacerを1つ追加した分、メッセージのインデックスは+1する
    const lastElement = container.children[messageList.length];
    if (!lastElement) return;

    lastElement.scrollIntoView({ block: "center", behavior: "smooth" });

    if (lastMessage.role === "GOD") return;

    // userの発言は少し間を置いてから、末尾のspacerへスクロールして
    // 画面上では今の内容が上へスライドして消えるように見せる
    const timer = setTimeout(() => {
      spacerRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    }, 800);
    return () => clearTimeout(timer);
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
        <div
          style={{ height: "850px", backgroundColor: "#FFFFFF" }}
          aria-hidden="true"
        />
        {messageList.map((message) => (
          <MessageListItem key={message.id} message={message} />
        ))}
        {/* <ListView /> */}
        <div
          ref={spacerRef}
          style={{ height: "850px", backgroundColor: "#FFFFFF" }}
          aria-hidden="true"
        />
      </Container>
    </>
  );
}

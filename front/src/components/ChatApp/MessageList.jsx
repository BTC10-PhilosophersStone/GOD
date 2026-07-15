import { useAtom } from "jotai";
import { MessageListItem } from "./MessageListItem";
import { messageListAtom } from "../atoms";
import { Fragment, useEffect, useRef } from "react";
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
    // 最新メッセージの直前には常にspaceが1つ挿入されるため、その分足す
    const lastElement = container.children[messageList.length];
    if (!lastElement) return;

    if (lastMessage.role === "GOD") {
      lastElement.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

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
        {messageList.map((message, index) => (
          <Fragment key={message.id}>
            {index === messageList.length - 1 && (
              <div
                style={{ height: "900px", backgroundColor: "#FFFFFF" }}
                aria-hidden="true"
              />
            )}
            <MessageListItem message={message} />
          </Fragment>
        ))}
        {/* <ListView /> */}
        <div
          ref={spacerRef}
          style={{ height: "900px", backgroundColor: "#FFFFFF" }}
          aria-hidden="true"
        />
      </Container>
    </>
  );
}

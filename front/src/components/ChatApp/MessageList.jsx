import { useAtom } from "jotai";
import { MessageListItem } from "./MessageListItem";
import { messageListAtom } from "../atoms";
import { Fragment, useEffect, useRef } from "react";
import { Container } from "@mui/material";

export function MessageList({ isRegistered }) {
  const [messageList, setMessageList] = useAtom(messageListAtom);
  const scrollRef = useRef(null);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || messageList.length === 0) return;
    const lastMessage = messageList[messageList.length - 1];
    // 最新メッセージの直前には常にspaceが1つ挿入されるため、その分足す
    const lastElement = container.children[messageList.length];
    if (!lastElement) return;

    if (lastMessage.role === "GOD") {
      lastElement.scrollIntoView({ block: "center", behavior: "smooth" });

      // スクロールが本当に止まったときに呼ばれる関数
      function handleScrollEnd() {
        const textElement = lastElement.querySelector("p");
        if (textElement) {
          textElement.style.animationPlayState = "running";
        }
      }
      window.addEventListener("scrollend", handleScrollEnd);

      // 次にuseEffectが実行される直前に呼ばれる「片付け」の関数
      function removeScrollEndListener() {
        window.removeEventListener("scrollend", handleScrollEnd);
      }
      return removeScrollEndListener;
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
          height: "auto",
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
        {!isRegistered && (
          <div
            style={{ height: "1003px", backgroundColor: "#FFFFFF" }}
            aria-hidden="true"
          />
        )}
      </Container>
    </>
  );
}

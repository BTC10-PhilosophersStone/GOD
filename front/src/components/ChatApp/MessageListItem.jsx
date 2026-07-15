import { Avatar } from "./Avatar";
import { MessageContent } from "./MessageContent";

export function MessageListItem({ message, isLatest }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {message.role === "GOD" ? (
          <>
            {/* <Avatar role={message.role} /> */}
            <MessageContent
            role={message.role}
            content={message.content}
            isLatest={isLatest}
          />
          </>
        ) : (
          <>
            <MessageContent
            role={message.role}
            content={message.content}
            isLatest={isLatest}
          />
            {/* <Avatar role={message.role} /> */}
          </>
        )}
      </div>
    </>
  );
}

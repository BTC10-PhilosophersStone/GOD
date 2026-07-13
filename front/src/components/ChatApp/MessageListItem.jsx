import { Avatar } from "./Avatar";
import { MessageContent } from "./MessageContent";

export function MessageListItem({ message }) {
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
            <MessageContent role={message.role} content={message.content} />
          </>
        ) : (
          <>
            <MessageContent role={message.role} content={message.content} />
            {/* <Avatar role={message.role} /> */}
          </>
        )}
      </div>
    </>
  );
}

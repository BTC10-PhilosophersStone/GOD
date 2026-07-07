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
        {message.post === "GOD" ? (
          <>
            <Avatar post={message.post} />
            <MessageContent post={message.post} content={message.content} />
          </>
        ) : (
          <>
            <MessageContent post={message.post} content={message.content} />
            <Avatar post={message.post} />
          </>
        )}
      </div>
    </>
  );
}

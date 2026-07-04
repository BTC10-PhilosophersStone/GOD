import { Avatar } from "./Avatar";
import { MessageContent } from "./MessageContent";

export function MessageListItem() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Avatar />
        <MessageContent />
      </div>
    </>
  );
}

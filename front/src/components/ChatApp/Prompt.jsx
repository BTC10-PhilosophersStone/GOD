import { PromptButton } from "./PromptButton";
import { PromptInput } from "./PromptInput";
import { PromptInputArea } from "./PromptInputArea";

export function Prompt() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* <PromptInput />
        <PromptButton /> */}
        <PromptInputArea></PromptInputArea>
      </div>
    </>
  );
}

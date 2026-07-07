import { PromptButton } from "./PromptButton";
import { PromptInput } from "./PromptInput";

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
        <PromptInput />
        <PromptButton />
      </div>
    </>
  );
}

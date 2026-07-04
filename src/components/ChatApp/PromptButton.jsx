import { useAtom } from "jotai";
import { messageListAtom, promptAtom } from "../atoms";

export function PromptButton() {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const [messageList, setMessageList] = useAtom(messageListAtom);

  const handleClick = () => {
    const maxId = messageList[messageList.length - 1].id;
    const newMessageItem = { id: maxId + 1, post: "user", content: prompt };
    setMessageList([...messageList, newMessageItem]);
    setPrompt("");
  };
  return (
    <>
      <button onClick={handleClick} disabled={!prompt}>
        送信
      </button>
    </>
  );
}

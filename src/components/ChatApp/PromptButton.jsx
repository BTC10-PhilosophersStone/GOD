import { useAtom } from "jotai";
import { messageListAtom, promptAtom } from "../atoms";

export function PromptButton() {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const [messageList, setMessageList] = useAtom(messageListAtom);

  const addMessageFromUser = () => {
    setMessageList((prev) => {
      const maxId = prev[prev.length - 1].id;
      const messageItemFromUser = {
        id: maxId + 1,
        post: "user",
        content: prompt,
      };
      return [...prev, messageItemFromUser];
    });
  };
  const addMessageFromGod = async () => {
    const messageFromGod = await "message from GOD"; //ここでAPIで得た回答に差し替える
    setMessageList((prev) => {
      const maxId = prev[prev.length - 1].id;
      const messageItemFromGod = {
        id: maxId + 1,
        post: "GOD",
        content: messageFromGod,
      };
      return [...prev, messageItemFromGod];
    });
  };
  const handleClick = () => {
    addMessageFromUser();
    setPrompt("");
    addMessageFromGod();
  };
  return (
    <>
      <button onClick={handleClick} disabled={!prompt}>
        送信
      </button>
    </>
  );
}

import { useAtom } from "jotai";
import { messageListAtom, promptAtom } from "../atoms";
import { useEffect } from "react";
import { postMessage } from "./api/ChatAppApi";

export function PromptButton() {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const [messageList, setMessageList] = useAtom(messageListAtom);

  const addMessageFromUser = () => {
    setMessageList((prev) => {
      const maxId = prev[prev.length - 1].id;
      const messageItemFromUser = {
        id: maxId + 1,
        role: "user",
        content: prompt,
      };
      return [...prev, messageItemFromUser];
    });
  };
  const addMessageFromGod = async (content) => {
    // const messageFromGod = await "message from GOD"; //ここでAPIで得た回答に差し替える
    // try {
    //   const data = await postMessage(content);
    //   setMessageList((prev) => {
    //     const maxId = prev[prev.length - 1].id;
    //     const messageItemFromGod = {
    //       id: maxId + 1,
    //       role: "GOD",
    //       content: data,
    //     };
    //     return [...prev, messageItemFromGod];
    //   });
    // } catch (error) {
    //   console.log("回答の取得失敗", error);
    // }
    const res = await fetch("/datasummary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ minutes: prompt }),
    });
    const data = await res.text();
    const cleaned = data
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const sessionjsonKey = "json";
    sessionStorage.setItem(sessionjsonKey, cleaned);
    setMessageList((prev) => {
      const maxId = prev[prev.length - 1].id;
      const messageItemFromGod = {
        id: maxId + 1,
        role: "GOD",
        content: cleaned,
      };
      return [...prev, messageItemFromGod];
    });
  };

  const handleClick = () => {
    addMessageFromUser();
    addMessageFromGod(prompt);
    setPrompt("");
  };

  useEffect(() => {
    const sessionMessagesKey = "messages";
    const messageListStr = JSON.stringify([...messageList]);
    sessionStorage.setItem(sessionMessagesKey, messageListStr);
  }, [messageList]);

  return (
    <>
      <button onClick={handleClick} disabled={!prompt}>
        送信
      </button>
    </>
  );
}

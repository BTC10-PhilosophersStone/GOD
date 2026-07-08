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
  const sessionjsonKey = "json";

  const addMessageFromGod = async (content) => {
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
  const getSessionStorage = (key) => {
    const dataStr = sessionStorage.getItem(key);
    const data = JSON.parse(dataStr);
    return data;
  };
  console.log(getSessionStorage("json"));

  const checkShortage = () => {
    // プロダクト情報のオブジェクト取得、オブジェクトのループで値に不明がある場合はキーを返す、ひとつも無い場合はnullを返す
    const obj = getSessionStorage("json");
    const shotageList = [];
    for (const key in obj) {
      obj[key].includes("不明") && shotageList.push(key);
    }
    return shotageList.length === 0 ? null : shotageList;
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

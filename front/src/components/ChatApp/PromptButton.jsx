import { useAtom, useSetAtom } from "jotai";
import { messageListAtom, promptAtom } from "../atoms";
import { useEffect } from "react";
import { postMessage } from "./api/ChatAppApi";
import { dataLabels } from "./dataLabels";
import { isFormDialogOpenAtom } from "./atoms";

export function PromptButton() {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const [messageList, setMessageList] = useAtom(messageListAtom);
  const setIsFormDialogOpen = useSetAtom(isFormDialogOpenAtom);
  const setIsProductDialogOpen = useAtom(isFormDialogOpenAtom);

  // const dataLabels = {
  //   "issues.Who": "誰が困っているか",
  //   "issues.What": "何に困っているか",
  //   "issues.When": "いつ",
  //   "issues.Where": "どこで",
  //   "issues.Why": "なぜ",
  //   "issues.How": "どのように",
  //   "issues.What_Why": "何を・なぜ",
  //   "issues.Content": "内容",
  //   "provided.Who": "誰に提供するか",
  //   "provided.What": "何を提供するか",
  //   "provided.Outcome": "期待される成果",
  // };

  const makeShortageQuestion = (shortageList) => {
    const lines = shortageList.map((key) => `・${dataLabels[key] ?? key}`);
    return `以下の項目が議事録から読み取れませんでした。フォームの赤枠欄に入力してください。\n${lines.join("\n")}`;
  };

  const addMessageItem = (role, content) => {
    setMessageList((prev) => {
      const maxId = prev[prev.length - 1].id;
      return [...prev, { id: maxId + 1, role, content }];
    });
  };

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
    const productData = JSON.parse(cleaned);
    const shortage = checkShortage(productData);
    console.log("shortage", shortage);
    if (shortage) {
      addMessageItem("GOD", makeShortageQuestion(shortage));
      setIsProductDialogOpen(true);
    } else {
      addMessageItem("GOD", cleaned);
    }
    // setMessageList((prev) => {
    //   const maxId = prev[prev.length - 1].id;
    //   const messageItemFromGod = {
    //     id: maxId + 1,
    //     role: "GOD",
    //     content: cleaned,
    //   };
    //   return [...prev, messageItemFromGod];
    // });
  };
  const getSessionStorage = (key) => {
    const dataStr = sessionStorage.getItem(key);
    const data = JSON.parse(dataStr);
    return data;
  };

  const checkShortage = (data) => {
    // プロダクト情報のオブジェクト取得、オブジェクトのループで値に不明がある場合はキーを返す、ひとつも無い場合はnullを返す
    const shortageList = [];
    const sections = { issues: data.issues, provided: data.provided };
    for (const sectionName in sections) {
      const section = sections[sectionName];
      for (const key in section) {
        section[key] === "不明" && shortageList.push(`${sectionName}.${key}`);
      }
    }
    return shortageList.length === 0 ? null : shortageList;
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

import { useAtom, useSetAtom } from "jotai";
import { messageListAtom, promptAtom, isFormDialogOpenAtom } from "../atoms";
import { useEffect } from "react";
import { postMessage } from "./api/ChatAppApi";
import { dataLabels } from "./dataLabels";
import { getSessionStorage, setSessionStorage } from "./sessionStorage";

export function PromptButton() {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const [messageList, setMessageList] = useAtom(messageListAtom);
  const setIsFormDialogOpen = useSetAtom(isFormDialogOpenAtom);

  const makeShortageQuestion = (shortageList) => {
    const list = shortageList.map((key) => `・${dataLabels[key] ?? key}`);
    return `以下の項目が議事録から読み取れませんでした。フォームの赤枠欄に入力してください。\n${list.join("\n")}`;
  };

  const addMessageItem = (role, content) => {
    setMessageList((prev) => {
      const maxId = prev[prev.length - 1].id;
      return [...prev, { id: maxId + 1, role, content }];
    });
  };

  const sessionjsonKey = "productData";

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
    // ここまででproductData保存完了

    // const productData = JSON.parse(cleaned);
    const productData = getSessionStorage(sessionjsonKey);
    const shortage = checkShortage(productData);
    console.log("shortage", shortage);
    if (shortage) {
      addMessageItem("GOD", makeShortageQuestion(shortage));
      setIsFormDialogOpen(true);
    } else {
      addMessageItem("GOD", cleaned);
    }
  };

  // ストレージからプロダクト情報を取得、不足項目取得、ダイアログ表示切り替え
  const checkShortage = () => {
    const data = getSessionStorage(sessionjsonKey);
    console.log("data", data);
    // プロダクト情報のオブジェクト取得、オブジェクトのループで値に不明がある場合はキーを返す、ひとつも無い場合はnullを返す
    const shortageList = [];
    // const sections = { issues: data.issues, provided: data.provided };
    // for (const sectionName in sections) {
    //   const section = sections[sectionName];
    //   for (const key in section) {
    //     section[key] === "不明" && shortageList.push(`${sectionName}.${key}`);
    //   }
    // }
    for (const key in data) {
      if (Array.isArray(data[key])) {
        // for (const subKey in data[key][0]) {
        // data[key][0][subKey] === "不明" &&
        //   shortageList.push(`${key}[0].${subKey}`);
        // }
      } else {
        for (const subKey in data[key]) {
          data[key][subKey] === "不明" && shortageList.push(`${key}.${subKey}`);
        }
      }
    }
    console.log("shortageList", shortageList);
    return shortageList.length === 0 ? null : shortageList;
  };
  const handleClick = async () => {
    await addMessageItem("user", prompt);

    addMessageFromGod(prompt);
    setPrompt("");
  };

  useEffect(() => {
    const sessionMessagesKey = "messages";
    setSessionStorage(sessionMessagesKey, [...messageList]);
  }, [messageList]);

  return (
    <>
      <button onClick={handleClick} disabled={!prompt}>
        送信
      </button>
    </>
  );
}

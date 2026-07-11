import { useAtom, useSetAtom } from "jotai";
import {
  messageListAtom,
  promptAtom,
  isFormDialogOpenAtom,
  productDataAtom,
  isShortProductDataAtom,
} from "../atoms";
import { useEffect, useState } from "react";
import { postMessage } from "./api/ChatAppApi";
import { dataLabels } from "./dataLabels";
import { getSessionStorage, setSessionStorage } from "./sessionStorage";

export function PromptButton() {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const [messageList, setMessageList] = useAtom(messageListAtom);
  // const setIsFormDialogOpen = useSetAtom(isFormDialogOpenAtom);
  const [productAtom, setProductAtom] = useAtom(productDataAtom);
  const [isShort, setIsShort] = useAtom(isShortProductDataAtom);
  const [question, setQuestion] = useState(null);

  // const makeShortageQuestion = (shortageList) => {
  //   const list = shortageList.map((key) => `・${dataLabels[key] ?? key}`);
  //   return `以下の項目が議事録から読み取れませんでした。フォームの赤枠欄に入力してください。\n${list.join("\n")}`;
  // };

  const addMessageItem = (role, content) => {
    setMessageList((prev) => {
      const maxId = prev[prev.length - 1].id;
      return [...prev, { id: maxId + 1, role, content }];
    });
  };

  const sessionjsonKey = "productData";

  // const getMessageFromGod = async (content) => {
  //   const res = await fetch("/datasummary", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ minutes: prompt }),
  //   });
  //   const data = await res.text();
  //   const cleaned = data
  //     .replace(/```json/g, "")
  //     .replace(/```/g, "")
  //     .trim();
  //   sessionStorage.setItem(sessionjsonKey, cleaned);
  // };

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
    // atomに保存と同時にsessionstorageにも保存する（キーはproductDataで固定）
    setProductAtom(JSON.parse(cleaned));
    const shortage = checkShortage(JSON.parse(cleaned));
    if (shortage) {
      setIsShort(true);
    } else {
      addMessageItem("GOD", cleaned);
    }
  };

  const setAnswer = () => {
    const obj = getSessionStorage(sessionjsonKey);
    // console.log("question", question);
    const key = question.split(".")[0];
    const subKey = question.split(".")[1];
    const newObj = { ...obj, [key]: { ...obj[key], [subKey]: prompt } };
    setProductAtom(newObj);
    setQuestion([...question.slice(1)]);
  };

  // ストレージからプロダクト情報を取得、不足項目取得、ダイアログ表示切り替え
  const checkShortage = (data) => {
    const shortageList = [];
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
    return shortageList.length === 0 ? null : shortageList;
  };
  const handleClick = async () => {
    if (!question) {
      addMessageItem("user", prompt);
    } else {
      addMessageItem("user", prompt);
      setAnswer();
      // productAtomの更新
      const productData = getSessionStorage(sessionjsonKey);
      setProductAtom(productData);
      setSessionStorage;
      console.log("checkShortage実行前");
    }
    !question ? addMessageFromGod(prompt) : setQuestion(null);
    setPrompt("");
  };

  useEffect(() => {
    setSessionStorage("messages", [...messageList]);
  }, [messageList]);

  useEffect(() => {
    if (!isShort) return;
    const list = checkShortage(productAtom);
    if (!list) {
      setIsShort(false);
      addMessageItem("GOD", "これで情報が揃ったぞ。");
    }
    addMessageItem(
      "GOD",
      `さすがの神でももう少し情報が欲しいところがある。
        ${dataLabels[list[0]]}はなんじゃ？`,
    );
    // 何を聞いているか残す、
    !question && setQuestion(list[0]);

    // isShort && console.log(checkShortage());
  }, [productAtom]);

  return (
    <>
      <button onClick={handleClick} disabled={!prompt}>
        送信
      </button>
    </>
  );
}

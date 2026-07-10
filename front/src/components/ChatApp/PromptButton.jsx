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
  const setIsFormDialogOpen = useSetAtom(isFormDialogOpenAtom);
  const [productAtom, setProductAtom] = useAtom(productDataAtom);
  const [isShort, setIsShort] = useAtom(isShortProductDataAtom);
  const [question, setQuestion] = useState(null);

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
    sessionStorage.setItem(sessionjsonKey, cleaned);
    // getMessageFromGod(content);

    // const productData = JSON.parse(cleaned);
    const productData = getSessionStorage(sessionjsonKey);
    setProductAtom(productData);
    console.log(
      JSON.stringify(productData) === JSON.stringify(JSON.parse(cleaned)),
    );
    console.log("productData", productData);
    console.log("cleaned", JSON.parse(cleaned));
    const shortage = checkShortage(productData);
    console.log("shortage", shortage);
    if (shortage) {
      // addMessageItem("GOD", makeShortageQuestion(shortage));
      // setIsFormDialogOpen(true);
      setIsShort(true);
    } else {
      addMessageItem("GOD", cleaned);
    }
  };

  const setAnswer = () => {
    const obj = getSessionStorage(sessionjsonKey);
    console.log("question", question);
    const key = question.split(".")[0];
    const subKey = question.split(".")[1];
    const newObj = { ...obj, [key]: { ...obj[key], [subKey]: prompt } };
    console.log("newObj", newObj);
    setQuestion([...question.slice(1)]);
    // setSessionStorage(sessionjsonKey);
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
    if (!question) {
      await addMessageItem("user", prompt);
    } else {
      await addMessageItem("user", prompt);
      setAnswer();
      // productAtomの更新
      const productData = getSessionStorage(sessionjsonKey);
      setProductAtom(productData);
      setSessionStorage;
      console.log("checkShortage実行前");
      checkShortage();
    }
    !question ? addMessageFromGod(prompt) : setQuestion(null);
    setPrompt("");
  };

  useEffect(() => {
    const sessionMessagesKey = "messages";
    setSessionStorage(sessionMessagesKey, [...messageList]);
  }, [messageList]);

  useEffect(() => {
    if (isShort) {
      const list = checkShortage();
      console.log("list[0]", list[0]);
      addMessageItem(
        "GOD",
        `さすがの神でももう少し情報が欲しいところがある。
        ${dataLabels[list[0]]}はなんじゃ？`,
      );
      // 何を聞いているか残す、
      !question && setQuestion(list[0]);
    }
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

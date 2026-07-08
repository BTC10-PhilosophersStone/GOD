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
    console.log(data);
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

  const d = {
    issues: {
      Who: "篠田Sさんと浜本さんです",
      What: "AIエージェント構想の検討とWGとしての活動方針・初期課題の整理",
      When: "2026/01/01",
      Where: "本町工場になります",
      Why: "問い合わせ対応業務の自動化",
      How: "AIエージェント（音声ガイド／チャットボット）の活用",
      What_Why:
        "AIエージェントを活用して問い合わせ対応業務を自動化し、問い合わせに対する回答を即時に取得できる環境を実現する。",
      Content:
        "篠田Sが推進責任者として、AIエージェントを活用した問い合わせ対応業務の自動化構想を検討し、WGとしての活動方針と初期課題を整理する。",
    },
    provided: {
      Who: "太郎さんです",
      What: "問い合わせ対応業務の自動化",
      Outcome: "問い合わせリードタイムの短縮、人員削減",
    },
    department: [
      {
        departmentName: "サービス部",
        officeName: "人材室",
      },
    ],
    classification: [
      {
        mainCategory: "情報システム",
        subCategory: "システム開発",
        minorCategory: "AIエージェント開発",
      },
    ],
  };

  console.log(d);

  const productModify = async () => {
    const sessionjsonKey = "json";
    const rawData = sessionStorage.getItem(sessionjsonKey);
    const parse = JSON.parse(rawData);
    console.log(parse.issues.Content);
    const req = {
      product: {
        issuesWho: parse.issues.Who,
        issuesWhat: parse.issues.What,
        issuesWhen: parse.issues.When,
        issuesWhere: parse.issues.Where,
        issuesWhy: parse.issues.Why,
        issuesHow: parse.issues.How,
        issuesWhatWhy: parse.issues.What_Why,
        issuesContent: parse.issues.Content,
        providedWho: parse.provided.Who,
        providedWhy: parse.provided.What,
        providedOutcome: parse.provided.Outcome,
      },
      department: parse.department,
      classification: parse.classification,
    };
    const res = await fetch("/productmodify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    });
    const data = await res.text();
    const cleaned = data
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log(cleaned);
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
      <button onClick={productModify}>確認</button>
    </>
  );
}

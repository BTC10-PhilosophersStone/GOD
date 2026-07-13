import { useAtom, useSetAtom } from "jotai";
import {
  messageListAtom,
  promptAtom,
  isFormDialogOpenAtom,
  productDataAtom,
  isShortProductDataAtom,
  isProductDialogOpenAtom,
} from "../atoms";
import { useEffect, useState } from "react";
import { postMessage } from "./api/ChatAppApi";
import { dataLabels } from "./dataLabels";
import { getSessionStorage, setSessionStorage } from "./sessionStorage";
import { IconButton } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";

export function PromptButton() {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const [messageList, setMessageList] = useAtom(messageListAtom);
  const [productAtom, setProductAtom] = useAtom(productDataAtom);
  const [isShort, setIsShort] = useAtom(isShortProductDataAtom);
  const setIsProductDialogOpen = useSetAtom(isProductDialogOpenAtom);
  const [question, setQuestion] = useState(null);

  const addMessageItem = (role, content) => {
    setMessageList((prev) => {
      const maxId = prev[prev.length - 1].id;
      return [...prev, { id: maxId + 1, role, content }];
    });
  };

  const sessionjsonKey = "productData";

  const addMessageFromGod = async (content) => {
    try {
      const res = await fetch("/datasummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minutes: content }),
      });
      if (!res.ok) {
        throw new Error(res.status);
      }
      const data = await res.text();
      const cleaned = data
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const productData = JSON.parse(cleaned);
      // atomに保存と同時にsessionstorageにも保存する（キーはproductDataで固定）
      setProductAtom(productData);
      if (checkShortage(productData)) {
        setIsShort(true);
      } else {
        addMessageItem("GOD", cleaned);
        setIsProductDialogOpen(true);
      }
    } catch (error) {
      console.error(error);
      addMessageItem(
        "GOD",
        "うまく読み取れなかった、もう一度議事録を送ってくれ。",
      );
    }
  };

  const setAnswer = () => {
    const [key, subKey] = question.split(".");
    const newObj = {
      ...productAtom,
      [key]: { ...productAtom[key], [subKey]: prompt },
    };
    setProductAtom(newObj);
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
  const handleClick = () => {
    addMessageItem("user", prompt);
    if (!question) {
      addMessageFromGod(prompt);
    } else {
      setAnswer();
      setQuestion(null);
    }
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
    setSessionStorage("messages", [...messageList]);
  }, [messageList]);

  useEffect(() => {
    if (!isShort) return;
    const list = checkShortage(productAtom);
    if (!list) {
      setIsShort(false);
      addMessageItem("GOD", "これで情報が揃ったぞ。");
      setIsProductDialogOpen(true);
      return;
    }
    addMessageItem(
      "GOD",
      `さすがの神でももう少し情報が欲しいところがある。\n${dataLabels[list[0]] ?? list[0]}はなんじゃ？`,
    );
    // 何を聞いているか残す、
    !question && setQuestion(list[0]);
  }, [productAtom]);

  return (
    <>
      <IconButton
        onClick={handleClick}
        disabled={!prompt}
        aria-label="send"
        sx={{
          width: 40,
          height: 40,
          bgcolor: prompt ? "#466584" : "#7E93A9",
          color: "primary.contrastText",
          borderRadius: "4px",
          flexShrink: 0,
          "&:hover": {
            bgcolor: "#1F3850",
          },
          "&.Mui-disabled": {
            backgroundColor: "#7E93A9",
          },
        }}
      >
        <NorthIcon
          sx={{
            fontSize: 27,
            color: "white",
          }}
        />
      </IconButton>
      {/* <button onClick={handleClick} disabled={!prompt}>
        送信
      </button> */}
    </>
  );
}

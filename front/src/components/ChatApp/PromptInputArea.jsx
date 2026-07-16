import { useState, useEffect, useMemo } from "react";
import {
  Chip,
  IconButton,
  TextField,
  Button,
  Box,
  TextareaAutosize,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDropzone } from "react-dropzone";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useAtom, useSetAtom } from "jotai";
import {
  messageListAtom,
  promptAtom,
  isFormDialogOpenAtom,
  productDataAtom,
  isShortProductDataAtom,
  isProductDialogOpenAtom,
  isLoadingAtom,
} from "../atoms";
import { postMessage } from "./api/ChatAppApi";
import { dataLabels } from "./dataLabels";
import { getSessionStorage, setSessionStorage } from "./sessionStorage";
import sendIconDefault from "../../assets/send_icon_default.png";
import sendIconDisabled from "../../assets/send_icon_disabled.png";
import sendIconHovered from "../../assets/send_icon_hovered.png";

export function PromptInputArea() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(false);
  const [prompt, setPrompt] = useAtom(promptAtom);
  const [messageList, setMessageList] = useAtom(messageListAtom);
  const [productAtom, setProductAtom] = useAtom(productDataAtom);
  const [isShort, setIsShort] = useAtom(isShortProductDataAtom);
  const setIsProductDialogOpen = useSetAtom(isProductDialogOpenAtom);
  const [question, setQuestion] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    noKeyboard: true,
    accept: {
      "text/plain": [".txt"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const addMessageItem = (role, content, file) => {
    setMessageList((prev) => {
      const maxId = prev[prev.length - 1].id;
      return [
        ...prev,
        {
          id: maxId + 1,
          role,
          content: file ? `${file.name}　を献上いたします。` : content,
        },
      ];
    });
  };
  const sessionjsonKey = "productData";
  const addMessageFromGod = async () => {
    const formData = new FormData();
    if (prompt) {
      formData.append("text", prompt);
    }
    if (file) {
      formData.append("file", file);
    }
    try {
      const res = await fetch("/datasummary", {
        method: "POST",
        body: formData,
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
      // const shortage = checkShortage(productData);
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

  const checkShortage = (data) => {
    const shortageList = [];
    for (const key in data) {
      if (Array.isArray(data[key])) {
      } else {
        for (const subKey in data[key]) {
          (data[key][subKey] === "不明" || data[key][subKey] === "") &&
            shortageList.push(`${key}.${subKey}`);
        }
      }
    }
    return shortageList.length === 0 ? null : shortageList;
  };

  useEffect(() => {
    setSessionStorage("messages", [...messageList]);
  }, [messageList]);

  useEffect(() => {
    if (!isShort) return;
    const list = checkShortage(productAtom);
    if (!list) {
      setIsShort(false);
      const loadData = async () => {
        addMessageItem("GOD", "これで情報が揃ったぞ。");
        setTimeout(async () => {
          const res = await fetch("/productmodify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productAtom),
          });
          const data = await res.text();
          const cleaned = data
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
          const productData = JSON.parse(cleaned);
          // atomに保存と同時にsessionstorageにも保存する（キーはproductDataで固定）
          sessionStorage.setItem("productData", cleaned);
          setIsProductDialogOpen(true);
        }, 2000);
      };
      loadData();
      return;
    } else {
      const info = dataLabels[list[0]];
      addMessageItem(
        "GOD",
        info
          ? // ? `さすがの神でももう少し情報が欲しいところがある。\n${info.question}\n${info.example}`
            `さすがの神でももう少し情報が欲しいところがある。\n${info.question}`
          : `さすがの神でももう少し情報が欲しいところがある。\n${list[0]}はなんじゃ？`,
      );
    }
    !question && setQuestion(list[0]);
  }, [productAtom]);

  const handleClick = () => {
    addMessageItem("user", prompt, file);
    if (!question) {
      addMessageFromGod(prompt);
    } else {
      setAnswer();
      setQuestion(null);
    }
    setPrompt("");
    setFile(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 1,
          border: "1px solid",
          borderColor: "#0000003B",
          borderRadius: 3,
          width: "679px",
          minHeight: "56px",
          "&:focus-within": {
            // borderColor: "#000000",
            borderColor: "#0000003B",
          },
        }}
      >
        <Box
          {...getRootProps()}
          // variant="outlined"
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "flex-end",
            p: 1,
            padding: "8px 0",
          }}
        >
          <input {...getInputProps()} />
          <Box mt={1}>
            <IconButton
              component="label"
              sx={{ ml: 1 }}
              disabled={prompt !== "" || file}
            >
              <AddIcon />
              <input
                hidden
                type="file"
                accept=".txt,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFile(file);
                }}
              />
            </IconButton>
            {file && (
              <Chip
                sx={{ mb: 1 }}
                label={file.name}
                onDelete={() => setFile(null)}
              />
            )}
          </Box>
          <TextareaAutosize
            disabled={file}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={file ? "" : "我々の神に話しかける"}
            minRows={1}
            maxRows={8}
            style={{
              flex: 1,
              resize: "none",
              border: "none",
              outline: "none",
              background: "transparent",
              font: "inherit",
              padding: "8px 0px",
            }}
          />
        </Box>
        <IconButton
          variant="contained"
          color="primary"
          disabled={prompt === "" && !file}
          sx={{
            margin: "2px 0px",
            "&:active": {
              transform: "scale(0.94) translateY(2px)",
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
            },
          }}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* <ArrowUpwardIcon
            sx={{
              fontSize: 40,
              backgroundColor: prompt === "" && !file ? "#7E93A9" : "#466584",
              color: "#FFFFFF",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#1F3850",
              },
            }}
          /> */}
          {prompt || file ? (
            isHovered ? (
              <img src={sendIconHovered} width="40" height="40" />
            ) : (
              <img src={sendIconDefault} width="40" height="40" />
            )
          ) : (
            <img src={sendIconDisabled} width="40" height="40" />
          )}
        </IconButton>
      </Box>
    </>
  );
}

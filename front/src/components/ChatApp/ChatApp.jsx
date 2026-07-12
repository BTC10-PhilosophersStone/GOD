import { Link } from "react-router";
import { MessageList } from "./MessageList";
import { Prompt } from "./Prompt";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  messageListAtom,
  isFormDialogOpenAtom,
  isProductDialogOpenAtom,
} from "../atoms";
import { ProductDialog } from "./ProductDialog";
import { FormDialog } from "./FormDialog";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export function ChatApp() {
  const [messageList, setMessageList] = useAtom(messageListAtom);
  const [isOpen, setIsOpen] = useAtom(isProductDialogOpenAtom);
  const [isFormOpen] = useAtom(isFormDialogOpenAtom);

  const sessionMessagesKey = "messages";
  // メッセージ配列をステートにする、初期値としてデフォルトメッセージを格納、もしくはチャット履歴を取得する
  const [value, setValue] = useState(() => {
    const defaultMessage = {
      id: 1,
      role: "GOD",
      content:
        "そなたのやりたいプロダクトに近しいプロダクト情報がないか、教えてやろう。そなたのしたいことはなんだ？？　議事録でも良いぞ",
    };
    const sessionMessages = sessionStorage.getItem(sessionMessagesKey);
    const res = sessionMessages
      ? JSON.parse(sessionMessages)
      : [defaultMessage];
    return res;
  });

  useEffect(() => {
    // async () => {
    // const res = await fetch(`/api/message/${}`);
    // const data = res.json();
    // };
    const defaultMessage = {
      id: 1,
      role: "GOD",
      content: "テストメッセージ1",
    };
    const useSessonStorage = false;
    setMessageList(value);
  }, []);

  return (
    <Box
      component="main"
      data-model-id="893:26"
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            px: 3,
            pt: 3,
            minHeight: "auto",
            alignItems: "flex-start",
          }}
        >
          <IconButton
            aria-label="menu"
            component={Link}
            to="/"
            sx={{
              width: 40,
              height: 40,
              color: "custom.menuIcon",
              p: 0,
              // alignItems: "flex-start",
              // justifyContent: "flex-start",
            }}
          >
            <MenuIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <h1>チャット画面</h1>
      {/* <Link to="/">ログイン画面に戻る</Link>
      <Link to="/product">product詳細</Link> */}
      <MessageList messageList={messageList} />
      <Prompt />

      {/* 確認用 */}
      {/* <button onClick={() => setIsOpen(!isOpen)}>ダイアログ表示</button> */}
      {isOpen && (
        <ProductDialog isDialogOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}

      {/* {isFormOpen && <FormDialog />} */}
    </Box>
  );
}

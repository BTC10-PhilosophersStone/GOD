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
import ThemeProvider from "../../theme/ThemeProvider";
import { ListView } from "../ListView/ListView";
import { ProductDetail } from "../ProductDetail/ProductDetail";

export function ChatApp() {
  const [messageList, setMessageList] = useAtom(messageListAtom);
  const [isOpen, setIsOpen] = useAtom(isProductDialogOpenAtom);
  const [isFormOpen] = useAtom(isFormDialogOpenAtom);
  const [isRegistered, setIsRegistered] = useState(false);
  // ここからはじめる
  const [isShowDetail, setIsShowDetail] = useState(false);

  const sessionMessagesKey = "messages";
  // メッセージ配列をステートにする、初期値としてデフォルトメッセージを格納、もしくはチャット履歴を取得する
  const [value, setValue] = useState(() => {
    const defaultMessage = {
      id: 1,
      role: "GOD",
      content:
        // "そなたのやりたいプロダクトに近しいプロダクト情報がないか、教えてやろう。\nそなたのしたいことはなんだ？？　議事録でも良いぞ",
        "そなたのやりたいプロダクトに近しいプロダクト情報がないか、教えてやろう。\nまずはそなたのプロダクトについて教えてくれぬか？\n議事録でもあると話が早いぞ。",
    };
    const sessionMessages = sessionStorage.getItem(sessionMessagesKey);
    const res = sessionMessages
      ? JSON.parse(sessionMessages)
      : [defaultMessage];
    return res;
  });

  useEffect(() => {
    const defaultMessage = {
      id: 1,
      role: "GOD",
      content: "テストメッセージ1",
    };
    const useSessonStorage = false;
    setMessageList(value);
  }, []);

  return (
    <>
      <ThemeProvider>
        <Box
          component="main"
          data-model-id="893:26"
          sx={{
            bgcolor: "#ffffff",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            // scrollMarginBottom: "500px",
            // padding: "500px",
            // marginBottom: "500px",
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
              <Box sx={{ position: "relative", width: 40, height: 40 }}>
                <IconButton
                  aria-label="menu"
                  sx={{
                    position: "fixed",
                    top: 16,
                    left: 16,
                    zIndex: 3,
                    color: "text.secoundary",
                  }}
                >
                  <MenuIcon sx={{ fontSize: 40 }} />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {/* <Link to="/">ログイン画面に戻る</Link>
      <Link to="/product">product詳細</Link> */}
          <MessageList messageList={messageList} isRegistered={isRegistered} />

          {/* 確認用 */}
          {/* <button onClick={() => setIsOpen(!isOpen)}>ダイアログ表示</button> */}
          {isOpen && (
            <ProductDialog
              isDialogOpen={isOpen}
              onClose={() => setIsOpen(false)}
              setIsRegistered={setIsRegistered}
            />
          )}

          {/* {isFormOpen && <FormDialog />} */}
        </Box>{" "}
      </ThemeProvider>
      {isRegistered && (
        <ListView
          setIsShowDetail={setIsShowDetail}
          isRegistered={isRegistered}
        />
      )}
      {/* ここをフッターにすれば画面中央にくる？ */}

      <footer>{!isShowDetail && <Prompt />}</footer>
    </>
  );
}

import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";

export function ProductDialog({ isDialogOpen }) {
  const [isOpen, setIsOpen] = useState(isDialogOpen);
  const handleClose = () => setIsOpen(false);
  const handleRegister = () => {};
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>神の啓示</DialogTitle>
        <p>ユーザーが手動入力可</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div>
            <ul>
              <li>
                <label>プロダクト名</label>
                <textarea defaultValue="GODの入力内容" />
              </li>
              <li>
                <label>概要</label>
                <textarea defaultValue="GODの入力内容" />
              </li>
              <li>
                <label>開発チームメンバー</label>
                <textarea defaultValue="GODの入力内容" />
              </li>
              <li>
                <label>困りごと（依頼内容）</label>
                <textarea defaultValue="GODの入力内容" />
              </li>
              <li>
                <label>ステークホルダー</label>
                <textarea defaultValue="GODの入力内容" />
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <button>削除</button>
          <button>一時保存</button>
          <button onClick={handleRegister}>崇拝する</button>
        </div>
      </Dialog>
    </>
  );
}

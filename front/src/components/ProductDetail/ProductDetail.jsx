import { useState } from "react";
import { Button, Container } from "@mui/material";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
};

export function ProductDetail() {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditModalIsOpen(true);
        }}
      >
        モーダル開く
      </Button>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={editModalIsOpen}
      >
        <h1>プロダクト名</h1>
        <p>ユーザーが手動入力可</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <ul>
              <li>
                <label>概要</label>
              </li>
              <li>
                <label>開発チームメンバー</label>
              </li>
              <li>
                <label>困りごと（依頼内容）</label>
              </li>
              <li>
                <label>ステークホルダー</label>
              </li>
            </ul>
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditModalIsOpen(false);
          }}
        >
          閉じる
        </Button>
      </Modal>
    </Container>
  );
}

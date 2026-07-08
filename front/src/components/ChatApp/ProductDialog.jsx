import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";

export function ProductDialog({ isDialogOpen }) {
  const [isOpen, setIsOpen] = useState(isDialogOpen);
  const sessionjsonKey = "json";
  const rawData = sessionStorage.getItem(sessionjsonKey);

  const parse = JSON.parse(rawData);

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

  const handleClose = () => setIsOpen(false);

  const handleRegister = async () => {
    const res = await fetch("/projectdata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    console.log(res);
  };

  console.log(req);
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
                <textarea defaultValue={req.product.issuesContent} />
              </li>
              <li>
                <label>概要</label>
                <textarea defaultValue={req.product.providedOutcome} />
              </li>
              <li>
                <label>開発チームメンバー</label>
                <textarea defaultValue={req.product.providedWho} />
              </li>
              <li>
                <label>困りごと（依頼内容）</label>
                <textarea defaultValue={req.product.issuesWhat} />
              </li>
              <li>
                <label>ステークホルダー</label>
                <textarea defaultValue={req.department[0].departmentName} />
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

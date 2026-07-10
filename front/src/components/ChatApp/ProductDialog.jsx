import { Dialog, DialogTitle, Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";

export function ProductDialog({ isDialogOpen }) {
  const [isOpen, setIsOpen] = useState(isDialogOpen);
  const sessionjsonKey = "productData";
  const rawData = sessionStorage.getItem(sessionjsonKey);
  const parse = JSON.parse(rawData);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState(
    parse.department.map((d) => d.departmentName),
  );

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("/departments");
        if (!res.ok) {
          throw new Error(`APIエラー: ${res.status}`);
        }
        const data = await res.json();
        setDepartmentOptions(data.map((d) => d.departmentName));
      } catch (error) {
        console.error("部署一覧の取得に失敗しました", error);
      }
    };
    fetchDepartments();
  }, []);

  const req = {
    // Nameカラム追加に伴うバックエンド実装完了次第、
    // プロパティを追加すること
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
    department: selectedDepartments.map((name) => ({ departmentName: name })),
    classification: parse.classification,
  };

  const handleClose = () => setIsOpen(false);

  const handleRegister = async () => {
    try {
      const res = await fetch("/projectdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      if (!res.ok) {
        throw new Error(`APIエラー: ${res.status}`);
      }

      // const vector = await fetch("/product", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(req.product),
      // });
      const vector = await fetch("/product");
      if (!vector.ok) {
        throw new Error(`APIエラー: ${vector.status}`);
      }
      const data = await vector.json();
      console.log(data);

      // プロダクト登録をチャットに反映する

      // 総合関連度の上位5件のプロダクトを表示する
    } catch (error) {
      console.error("プロダクト登録に失敗しました", error);
    }
  };
  const handleChange = (e, newValue) => {
    setSelectedDepartments(newValue);
  };
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>議事録を元に作成したプロダクト案</DialogTitle>
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
                <Autocomplete
                  multiple
                  options={departmentOptions}
                  value={selectedDepartments}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="部署名を候補から選択" />
                  )}
                />
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
          <button onClick={handleClose}>キャンセル</button>
          <button onClick={handleRegister}>このプロダクトを登録する</button>
        </div>
      </Dialog>
    </>
  );
}

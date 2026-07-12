import { Dialog, DialogTitle, Autocomplete, TextField } from "@mui/material";
import { useState, useEffect } from "react";

export function ProductDialog({ isDialogOpen, onClose }) {
  const sessionjsonKey = "productData";
  const rawData = sessionStorage.getItem(sessionjsonKey);
  const parse = JSON.parse(rawData);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState(
    parse.department.map((d) => d.departmentName),
  );
  const [issuesContent, setIssuesContent] = useState(parse.issues.Content);
  const [providedOutcome, setProvidedOutcome] = useState(
    parse.provided.Outcome,
  );
  const [providedWho, setProvidedWho] = useState(parse.provided.Who);
  const [issuesWhat, setIssuesWhat] = useState(parse.issues.What);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // const res = await fetch("/departments");
        // if (!res.ok) {
        //   throw new Error(`APIエラー: ${res.status}`);
        // }
        // const data = await res.json();
        // setDepartmentOptions(data.map((d) => d.departmentName));

        // 動作確認用の配列
        setDepartmentOptions([
          "ＴＧＲ－ＷＲＴ",
          "Ｂ．Ｎ．Ｉ．Ｎ．",
          "Ｔ．Ｍ．Ｍ．Ｔ．",
          "国際エネルギー機関",
          "連合燃料電池システム研究開発",
        ]);
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
      issuesWhat,
      issuesWhen: parse.issues.When,
      issuesWhere: parse.issues.Where,
      issuesWhy: parse.issues.Why,
      issuesHow: parse.issues.How,
      issuesWhatWhy: parse.issues.What_Why,
      issuesContent,
      providedWho,
      providedWhy: parse.provided.What,
      providedOutcome,
    },
    department: selectedDepartments.map((name) => ({ departmentName: name })),
    classification: parse.classification,
  };

  const handleClose = () => onClose();

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

      const vector = await fetch("/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.product),
      });

      // バックエンドでエンドポイントのメソッドをGETに変更したらこちらを採用する
      // const vector = await fetch("/product");

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
      <Dialog open={isDialogOpen} onClose={handleClose}>
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
                <textarea
                  value={issuesContent}
                  onChange={(e) => setIssuesContent(e.target.value)}
                />
              </li>
              <li>
                <label>概要</label>
                <textarea
                  value={providedOutcome}
                  onChange={(e) => setProvidedOutcome(e.target.value)}
                />
              </li>
              <li>
                <label>開発チームメンバー</label>
                <textarea
                  value={providedWho}
                  onChange={(e) => setProvidedWho(e.target.value)}
                />
              </li>
              <li>
                <label>困りごと（依頼内容）</label>
                <textarea
                  value={issuesWhat}
                  onChange={(e) => setIssuesWhat(e.target.value)}
                />
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

// export const dataLabels = {
//   "issues.Who": "誰が困っているか（例えば、プロジェクト担当者）",
//   "issues.What": "何に困っているか（例えば、会議支援AIのPOC開発を実施）",
//   "issues.When": "いつ（例えば、MTGを実施する前）",
//   "issues.Where": "どこで（例えば、トヨタ社内）",
//   "issues.Why": "なぜ（例えば、会議準備時間を削減して論点漏れを防ぐため）",
//   "issues.How": "どのように（例えば、過去議事録検索）",
//   "issues.What_Why": "何を・なぜ",
//   "issues.Content": "内容",
//   "provided.Who": "誰に提供するか",
//   "provided.What": "何を提供するか",
//   "provided.Outcome": "期待される成果",
// };

export const dataLabels = {
  "issues.Who": {
    question: "この課題で頭を抱えておる者は誰じゃ？",
    example: "例：プロジェクト担当者",
  },
  "issues.What": {
    question: "何に困っておるのじゃ？",
    example: "例：会議支援AIのPOC開発を実施",
  },
  "issues.When": {
    question: "どんな時に困りごとが発生しておるのじゃ？",
    example: "MTGを実施する前などか？",
  },
  "issues.Where": {
    question: "どの部署が抱えている困りごとなのじゃ？",
    example: "",
  },
  "issues.Why": {
    question: "プロダクトの目的はなんじゃ？",
    example: "例：会議準備時間を削減して論点漏れを防ぐため",
  },
  "issues.How": {
    question: "どのようにして解決したいのじゃ？",
    example: "例：過去議事録検索",
  },
  "issues.What_Why": { question: "何を・なぜ", example: "" },
  "issues.Content": { question: "内容", example: "" },
  "provided.Who": {
    question: "このプロダクトは誰に提供するものじゃ？",
    example: "",
  },
  "provided.What": {
    question:
      "このプロダクトを実現することでどのような価値を提供したいのじゃ？",
    example: "",
  },
  "provided.Outcome": { question: "期待される成果はなんじゃ？", example: "" },
};

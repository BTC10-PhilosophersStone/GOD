import { TextField, Typography } from "@mui/material";
import List from "./List";

export default function Text() {
  return (
    <>
      <Typography>
        そなたのプロダクトに似たものがないか、神が提案しよう。
      </Typography>
      <br></br>
      <Typography>
        課題内容、提供価値、ステークホルダー、業務階層の4つの観点から神が総合的に判断した5件が以下のプロダクトじゃ。
      </Typography>
      <List />
    </>
  );
}

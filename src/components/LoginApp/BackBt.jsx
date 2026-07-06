import "./LoginApp.css";
import { Button } from "@mui/material";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { atomNewForm } from "./atoms";
import { useSetAtom } from "jotai";

export function BackBt() {
  const setNewForm = useSetAtom(atomNewForm);
  return (
    <Button
      id="left_button"
      onClick={() => {
        setNewForm(false);
      }}
      variant="contained"
      endIcon={<ReplyAllIcon />}
    >
      戻る
    </Button>
  );
}

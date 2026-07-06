import "./LoginApp.css";
import { atomNewForm } from "./atoms";
import { useSetAtom } from "jotai";
import { Button } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

export function NewAuthBt() {
  const setNewForm = useSetAtom(atomNewForm);

  return (
    <Button
      id="left_button"
      onClick={() => {
        setNewForm(true);
      }}
      variant="contained"
      endIcon={<GroupAddIcon />}
    >
      新規登録
    </Button>
  );
}

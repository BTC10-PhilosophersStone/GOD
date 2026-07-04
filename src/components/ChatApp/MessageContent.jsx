import { Card } from "@mui/material";
export function MessageContent({ message }) {
  return (
    <>
      <Card
        sx={{
          maxWidth: 500,
          textAlign: "center",
          backgroundColor: "whitesmoke",
          marginBottom: 4,
          overlay: "auto",
          display: "flex",
        }}
      >
        <p>メッセージ本文</p>
      </Card>
    </>
  );
}

import { Card } from "@mui/material";
export function MessageContent({ content }) {
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
        <p>{content}</p>
      </Card>
    </>
  );
}

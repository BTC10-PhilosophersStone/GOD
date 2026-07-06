import { Card } from "@mui/material";
export function MessageContent({ post, content }) {
  const isGod = post === "GOD";
  return (
    <>
      <Card
        sx={{
          maxWidth: 500,
          textAlign: "center",
          backgroundColor: isGod ? "gold" : "whitesmoke",
          marginBottom: 4,
          overlay: "auto",
          display: "flex",
          borderRadius: 4,
          padding: "8px 16px",
        }}
      >
        <p>{content}</p>
      </Card>
    </>
  );
}

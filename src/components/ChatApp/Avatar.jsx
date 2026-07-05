export function Avatar({ post }) {
  return (
    <>
      {post === "GOD" ? (
        <p style={{ backgroundColor: "gold" }}>GODアイコン</p>
      ) : (
        <p style={{ backgroundColor: "grey" }}>userアイコン</p>
      )}
    </>
  );
}

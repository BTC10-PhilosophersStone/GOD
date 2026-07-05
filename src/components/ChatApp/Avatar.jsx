export function Avatar({ post }) {
  return (
    <>
      {post === "GOD" ? (
        <img src="/icon_god.png" alt="GODアイコン" width={150} height={150} />
      ) : (
        <img
          src="/kkrn_icon_user_1.png"
          alt="userアイコン"
          width={50}
          height={50}
        />
      )}
    </>
  );
}

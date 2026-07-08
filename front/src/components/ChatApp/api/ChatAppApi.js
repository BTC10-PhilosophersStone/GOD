const baseUrl = "http://localhost:8080";

const apiFetch = async (path, options = {}) => {
  const res = await fetch(`${baseUrl}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`エラー: ${res.status}`);
  }
  return res.json();
};

// ユーザーからのメッセージをbodyとしてリクエストして、
// GODからのメッセージを受け取る
export const postMessage = async (message) => {
  return apiFetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
};

// 議事録（文字列？）を渡して、テンプレートに整形したカルテを受け取る
// export const postMinutes = async (minutes) => {
//   return apiFetch("/api/chat/minutes", {
//     method: "POST",
//     body: JSON.stringify({ minutes }),
//   });
// };

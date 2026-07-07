const baseUrl = `${baseUrl}`;

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

export const getSessionStorage = (key) => {
  const dataStr = sessionStorage.getItem(key);
  const data = JSON.parse(dataStr);
  return data;
};

export const setSessionStorage = (key, obj) => {
  const objStr = JSON.stringify(obj);
  sessionStorage.setItem(key, objStr);
};

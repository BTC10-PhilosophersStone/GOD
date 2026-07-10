import { atom } from "jotai";

const messageListAtom = atom([]);
const promptAtom = atom("");
const isFormDialogOpenAtom = atom(false);
const productDataAtom = atom(null);
const isShortProductDataAtom = atom(false);

export {
  messageListAtom,
  promptAtom,
  isFormDialogOpenAtom,
  productDataAtom,
  isShortProductDataAtom,
};

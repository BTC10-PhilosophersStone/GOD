import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const messageListAtom = atom([]);
const promptAtom = atom("");
const isFormDialogOpenAtom = atom(false);
const isShortProductDataAtom = atom(false);
const storage = createJSONStorage(() => sessionStorage);
const productDataAtom = atomWithStorage("productData", null, storage, {
  getOnInit: true,
});
const isProductDialogOpenAtom = atom(false);
const isLoadingAtom = atom(false);

export {
  messageListAtom,
  promptAtom,
  isFormDialogOpenAtom,
  productDataAtom,
  isShortProductDataAtom,
  isProductDialogOpenAtom,
  isLoadingAtom,
};

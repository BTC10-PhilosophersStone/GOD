import { atom } from "jotai";

const messageListAtom = atom([]);
const promptAtom = atom("");
const isFormDialogOpenAtom = atom(false);

export { messageListAtom, promptAtom, isFormDialogOpenAtom };

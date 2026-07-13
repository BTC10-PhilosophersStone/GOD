import { atom } from "jotai";

const atomEmail = atom("");
const atomPass = atom("");
const atomAuthError = atom("");
const atomNewForm = atom(false);

export { atomEmail, atomPass, atomAuthError, atomNewForm };

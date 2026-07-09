import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useAtom } from "jotai";
import { isFormDialogOpenAtom } from "../atoms";
import { dataLabels } from "./dataLabels";
import { FormDialogField } from "./FormDialogField";

export function FormDialog() {
  const [isOpen, setIsOpen] = useAtom(isFormDialogOpenAtom);
  const sessionjsonKey = "productData";
  const productData = JSON.parse(sessionStorage.getItem(sessionjsonKey));
  const sectionNames = ["issues", "provided"];

  const [formValues, setFormValues] = useState(() => {
    const init = {};
    for (const sectionName of sectionNames) {
      for (const key in productData[sectionName]) {
        const id = `${sectionName}.${key}`;
        const value = productData[sectionName][key];
        init[id] = value === "不明" ? "" : value;
      }
    }
    return init;
  });

  const handleChange = (id, newValue) => {
    setFormValues((prev) => ({ ...prev, [id]: newValue }));
  };

  const handleSubmit = () => {
    const updated = {
      ...productData,
      issues: { ...productData.issues },
      provided: { ...productData.provided },
    };
    for (const id in formValues) {
      const [sectionName, key] = id.split(".");
      updated[sectionName][key] =
        formValues[id].trim() === "" ? "不明" : formValues[id];
    }
    sessionStorage.setItem(sessionjsonKey, JSON.stringify(updated));
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>読み取れなかった項目の入力</DialogTitle>
      <ul>
        {sectionNames.map((sectionName) =>
          Object.keys(productData[sectionName]).map((key) => {
            const id = `${sectionName}.${key}`;
            return (
              <FormDialogField
                key={id}
                label={dataLabels[id] ?? id}
                value={formValues[id]}
                isUnknown={productData[sectionName][key] === "不明"}
                onChange={(newValue) => handleChange(id, newValue)}
              />
            );
          }),
        )}
      </ul>
      <div>
        <button onClick={() => setIsOpen(false)}>キャンセル</button>
        <button onClick={handleSubmit}>保存する</button>
      </div>
    </Dialog>
  );
}

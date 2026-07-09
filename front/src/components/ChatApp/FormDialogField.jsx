export function FormDialogField({ label, value, isUnknown, onChange }) {
  return (
    <li>
      <label>{label}</label>
      <textarea
        value={value}
        placeholder={isUnknown ? "読み取りNG" : ""}
        style={isUnknown && value === "" ? { border: "2px solid red" } : {}}
        onChange={(e) => onChange(e.target.value)}
      />
    </li>
  );
}

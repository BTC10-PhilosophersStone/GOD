import { useAtom } from "jotai";
import { promptAtom } from "../atoms";

export function PromptInput() {
  const [prompt, setPrompt] = useAtom(promptAtom);
  const handleChange = (e) => setPrompt(e.target.value);
  return (
    <textarea
      value={prompt}
      onChange={handleChange}
      placeholder="GODへの質問"
    ></textarea>
  );
}

"use client";
import TextareaAutosize from "react-textarea-autosize";
import { useLocalStorage } from "usehooks-ts";
import useSettings from "@/app/useSettings";
import styles from "./style.module.css";

export default function App(): React.JSX.Element {
  const [value, setValue] = useLocalStorage("peraichi", "");
  const fontSize = useSettings((state) => state.fontSize);

  return (
    <TextareaAutosize
      className={styles.textarea}
      onChange={(e) => setValue(e.currentTarget.value)}
      placeholder="ここに文章を入力してください"
      style={{ fontSize: `${fontSize / 10}rem` }}
      value={value}
    />
  );
}

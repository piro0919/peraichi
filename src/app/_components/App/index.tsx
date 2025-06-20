"use client";
import { Settings } from "feather-icons-react";
import TextareaAutosize from "react-textarea-autosize";
import { useLocalStorage } from "usehooks-ts";
import styles from "./style.module.css";

export default function App(): React.JSX.Element {
  const [value, setValue] = useLocalStorage("peraichi", "");

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.h1}>ぺらいち</h1>
        <button className={styles.button}>
          <Settings color="#333" />
        </button>
      </header>
      <main className={styles.main}>
        <TextareaAutosize
          className={styles.textarea}
          onChange={(e) => setValue(e.currentTarget.value)}
          value={value}
        />
      </main>
    </div>
  );
}

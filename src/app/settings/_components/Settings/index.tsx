"use client";
import { ArrowLeft } from "feather-icons-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Link from "next/link";
import Slider from "rc-slider";
import { useShallow } from "zustand/react/shallow";
import useSettings from "@/app/useSettings";
import styles from "./style.module.css";

const Toggle = dynamic(async () => import("react-toggle"), { ssr: false });

export default function Settings(): React.JSX.Element {
  const { setTheme, theme } = useTheme();
  const { fontSize, setFontSize } = useSettings(
    useShallow((state) => ({
      fontSize: state.fontSize,
      setFontSize: state.setFontSize,
    })),
  );

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <ArrowLeft />
        </Link>
        <h1 className={styles.h1}>設定</h1>
      </header>
      <section className={styles.section}>
        <h2 className={styles.h2}>外観</h2>
        <dl>
          <div className={styles.item}>
            <dt className={styles.term}>フォントサイズ</dt>
            <dd className={styles.description}>
              <Slider
                onChange={(fontSize) => {
                  if (typeof fontSize !== "number") {
                    return;
                  }

                  setFontSize(fontSize);
                }}
                className={styles.slider}
                marks={{ 12: 12, 16: 16, 20: 20, 24: 24, 28: 28, 32: 32 }}
                max={32}
                min={12}
                step={2}
                value={fontSize}
              />
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.term}>ダークモード</dt>
            <dd className={styles.description}>
              <Toggle
                onChange={(e) =>
                  setTheme(e.currentTarget.checked ? "dark" : "light")
                }
                checked={theme === "dark"}
              />
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}

"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs";
import { ArrowLeft } from "feather-icons-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Link from "next/link";
import Slider from "rc-slider";
import usePwa from "use-pwa";
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
  const { signOut } = useAuth();
  const {
    appinstalled,
    canInstallprompt,
    enabledPwa,
    isPwa,
    showInstallPrompt,
  } = usePwa();

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
      <section className={styles.section}>
        <h2 className={styles.h2}>アプリとサービス</h2>
        <dl>
          <div className={styles.item}>
            <dt className={styles.term}>データの共通化</dt>
            <dd className={styles.description}>
              <div className={styles.wrapper}>
                <div className={styles.buttonsContainer}>
                  <SignedOut>
                    <SignInButton
                      forceRedirectUrl={
                        process.env
                          .NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
                      }
                    >
                      <button className={styles.button}>ログイン</button>
                    </SignInButton>
                    <SignUpButton
                      forceRedirectUrl={
                        process.env
                          .NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
                      }
                    >
                      <button className={styles.button}>サインアップ</button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <button
                      onClick={() => {
                        signOut({
                          redirectUrl: "/settings",
                        });
                      }}
                      className={styles.button}
                    >
                      ログアウト
                    </button>
                  </SignedIn>
                </div>
                <p className={styles.description2}>
                  ログインすることで、複数の端末でデータを共有できます。
                </p>
              </div>
            </dd>
          </div>
          {enabledPwa && !isPwa ? (
            <div className={styles.item}>
              <dt className={styles.term}>アプリ</dt>
              <dd className={styles.description}>
                <button
                  className={styles.button}
                  disabled={!canInstallprompt || appinstalled}
                  onClick={showInstallPrompt}
                >
                  インストール
                </button>
              </dd>
            </div>
          ) : null}
        </dl>
      </section>
    </article>
  );
}

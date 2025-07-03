"use client";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Settings } from "feather-icons-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import Spacer from "react-spacer";
import { toast } from "react-toastify";
import useContent from "@/app/useContent";
import { api } from "../../../../convex/_generated/api";
import styles from "./style.module.css";

const PWAPrompt = dynamic(async () => import("react-ios-pwa-prompt"), {
  ssr: false,
});

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const { user } = useUser();
  const saveToCloud = useContent((state) => state.saveToCloud);
  const isContentSynced = useContent((state) => state.isContentSynced);
  const saveMemo = useMutation(api.memos.saveMemo);
  const handleSaveToCloud = (): void => {
    if (user) {
      saveToCloud(saveMemo, user.id)
        // eslint-disable-next-line promise/always-return
        .then(() => {
          toast.success("クラウドに保存しました");
        })
        .catch((error) => {
          console.error("Failed to save to cloud:", error);
          toast.error("保存に失敗しました");
        });
    }
  };
  const pathname = usePathname();

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return <>{children}</>;
  }

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link className={styles.title} href="/">
            ぺらいち
          </Link>
          <Spacer grow={1} />
          {pathname === "/" ? (
            <SignedIn>
              <button
                className={styles.button}
                disabled={isContentSynced}
                onClick={handleSaveToCloud}
              >
                クラウドに保存
              </button>
            </SignedIn>
          ) : null}
          <Link href="/settings">
            <Settings />
          </Link>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
      <PWAPrompt
        appIconPath="/apple-icon.png"
        copyAddToHomeScreenStep="2) 「ホーム画面に追加」をタップします。"
        copyDescription="このウェブサイトにはアプリ機能があります。ホーム画面に追加してフルスクリーンおよびオフラインで使用できます。"
        copyShareStep="1) （四角から矢印が飛び出したマーク）をタップします。"
        copyTitle="ホーム画面に追加"
        isShown={process.env.NODE_ENV === "development"}
        promptOnVisit={1}
        timesToShow={1}
      />
    </>
  );
}

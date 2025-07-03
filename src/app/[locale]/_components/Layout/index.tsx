"use client";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Settings } from "feather-icons-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import Spacer from "react-spacer";
import { toast } from "react-toastify";
import useShowWindowSize from "use-show-window-size";
import useContent from "@/app/[locale]/useContent";
import { Link, usePathname } from "@/i18n/navigation";
import { api } from "../../../../../convex/_generated/api";
import styles from "./style.module.css";

const PWAPrompt = dynamic(async () => import("react-ios-pwa-prompt"), {
  ssr: false,
});

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const t = useTranslations("Layout");
  const { user } = useUser();
  const saveToCloud = useContent((state) => state.saveToCloud);
  const isContentSynced = useContent((state) => state.isContentSynced);
  const saveMemo = useMutation(api.memos.saveMemo);
  const handleSaveToCloud = (): void => {
    if (user) {
      saveToCloud(saveMemo, user.id)
        // eslint-disable-next-line promise/always-return
        .then(() => {
          toast.success(t("savedToCloud"));
        })
        .catch((error) => {
          console.error("Failed to save to cloud:", error);
          toast.error(t("failedToSaveToCloud"));
        });
    }
  };
  const pathname = usePathname();

  useShowWindowSize({
    disable: process.env.NODE_ENV === "production",
  });

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return <>{children}</>;
  }

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link className={styles.title} href="/">
            {t("title")}
          </Link>
          <Spacer grow={1} />
          {pathname === "/" ? (
            <SignedIn>
              <button
                className={styles.button}
                disabled={isContentSynced}
                onClick={handleSaveToCloud}
              >
                {t("saveToCloud")}
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
        copyAddToHomeScreenStep={t("copyAddToHomeScreenStep") || undefined}
        copyDescription={t("copyDescription") || undefined}
        copyShareStep={t("copyShareStep") || undefined}
        copyTitle={t("copyTitle") || undefined}
        isShown={process.env.NEXT_PUBLIC_IS_SHOWN_PWA_PROMPT === "true"}
        promptOnVisit={1}
        timesToShow={1}
      />
    </>
  );
}

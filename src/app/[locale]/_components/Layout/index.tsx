"use client";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Settings } from "feather-icons-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { toast } from "react-toastify";
import useShowWindowSize from "use-show-window-size";
import useContent from "@/app/[locale]/useContent";
import { Button } from "@/components/ui/button";
import env from "@/env";
import { Link, usePathname } from "@/i18n/navigation";
import { api } from "../../../../../convex/_generated/api";

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
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between px-4">
            <Link
              className="font-(family-name:--font-zen-kurenaido) text-xl tracking-wide transition-opacity hover:opacity-70"
              href="/"
            >
              {t("title")}
            </Link>
            <div className="flex items-center gap-2">
              {pathname === "/" ? (
                <SignedIn>
                  <Button
                    disabled={isContentSynced}
                    onClick={handleSaveToCloud}
                    size="sm"
                  >
                    {t("saveToCloud")}
                  </Button>
                </SignedIn>
              ) : null}
              <Link
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                href="/settings"
              >
                <Settings size={18} />
              </Link>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
      <PWAPrompt
        appIconPath="/apple-icon.png"
        copyAddToHomeScreenStep={t("copyAddToHomeScreenStep") || undefined}
        copyDescription={t("copyDescription") || undefined}
        copyShareStep={t("copyShareStep") || undefined}
        copyTitle={t("copyTitle") || undefined}
        isShown={env.NEXT_PUBLIC_IS_SHOWN_PWA_PROMPT}
        promptOnVisit={1}
        timesToShow={1}
      />
    </>
  );
}

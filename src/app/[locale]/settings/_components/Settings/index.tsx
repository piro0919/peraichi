"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs";
import { ArrowLeft } from "feather-icons-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Slider from "rc-slider";
import usePwa from "use-pwa";
import { useShallow } from "zustand/react/shallow";
import useSettings from "@/app/[locale]/useSettings";
import env from "@/env";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import styles from "./style.module.css";

const Toggle = dynamic(async () => import("react-toggle"), { ssr: false });

export default function Settings(): React.JSX.Element {
  const t = useTranslations("Settings");
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
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  console.log({
    appinstalled,
    canInstallprompt,
    enabledPwa,
    isPwa,
  });

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <Link href="/">
          <ArrowLeft />
        </Link>
        <h1 className={styles.h1}>{t("title")}</h1>
      </header>
      <section className={styles.section}>
        <h2 className={styles.h2}>{t("appearance")}</h2>
        <dl>
          <div className={styles.item}>
            <dt className={styles.term}>{t("language")}</dt>
            <dd className={styles.description}>
              <Toggle
                icons={{
                  checked: <div className={styles.toggleIconContainer}>EN</div>,
                  unchecked: (
                    <div className={styles.toggleIconContainer}>JA</div>
                  ),
                }}
                onChange={(e) =>
                  router.replace(pathname, {
                    locale: e.currentTarget.checked ? "en" : "ja",
                  })
                }
                defaultChecked={locale === "en"}
              />
            </dd>
          </div>
          <div className={styles.item}>
            <dt className={styles.term}>{t("fontSize")}</dt>
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
            <dt className={styles.term}>{t("darkMode")}</dt>
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
        <h2 className={styles.h2}>{t("appAndService")}</h2>
        <dl>
          <div className={styles.item}>
            <dt className={styles.term}>{t("dataSync")}</dt>
            <dd className={styles.description}>
              <div className={styles.wrapper}>
                <div className={styles.buttonsContainer}>
                  <SignedOut>
                    <SignInButton
                      forceRedirectUrl={
                        env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
                      }
                    >
                      <button className={styles.button}>{t("login")}</button>
                    </SignInButton>
                    <SignUpButton
                      forceRedirectUrl={
                        env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
                      }
                    >
                      <button className={styles.button}>{t("signup")}</button>
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
                      {t("logout")}
                    </button>
                  </SignedIn>
                </div>
                <p className={styles.description2}>
                  {t("dataSyncDescription")}
                </p>
              </div>
            </dd>
          </div>
          {enabledPwa && !isPwa ? (
            <div className={styles.item}>
              <dt className={styles.term}>{t("app")}</dt>
              <dd className={styles.description}>
                <button
                  className={styles.button}
                  disabled={!canInstallprompt || appinstalled}
                  onClick={showInstallPrompt}
                >
                  {t("install")}
                </button>
              </dd>
            </div>
          ) : null}
        </dl>
      </section>
    </article>
  );
}

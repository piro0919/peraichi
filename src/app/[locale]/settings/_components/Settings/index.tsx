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
import usePwa from "use-pwa";
import { useShallow } from "zustand/react/shallow";
import useHydrated from "@/app/[locale]/useHydrated";
import useSettings, {
  type FontFamily,
  type LineHeight,
} from "@/app/[locale]/useSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Slider from "@/components/ui/slider";
import env from "@/env";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Settings(): React.JSX.Element {
  const t = useTranslations("Settings");
  const { setTheme, theme } = useTheme();
  const mounted = useHydrated();
  const {
    fontFamily,
    fontSize,
    lineHeight,
    setFontFamily,
    setFontSize,
    setLineHeight,
  } = useSettings(
    useShallow((state) => ({
      fontFamily: state.fontFamily,
      fontSize: state.fontSize,
      lineHeight: state.lineHeight,
      setFontFamily: state.setFontFamily,
      setFontSize: state.setFontSize,
      setLineHeight: state.setLineHeight,
    })),
  );
  const { signOut } = useAuth();
  const { canInstall, install, isInstalled, isSupported } = usePwa();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6">
      <header className="mb-6 flex items-center gap-3">
        <Link
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          href="/"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-lg font-semibold">{t("title")}</h1>
      </header>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("appearance")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("language")}</span>
              <Select
                onValueChange={(value) =>
                  router.replace(pathname, { locale: value })
                }
                value={locale}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("fontFamily")}</span>
              <Select
                onValueChange={(value) => setFontFamily(value as FontFamily)}
                value={fontFamily}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="noto-sans">
                    {t("fontFamilySansSerif")}
                  </SelectItem>
                  <SelectItem value="noto-serif">
                    {t("fontFamilySerif")}
                  </SelectItem>
                  <SelectItem value="zen-maru">
                    {t("fontFamilyRounded")}
                  </SelectItem>
                  <SelectItem value="klee">
                    {t("fontFamilyHandwriting")}
                  </SelectItem>
                  <SelectItem value="monospace">
                    {t("fontFamilyMonospace")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t("fontSize")}</span>
                <span className="text-sm text-muted-foreground">
                  {fontSize}px
                </span>
              </div>
              <div className="space-y-2">
                <Slider
                  max={32}
                  min={12}
                  onValueChange={(value) => setFontSize(value[0])}
                  step={2}
                  value={[fontSize]}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>12</span>
                  <span>16</span>
                  <span>20</span>
                  <span>24</span>
                  <span>28</span>
                  <span>32</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("lineHeight")}</span>
              <Select
                onValueChange={(value) => setLineHeight(value as LineHeight)}
                value={lineHeight}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">
                    {t("lineHeightCompact")}
                  </SelectItem>
                  <SelectItem value="normal">
                    {t("lineHeightNormal")}
                  </SelectItem>
                  <SelectItem value="relaxed">
                    {t("lineHeightRelaxed")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t("theme")}</span>
              <Select
                onValueChange={setTheme}
                value={mounted ? theme : "system"}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">{t("themeSystem")}</SelectItem>
                  <SelectItem value="light">{t("themeLight")}</SelectItem>
                  <SelectItem value="sepia">{t("themeSepia")}</SelectItem>
                  <SelectItem value="ocean">{t("themeOcean")}</SelectItem>
                  <SelectItem value="forest">{t("themeForest")}</SelectItem>
                  <SelectItem value="dark">{t("themeDark")}</SelectItem>
                  <SelectItem value="dark-midnight">
                    {t("themeMidnight")}
                  </SelectItem>
                  <SelectItem value="dark-mocha">{t("themeMocha")}</SelectItem>
                  <SelectItem value="dark-emerald">
                    {t("themeEmerald")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("appAndService")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <span className="text-sm font-medium">{t("dataSync")}</span>
                <p className="text-sm text-muted-foreground">
                  {t("dataSyncDescription")}
                </p>
              </div>
              <div className="flex gap-2">
                <SignedOut>
                  <SignInButton
                    forceRedirectUrl={
                      env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
                    }
                  >
                    <Button size="sm" variant="outline">
                      {t("login")}
                    </Button>
                  </SignInButton>
                  <SignUpButton
                    forceRedirectUrl={
                      env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
                    }
                  >
                    <Button size="sm">{t("signup")}</Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Button
                    onClick={() => {
                      signOut({
                        redirectUrl: "/settings",
                      });
                    }}
                    size="sm"
                    variant="outline"
                  >
                    {t("logout")}
                  </Button>
                </SignedIn>
              </div>
            </div>
            {isSupported && !isInstalled ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t("app")}</span>
                <Button
                  onClick={(): void => {
                    void install();
                  }}
                  disabled={!canInstall}
                  size="sm"
                >
                  {t("install")}
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

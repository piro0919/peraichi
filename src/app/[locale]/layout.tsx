// eslint-disable-next-line filenames/match-exported
import { jaJP } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-toggle/style.css";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Noto_Sans_JP } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Layout from "./_components/Layout";
import ToastProvider from "./_components/ToastProvider";
import ConvexClientProvider from "./ConvexClientProvider";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const APP_NAME = t("title");
  const APP_DEFAULT_TITLE = t("title");
  const APP_TITLE_TEMPLATE = `%s - ${t("title")}`;
  const APP_DESCRIPTION = t("description");

  return {
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: APP_DEFAULT_TITLE,
      // startUpImage: [],
    },
    applicationName: APP_NAME,
    description: APP_DESCRIPTION,
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      description: APP_DESCRIPTION,
      siteName: APP_NAME,
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      type: "website",
    },
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    twitter: {
      card: "summary",
      description: APP_DESCRIPTION,
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>): Promise<React.JSX.Element> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <ConvexClientProvider>
      <ClerkProvider localization={locale === "ja" ? jaJP : undefined}>
        <html lang={locale} suppressHydrationWarning={true}>
          <body className={notoSansJP.className}>
            <NextIntlClientProvider>
              <ThemeProvider enableSystem={false}>
                <Layout>{children}</Layout>
                <ToastProvider />
              </ThemeProvider>
            </NextIntlClientProvider>
          </body>
        </html>
      </ClerkProvider>
    </ConvexClientProvider>
  );
}

// eslint-disable-next-line filenames/match-exported
import { jaJP } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Noto_Sans_JP } from "next/font/google";
import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-toggle/style.css";
import Layout from "./_components/Layout";
import ToastProvider from "./_components/ToastProvider";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";
import type { Metadata } from "next";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});
const APP_NAME = "ぺらいち";
const APP_DEFAULT_TITLE = "ぺらいち";
const APP_TITLE_TEMPLATE = "%s - ぺらいち";
const APP_DESCRIPTION = "ぺらいちは、シンプルなメモサービスです。";

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <ConvexClientProvider>
      <ClerkProvider localization={jaJP}>
        <html lang="ja" suppressHydrationWarning={true}>
          <body className={notoSansJP.className}>
            <ThemeProvider enableSystem={false}>
              <Layout>{children}</Layout>
              <ToastProvider />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </ConvexClientProvider>
  );
}

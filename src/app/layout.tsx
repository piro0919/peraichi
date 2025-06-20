// eslint-disable-next-line filenames/match-exported
import { Noto_Sans_JP } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});
const APP_NAME = "ぺらいち";
const APP_DEFAULT_TITLE = "ぺらいち";
const APP_TITLE_TEMPLATE = "%s - ぺらいち";
const APP_DESCRIPTION =
  "ぺらいちは、あなたのためのパーソナルな一枚のページです。";

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
    <html lang="ja">
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}

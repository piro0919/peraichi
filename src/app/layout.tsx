// eslint-disable-next-line filenames/match-exported
import { Noto_Sans_JP } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  description: "",
  title: "ぺらいち",
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

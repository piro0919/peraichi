import { Settings } from "feather-icons-react";
import Link from "next/link";
import { type ReactNode } from "react";
import styles from "./style.module.css";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.title} href="/">
          ぺらいち
        </Link>
        <Link href="/settings">
          <Settings />
        </Link>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

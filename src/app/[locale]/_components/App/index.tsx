"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import useContent from "@/app/[locale]/useContent";
import useSettings from "@/app/[locale]/useSettings";
import { api } from "../../../../../convex/_generated/api";
import styles from "./style.module.css";

export default function App(): React.JSX.Element {
  const t = useTranslations("App");
  const { isSignedIn, user } = useUser();
  const content = useContent((state) => state.content);
  const setContent = useContent((state) => state.setContent);
  const setCloudContent = useContent((state) => state.setCloudContent);
  const fontSize = useSettings((state) => state.fontSize);
  const getMemo = useQuery(
    api.memos.getMemo,
    isSignedIn && user ? { userId: user.id } : "skip",
  );

  // Load memo from Convex when user signs in
  useEffect(() => {
    if (isSignedIn && user && getMemo) {
      const cloudData = getMemo.content || "";

      setContent(cloudData);
      setCloudContent(cloudData);
    }
  }, [isSignedIn, user, getMemo, setContent, setCloudContent]);

  const handleContentChange = (newContent: string): void => {
    setContent(newContent);
  };

  return (
    <TextareaAutosize
      className={styles.textarea}
      onChange={(e) => handleContentChange(e.currentTarget.value)}
      placeholder={t("placeholder")}
      style={{ fontSize: `${fontSize / 10}rem` }}
      value={content}
    />
  );
}

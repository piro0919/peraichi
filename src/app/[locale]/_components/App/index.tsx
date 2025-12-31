"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import TextareaAutosize from "react-textarea-autosize";
import useContent from "@/app/[locale]/useContent";
import useSettings, {
  type FontFamily,
  type LineHeight,
} from "@/app/[locale]/useSettings";
import { api } from "../../../../../convex/_generated/api";

const fontFamilyMap: Record<FontFamily, string> = {
  klee: "var(--font-klee-one), sans-serif",
  monospace: "monospace",
  "noto-sans": "var(--font-noto-sans-jp), sans-serif",
  "noto-serif": "var(--font-noto-serif-jp), serif",
  "zen-maru": "var(--font-zen-maru-gothic), sans-serif",
};
const lineHeightMap: Record<LineHeight, number> = {
  compact: 1.4,
  normal: 1.75,
  relaxed: 2.0,
};

export default function App(): React.JSX.Element {
  const t = useTranslations("App");
  const { isSignedIn, user } = useUser();
  const content = useContent((state) => state.content);
  const setContent = useContent((state) => state.setContent);
  const setCloudContent = useContent((state) => state.setCloudContent);
  const fontFamily = useSettings((state) => state.fontFamily);
  const fontSize = useSettings((state) => state.fontSize);
  const lineHeight = useSettings((state) => state.lineHeight);
  const fontFamilyValue = useMemo(
    () => fontFamilyMap[fontFamily],
    [fontFamily],
  );
  const lineHeightValue = useMemo(
    () => lineHeightMap[lineHeight],
    [lineHeight],
  );
  const getMemo = useQuery(
    api.memos.getMemo,
    isSignedIn && user ? { userId: user.id } : "skip",
  );

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
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <TextareaAutosize
        style={{
          fontFamily: fontFamilyValue,
          fontSize: `${fontSize}px`,
          lineHeight: lineHeightValue,
        }}
        className="min-h-[calc(100dvh-8rem)] w-full resize-none border-none bg-transparent outline-none placeholder:text-muted-foreground"
        onChange={(e) => handleContentChange(e.currentTarget.value)}
        placeholder={t("placeholder")}
        value={content}
      />
    </div>
  );
}

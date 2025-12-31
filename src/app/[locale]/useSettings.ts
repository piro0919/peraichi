import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FontFamily =
  | "klee"
  | "monospace"
  | "noto-sans"
  | "noto-serif"
  | "zen-maru";

export type LineHeight = "compact" | "normal" | "relaxed";

export type SettingsState = {
  fontFamily: FontFamily;
  fontSize: number;
  hasSeenLanding: boolean;
  lineHeight: LineHeight;
  setFontFamily: (fontFamily: FontFamily) => void;
  setFontSize: (fontSize: number) => void;
  setHasSeenLanding: (hasSeenLanding: boolean) => void;
  setLineHeight: (lineHeight: LineHeight) => void;
};

const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      fontFamily: "noto-sans",
      fontSize: 16,
      hasSeenLanding: false,
      lineHeight: "normal",
      setFontFamily: (fontFamily): void => set({ fontFamily }),
      setFontSize: (fontSize): void => set({ fontSize }),
      setHasSeenLanding: (hasSeenLanding): void => set({ hasSeenLanding }),
      setLineHeight: (lineHeight): void => set({ lineHeight }),
    }),
    {
      name: "settings-storage",
    },
  ),
);

export default useSettings;

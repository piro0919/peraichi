import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SettingsState = {
  fontSize: number;
  setFontSize: (fontSize: number) => void;
};

const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      fontSize: 16,
      setFontSize: (fontSize): void => set({ fontSize }),
    }),
    {
      name: "settings-storage",
    },
  ),
);

export default useSettings;

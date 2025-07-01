import { create } from "zustand";
import { persist } from "zustand/middleware";

type SaveMemoFunction = (args: {
  content: string;
  userId: string;
}) => Promise<null>;

type ContentState = {
  cloudContent: string;
  content: string;
  isContentSynced: boolean;
  saveToCloud: (saveMemo: SaveMemoFunction, userId: string) => Promise<void>;
  setCloudContent: (content: string) => void;
  setContent: (content: string) => void;
};

const useContent = create<ContentState>()(
  persist(
    (set, get): ContentState => ({
      cloudContent: "",
      content: "",
      isContentSynced: true,
      saveToCloud: async (
        saveMemo: SaveMemoFunction,
        userId: string,
      ): Promise<void> => {
        const { content } = get();

        if (content.trim() && userId) {
          await saveMemo({ content, userId });
          set({ cloudContent: content, isContentSynced: true });
        }
      },
      setCloudContent: (content: string): void => {
        const { content: currentContent } = get();

        set({
          cloudContent: content,
          isContentSynced: content === currentContent,
        });
      },
      setContent: (content: string): void => {
        const { cloudContent } = get();

        set({
          content,
          isContentSynced: content === cloudContent,
        });
      },
    }),
    {
      name: "peraichi",
    },
  ),
);

export default useContent;

import { useSyncExternalStore } from "react";

const emptySubscribe = (): (() => void) => (): void => {};

export default function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

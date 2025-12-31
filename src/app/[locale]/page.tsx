"use client";
import useHydrated from "@/app/[locale]/useHydrated";
import useSettings from "@/app/[locale]/useSettings";
import App from "./_components/App";
import Landing from "./_components/Landing";

export default function Page(): null | React.JSX.Element {
  const isHydrated = useHydrated();
  const hasSeenLanding = useSettings((state) => state.hasSeenLanding);

  if (!isHydrated) {
    return null;
  }

  if (!hasSeenLanding) {
    return <Landing />;
  }

  return <App />;
}

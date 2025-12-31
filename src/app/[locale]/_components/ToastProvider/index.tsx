"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function ToastProvider(): React.JSX.Element {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR hydration pattern
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <ToastContainer
      position="bottom-right"
      style={{ fontSize: "1.2rem", fontWeight: "700" }}
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
}

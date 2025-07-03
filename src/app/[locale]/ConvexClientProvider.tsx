// eslint-disable-next-line filenames/match-regex
"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { type ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

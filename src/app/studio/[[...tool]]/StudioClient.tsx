"use client";

import dynamicImport from "next/dynamic";

// All Sanity imports are deferred to client-side to avoid SSR React conflicts
const StudioBundle = dynamicImport(
  async () => {
    const [{ NextStudio }, { default: config }] = await Promise.all([
      import("next-sanity/studio"),
      import("@/sanity.config"),
    ]);
    return function Studio() {
      return <NextStudio config={config} />;
    };
  },
  { ssr: false }
);

export default function StudioClient() {
  return <StudioBundle />;
}

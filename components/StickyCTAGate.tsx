"use client";

  // components/StickyCTAGate.tsx - Hides the sticky call to action on the calculator / app / home page.

import { usePathname } from "next/navigation";
import StickyCTA from "./StickyCTA";

export default function StickyCTAGate() {
  const pathname = usePathname();

  // Hide on the calculator page (your home "/")
  if (pathname === "/") return null;

  // (Optional) Hide on more routes:
  // if (pathname?.startsWith("/admin")) return null;

  return <StickyCTA />;
}

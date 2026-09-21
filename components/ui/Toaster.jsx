"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

export default function Toaster() {
  const { theme = "system", resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={resolvedTheme || theme}
      position="top-right"
      richColors
      closeButton
      style={{
        fontFamily: "var(--font-jakarta), sans-serif",
      }}
      toastOptions={{
        style: {
          borderRadius: "14px",
          padding: "14px 16px",
          fontSize: "13.5px",
        },
      }}
    />
  );
}

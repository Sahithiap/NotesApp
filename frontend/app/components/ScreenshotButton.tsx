// 📂 frontend/app/components/Screenshot.tsx
"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";

interface ScreenshotProps {
  targetId: string; // ID of the element to capture
}

export default function Screenshot({ targetId }: ScreenshotProps) {
  const capture = async () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL("image/png");

      // Create a download link
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `screenshot-${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error("Screenshot failed:", err);
    }
  };

  return (
    <button
      onClick={capture}
      className="px-3 py-2 bg-secondary text-white rounded hover:bg-amber-600"
    >
      Take Screenshot
    </button>
  );
}

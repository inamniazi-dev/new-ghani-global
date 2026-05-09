"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true),  400);
    const t2 = setTimeout(() => setVisible(false), 650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      /* Deep Navy — logo colours (green + blue text) pop perfectly on this */
      background: "#01082c",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "28px",
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 0.3s ease",
      pointerEvents: fadeOut ? "none" : "all",
    }}>
      {/* Stacked logo — large, full name visible */}
      <div style={{
        animation: "loaderFadeUp 0.4s ease forwards",
        opacity: 0,
        width: "260px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Image
          src="/logo-stacked.png"
          alt="Ghani Global Group"
          width={260}
          height={176}
          style={{ objectFit:"contain", width:"260px", height:"auto" }}
          priority
        />
      </div>

      {/* Gold progress bar */}
      <div style={{
        width: "160px", height: "2px",
        background: "rgba(255,255,255,0.1)",
        overflow: "hidden",
        animation: "loaderFadeUp 0.4s ease 0.1s forwards",
        opacity: 0,
      }}>
        <div style={{
          height: "100%",
          background: "#d3b83b",
          animation: "loaderBar 0.65s ease 0.15s forwards",
          width: "0%",
        }}/>
      </div>
    </div>
  );
}

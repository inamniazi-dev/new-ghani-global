"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ComingSoonPage() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div style={{
      background: "var(--navy)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Dynamic mouse-following glow */}
      {mounted && (
        <div style={{
          position: "fixed",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(164,199,61,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          transition: "left 0.8s ease, top 0.8s ease",
        }}/>
      )}

      {/* Static background accents */}
      <div style={{ position:"absolute", top:"-200px", right:"-200px", width:"700px", height:"700px", borderRadius:"50%", background:"radial-gradient(circle, rgba(211,184,59,0.06) 0%, transparent 65%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-200px", left:"-200px", width:"700px", height:"700px", borderRadius:"50%", background:"radial-gradient(circle, rgba(164,199,61,0.05) 0%, transparent 65%)", pointerEvents:"none" }}/>

      {/* Top gold line */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg, transparent 0%, var(--green) 30%, var(--gold) 70%, transparent 100%)" }}/>

      {/* Grid pattern */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(164,199,61,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(164,199,61,0.03) 1px, transparent 1px)", backgroundSize:"80px 80px", pointerEvents:"none" }}/>

      {/* Large ghost text background */}
      <div style={{
        position:"absolute",
        top:"50%", left:"50%",
        transform:"translate(-50%, -50%)",
        fontSize:"clamp(120px, 20vw, 280px)",
        fontWeight:900,
        color:"rgba(255,255,255,0.02)",
        lineHeight:1,
        fontFamily:"Maven Pro, sans-serif",
        letterSpacing:"-0.04em",
        whiteSpace:"nowrap",
        userSelect:"none",
        pointerEvents:"none",
      }}>WORK IN PROGRESS</div>

      {/* Main content */}
      <div style={{
        position:"relative", zIndex:2,
        textAlign:"center",
        padding:"clamp(48px,8vw,96px) clamp(32px,6vw,96px)",
        maxWidth:"720px",
        margin:"0 auto",
      }}>

        {/* Eyebrow */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:"12px",
          fontSize:"9px", letterSpacing:"0.35em", textTransform:"uppercase",
          fontWeight:700, color:"var(--gold)", marginBottom:"32px",
        }}>
          <span style={{ width:"32px", height:"1px", background:"var(--gold)", display:"inline-block" }}/>
          Work In Progress
          <span style={{ width:"32px", height:"1px", background:"var(--gold)", display:"inline-block" }}/>
        </div>

        {/* Heading */}
        <h1 className="font-display" style={{
          fontSize:"clamp(64px,10vw,120px)",
          fontWeight:300,
          lineHeight:0.95,
          letterSpacing:"-0.03em",
          marginBottom:"32px",
        }}>
          <span style={{ color:"white", display:"block" }}>Work In</span>
          <em style={{ color:"var(--gold)", fontStyle:"italic", display:"block" }}>Progress</em>
        </h1>

        {/* Divider */}
        <div style={{ display:"flex", alignItems:"center", gap:"16px", justifyContent:"center", marginBottom:"40px" }}>
          <div style={{ height:"1px", width:"48px", background:"linear-gradient(90deg, transparent, var(--green))" }}/>
          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"var(--green)" }}/>
          <div style={{ height:"1px", width:"48px", background:"linear-gradient(90deg, var(--green), transparent)" }}/>
        </div>

        {/* Description */}
        <p style={{
          fontSize:"clamp(15px,1.5vw,18px)",
          lineHeight:1.9,
          color:"rgba(255,255,255,0.5)",
          fontWeight:300,
          marginBottom:"56px",
          maxWidth:"520px",
          margin:"0 auto 56px",
        }}>
          We are working hard to bring you something exceptional. This section of our website is currently under development and will be available very soon.
        </p>

        {/* Buttons */}
        <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/"
            style={{
              display:"inline-flex", alignItems:"center", gap:"10px",
              padding:"15px 32px",
              background:"var(--gold)",
              color:"var(--navy)",
              fontSize:"11px", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700,
              textDecoration:"none", transition:"all 0.3s ease",
              borderRadius:"4px",
            }}
            onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="var(--green)"; el.style.color="white"; el.style.transform="translateY(-2px)"; el.style.boxShadow="0 8px 24px rgba(164,199,61,0.3)"; }}
            onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="var(--gold)"; el.style.color="var(--navy)"; el.style.transform="translateY(0)"; el.style.boxShadow="none"; }}>
            ← Back to Home
          </Link>
          <Link href="/contact"
            style={{
              display:"inline-flex", alignItems:"center", gap:"10px",
              padding:"15px 32px",
              background:"transparent",
              border:"1px solid rgba(211,184,59,0.4)",
              color:"var(--gold)",
              fontSize:"11px", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700,
              textDecoration:"none", transition:"all 0.3s ease",
              borderRadius:"4px",
            }}
            onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="rgba(211,184,59,0.08)"; el.style.borderColor="var(--gold)"; el.style.transform="translateY(-2px)"; }}
            onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.borderColor="rgba(211,184,59,0.4)"; el.style.transform="translateY(0)"; }}>
            Contact Us
          </Link>
        </div>

        {/* Bottom company name */}
        <p style={{
          marginTop:"64px",
          fontSize:"10px", letterSpacing:"0.25em", textTransform:"uppercase",
          color:"rgba(255,255,255,0.2)", fontWeight:600,
        }}>
          Ghani Global Group · Est. 2007 · Lahore, Pakistan
        </p>

      </div>

      {/* Bottom gold line */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg, transparent 0%, var(--gold) 30%, var(--green) 70%, transparent 100%)" }}/>

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .coming-soon-content > * {
          animation: fadeUp 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
}

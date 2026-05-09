"use client";
import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const announcements = [
  { tag:"NEWS", text:"Ghani ChemWorld Limited Calcium Carbide Project Progresses at Hattar SEZ", href:"/news" },
  { tag:"NEWS", text:"Ghani Global Holdings Limited Announces Interim Financial Results", href:"/news" },
  { tag:"NEWS", text:"Annual General Meeting Notice Issued to Shareholders", href:"/news" },
];

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div style={{
      position:"relative", zIndex:60,
      background:"linear-gradient(90deg, var(--navy) 0%, #050e3a 50%, var(--navy) 100%)",
      borderBottom:"1px solid rgba(211,184,59,0.3)",
      height:"36px",
      display:"flex",
      alignItems:"center",
      overflow:"hidden",
    }}>
      {/* NEW badge on the left */}
      <div style={{
        flexShrink:0,
        display:"flex",
        alignItems:"center",
        gap:"8px",
        padding:"0 16px",
        borderRight:"1px solid rgba(211,184,59,0.2)",
        height:"100%",
        background:"rgba(211,184,59,0.1)",
        zIndex:2,
      }}>
        <span style={{
          fontSize:"8px", fontWeight:800, letterSpacing:"0.18em",
          textTransform:"uppercase", color:"var(--navy)",
          background:"var(--gold)", padding:"2px 7px", borderRadius:"3px",
        }}>NEWS</span>
      </div>

      {/* Marquee scrolling area */}
      <div style={{ flex:1, overflow:"hidden", position:"relative" }}
        onMouseEnter={e => {
          const track = e.currentTarget.querySelector(".announce-track") as HTMLElement;
          if (track) track.style.animationPlayState = "paused";
        }}
        onMouseLeave={e => {
          const track = e.currentTarget.querySelector(".announce-track") as HTMLElement;
          if (track) track.style.animationPlayState = "running";
        }}
      >
        <div className="announce-track" style={{ display:"flex", width:"max-content" }}>
          {[...announcements, ...announcements].map((a, i) => (
            <Link key={i} href={a.href}
              style={{
                display:"inline-flex", alignItems:"center", gap:"10px",
                padding:"0 48px", whiteSpace:"nowrap", textDecoration:"none",
                fontSize:"11px", color:"rgba(255,255,255,0.75)", fontWeight:500,
                letterSpacing:"0.03em", transition:"color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
              <span style={{ width:"4px", height:"4px", borderRadius:"50%", background:"var(--gold)", flexShrink:0, display:"inline-block" }}/>
              {a.text}
            </Link>
          ))}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setDismissed(true)}
        style={{
          flexShrink:0, width:"36px", height:"100%",
          display:"flex", alignItems:"center", justifyContent:"center",
          background:"none", border:"none", borderLeft:"1px solid rgba(211,184,59,0.2)",
          color:"rgba(255,255,255,0.4)", cursor:"pointer", transition:"color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
        <X size={12}/>
      </button>

      <style>{`
        .announce-track {
          animation: announceScroll 30s linear infinite;
        }
        @keyframes announceScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

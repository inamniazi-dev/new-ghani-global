"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const psxCompanies = [
  { name:"Ghani Global Holdings Limited",     ticker:"GGHL", sector:"Principal Holding",   color:"var(--gold)",  borderColor:"rgba(211,184,59,0.45)", bgActive:"rgba(211,184,59,0.08)", href:"/about",                                ext:false, desc:"The principal holding company managing strategic investments across the Ghani Global Group portfolio." },
  { name:"Ghani Chemical Industries Limited", ticker:"GCIL", sector:"Industrial Gases",    color:"var(--green)", borderColor:"rgba(164,199,61,0.45)", bgActive:"rgba(164,199,61,0.08)", href:"https://ghaniglobal.com/ghanichemicals/", ext:true,  desc:"Pakistan's leading manufacturer of medical oxygen, nitrogen, argon and industrial gas solutions." },
  { name:"Ghani Global Glass Limited",        ticker:"GGL",  sector:"Manufacturing",       color:"var(--gold)",  borderColor:"rgba(211,184,59,0.45)", bgActive:"rgba(211,184,59,0.08)", href:"https://www.ghaniglobalglass.com",         ext:true,  desc:"Sole manufacturer of Borosilicate glass tubes, vials and ampules for pharmaceutical industries." },
  { name:"Ghani ChemWorld Limited",           ticker:"GCWL", sector:"Specialty Chemicals", color:"var(--green)", borderColor:"rgba(164,199,61,0.45)", bgActive:"rgba(164,199,61,0.08)", href:"/about",                                ext:false, desc:"Calcium Carbide Project at Hattar Special Economic Zone — a bold step into high-value specialty chemicals." },
];

const associated = [
  { name:"Air Ghani (Pvt) Limited",             sector:"Aviation & Gases",  gold:true  },
  { name:"Ghani Logistics (Pvt) Limited",       sector:"Logistics",          gold:false },
  { name:"Ghani Energies Limited",              sector:"Energy",             gold:true  },
  { name:"Ghani Gases (Private) Limited",       sector:"Industrial Gases",   gold:false },
  { name:"G3 Properties (Pvt) Limited",         sector:"Real Estate",        gold:true  },
  { name:"Ghani Engineering (Pvt) Limited",     sector:"Engineering",        gold:false },
  { name:"Ghani Global Foods (Pvt) Limited",    sector:"Food & Agri",        gold:true  },
  { name:"Ghani Industrial Complex (Pvt) Ltd",  sector:"Infrastructure",     gold:false },
  { name:"Kaya Projects (Pvt) Limited",         sector:"Projects",           gold:true  },
  { name:"Killowatt Labs Technologies Limited", sector:"Technology",         gold:false },
];

export default function EcosystemGrid() {
  const [activeIdx, setActiveIdx] = useState<number|null>(null);
  const [hovAsc,    setHovAsc]    = useState<number|null>(null);

  return (
    <section style={{ background:"var(--bg)", padding:"96px clamp(32px,6vw,96px)", overflow:"hidden" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16 reveal">
          <div>
            <div className="eyebrow-dark mb-5">Our Network</div>
            <h2 className="font-display" style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:300, color:"var(--navy)", lineHeight:1.05, letterSpacing:"-0.01em" }}>
              The Companies That<br/>
              <em style={{ fontStyle:"italic", color:"var(--gold)" }}>Define Us</em>
            </h2>
          </div>
          <p className="reveal" style={{ fontSize:"15px", lineHeight:1.85, color:"var(--text2)", fontWeight:300 }}>
            From PSX-listed subsidiaries to a diverse network of associated entities — the Ghani Global Group spans Pakistan&apos;s most vital industrial sectors.
          </p>
        </div>

        {/* PSX Label */}
        <div className="reveal" style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
          <span style={{ width:"28px", height:"1px", background:"var(--gold)", display:"inline-block" }}/>
          <span style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:"var(--gold)" }}>PSX Listed Companies</span>
        </div>

        {/* PSX Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {psxCompanies.map((c, i) => {
            const isActive = activeIdx === i;
            return (
              <div
                key={c.ticker}
                className="reveal"
                style={{ animationDelay:`${i * 0.1}s` }}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                {/* Animated top bar */}
                <div style={{
                  height:"3px", width:"100%", background:c.color,
                  transform: isActive ? "scaleX(1)" : "scaleX(0.2)",
                  transformOrigin:"left",
                  transition:"transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}/>
                {/* Card */}
                <div style={{
                  padding:"28px 24px",
                  background: isActive ? "var(--navy)" : "var(--bg2)",
                  border:`1px solid ${isActive ? c.borderColor : "var(--line)"}`,
                  borderTop:"none",
                  position:"relative", overflow:"hidden",
                  transition:"all 0.35s cubic-bezier(0.22,1,0.36,1)",
                  minHeight:"200px", cursor:"pointer",
                }}>
                  {/* Ghost ticker */}
                  <div style={{
                    position:"absolute", bottom:"-8px", right:"10px",
                    fontSize:"54px", fontWeight:800,
                    color: isActive ? "rgba(255,255,255,0.04)" : "rgba(1,8,44,0.04)",
                    fontFamily:"Maven Pro,sans-serif", lineHeight:1,
                    pointerEvents:"none", userSelect:"none",
                    transition:"color 0.35s",
                  }}>{c.ticker}</div>

                  {/* Ticker badge */}
                  <span style={{
                    display:"inline-block", fontSize:"9px", letterSpacing:"0.25em",
                    textTransform:"uppercase", fontWeight:700, padding:"3px 10px",
                    marginBottom:"18px",
                    background: isActive ? c.bgActive : "rgba(1,8,44,0.05)",
                    color: isActive ? c.color : "var(--text2)",
                    border:`1px solid ${isActive ? c.borderColor : "var(--line)"}`,
                    transition:"all 0.3s",
                  }}>{c.ticker}</span>

                  {/* Name */}
                  <h3 className="font-display" style={{
                    fontSize:"15px", fontWeight:700,
                    color: isActive ? "white" : "var(--navy)",
                    lineHeight:1.35, marginBottom:"8px",
                    transition:"color 0.3s",
                  }}>{c.name}</h3>

                  {/* Sector */}
                  <p style={{
                    fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase",
                    color: isActive ? "rgba(255,255,255,0.4)" : "var(--text2)",
                    fontWeight:600, marginBottom:"14px", transition:"color 0.3s",
                  }}>{c.sector}</p>

                  {/* Description slides in */}
                  <div style={{
                    maxHeight: isActive ? "100px" : "0",
                    overflow:"hidden",
                    transition:"max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }}>
                    <p style={{
                      fontSize:"13px", lineHeight:1.7,
                      color:"rgba(255,255,255,0.6)",
                      fontWeight:300, marginBottom:"16px",
                    }}>{c.desc}</p>
                    {c.ext ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer"
                        style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:700, color:c.color }}>
                        Visit Website <ExternalLink size={10}/>
                      </a>
                    ) : (
                      <Link href={c.href}
                        style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:700, color:c.color }}>
                        Learn More <ArrowRight size={10}/>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ height:"1px", background:"linear-gradient(90deg,transparent,var(--line),transparent)", marginBottom:"32px" }}/>

        {/* Associated Label */}
        <div className="reveal" style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
          <span style={{ width:"28px", height:"1px", background:"var(--green)", display:"inline-block" }}/>
          <span style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:"var(--green2)" }}>
            Associated Companies · {associated.length} Entities
          </span>
        </div>

        {/* Associated grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {associated.map((c, i) => {
            const isHov = hovAsc === i;
            const accent = c.gold ? "var(--gold)" : "var(--green)";
            return (
              <div
                key={c.name}
                className="reveal"
                style={{ animationDelay:`${i * 0.05}s` }}
                onMouseEnter={() => setHovAsc(i)}
                onMouseLeave={() => setHovAsc(null)}
              >
                <div style={{
                  padding:"16px",
                  background: isHov ? (c.gold ? "rgba(211,184,59,0.05)" : "rgba(164,199,61,0.05)") : "var(--bg2)",
                  border:"1px solid var(--line)",
                  borderLeft:`3px solid ${isHov ? accent : "var(--line)"}`,
                  transition:"all 0.3s ease",
                  transform: isHov ? "translateY(-3px)" : "translateY(0)",
                  boxShadow: isHov ? "0 6px 20px rgba(1,8,44,0.08)" : "none",
                }}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:"8px" }}>
                    <div style={{
                      width:"6px", height:"6px", borderRadius:"50%",
                      background: accent, flexShrink:0, marginTop:"5px",
                      opacity: isHov ? 1 : 0.4, transition:"opacity 0.3s",
                    }}/>
                    <div>
                      <p style={{
                        fontSize:"12px", fontWeight:600,
                        color: isHov ? "var(--navy)" : "var(--text2)",
                        lineHeight:1.35, marginBottom:"3px", transition:"color 0.3s",
                      }}>{c.name}</p>
                      <p style={{ fontSize:"9px", letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--text2)", fontWeight:600, opacity:0.6 }}>{c.sector}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

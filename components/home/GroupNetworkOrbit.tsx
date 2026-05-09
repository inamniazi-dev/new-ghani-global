"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const psxCompanies = [
  { name:"Ghani Global Holdings Limited",     sector:"Principal Holding",   ticker:"GGHL" },
  { name:"Ghani Chemical Industries Limited", sector:"Industrial Gases",    ticker:"GCIL" },
  { name:"Ghani Global Glass Limited",        sector:"Manufacturing",       ticker:"GGL"  },
  { name:"Ghani ChemWorld Limited",           sector:"Specialty Chemicals", ticker:"GCWL" },
];

const associated = [
  { name:"Air Ghani (Pvt) Limited",             sector:"Aviation & Gases"  },
  { name:"Ghani Logistics (Pvt) Limited",       sector:"Logistics"         },
  { name:"Ghani Energies Limited",              sector:"Energy"            },
  { name:"Ghani Gases (Private) Limited",       sector:"Industrial Gases"  },
  { name:"G3 Properties (Pvt) Limited",         sector:"Real Estate"       },
  { name:"Ghani Engineering (Pvt) Limited",     sector:"Engineering"       },
  { name:"Ghani Global Foods (Pvt) Limited",    sector:"Food & Agri"       },
  { name:"Ghani Industrial Complex (Pvt) Ltd",  sector:"Infrastructure"    },
  { name:"Kaya Projects (Pvt) Limited",         sector:"Projects"          },
  { name:"Killowatt Labs Technologies Limited", sector:"Technology"        },
];

export default function GroupNetworkOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredKey, setHoveredKey] = useState<string|null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold:0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const innerR = 30;
  const outerR = 48;
  const nPsx   = psxCompanies.length;
  const nAssoc = associated.length;

  return (
    <section ref={containerRef} className="network-orbit-section">
      <div className="max-w-7xl mx-auto px-8 xl:px-16">

        {/* Heading */}
        <div className="flex items-end justify-between gap-6 mb-14 reveal">
          <div>
            <div className="eyebrow-dark mb-4">Group Ecosystem</div>
            <h2 className="font-display" style={{ fontSize:"clamp(28px,3.8vw,48px)", fontWeight:300, color:"white", lineHeight:1.05, letterSpacing:"-0.01em" }}>
              Our <em style={{ fontStyle:"italic", color:"var(--gold)" }}>Group Ecosystem</em>
            </h2>
            <p className="max-w-xl mt-4" style={{ fontSize:"15px", lineHeight:1.75, color:"rgba(255,255,255,0.55)", fontWeight:300 }}>
              Four PSX-listed entities at the core, surrounded by ten strategic associated companies — spanning aviation, logistics, energy, real estate, food, infrastructure, and technology.
            </p>
          </div>
          <Link href="/portfolio" className="btn-outline-gold shrink-0 hidden md:inline-flex">
            View Portfolio <ArrowRight size={12}/>
          </Link>
        </div>

        {/* Orbit stage */}
        <div className="orbit-stage"
          onMouseEnter={e => {
            e.currentTarget.querySelectorAll<HTMLElement>(".orbit-rotator,.orbit-rotator-inner,.orbit-counter,.orbit-counter-inner")
              .forEach(n => n.style.animationPlayState = "paused");
          }}
          onMouseLeave={e => {
            e.currentTarget.querySelectorAll<HTMLElement>(".orbit-rotator,.orbit-rotator-inner,.orbit-counter,.orbit-counter-inner")
              .forEach(n => n.style.animationPlayState = "running");
          }}
        >
          {/* SVG rings + branch lines */}
          <svg className="orbit-rings" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <circle cx="50" cy="50" r={outerR} fill="none" stroke="rgba(164,199,61,0.18)" strokeWidth="0.15" strokeDasharray="0.5 0.5"/>
            <circle cx="50" cy="50" r={innerR} fill="none" stroke="rgba(211,184,59,0.3)"  strokeWidth="0.18" strokeDasharray="0.4 0.4"/>
            <circle cx="50" cy="50" r="14"     fill="none" stroke="rgba(164,199,61,0.1)"  strokeWidth="0.1"/>
            {psxCompanies.map((c,i) => {
              const angle = (i / nPsx) * 2 * Math.PI - Math.PI / 2;
              const x = 50 + innerR * Math.cos(angle);
              const y = 50 + innerR * Math.sin(angle);
              return (
                <line key={c.ticker} x1="50" y1="50" x2={x} y2={y}
                  stroke={hoveredKey === c.ticker ? "var(--gold)" : "rgba(211,184,59,0.25)"}
                  strokeWidth={hoveredKey === c.ticker ? "0.3" : "0.18"}
                  strokeDasharray="0.4 0.3"
                  style={{ transition:"stroke 0.3s, stroke-width 0.3s" }}
                />
              );
            })}
            {associated.map((c,i) => {
              const angle = (i / nAssoc) * 2 * Math.PI - Math.PI / 2;
              const x = 50 + outerR * Math.cos(angle);
              const y = 50 + outerR * Math.sin(angle);
              return (
                <line key={c.name} x1="50" y1="50" x2={x} y2={y}
                  stroke={hoveredKey === c.name ? "var(--green)" : "rgba(164,199,61,0.15)"}
                  strokeWidth={hoveredKey === c.name ? "0.25" : "0.12"}
                  strokeDasharray="0.5 0.4"
                  style={{ transition:"stroke 0.3s, stroke-width 0.3s" }}
                />
              );
            })}
          </svg>

          {/* Inner ring — PSX */}
          <div className={`orbit-rotator-inner ${inView ? "orbit-running-inner" : ""}`}>
            {psxCompanies.map((c,i) => {
              const angle = (i / nPsx) * 2 * Math.PI - Math.PI / 2;
              const x = 50 + innerR * Math.cos(angle);
              const y = 50 + innerR * Math.sin(angle);
              return (
                <div key={c.ticker} className="orbit-node-pos" style={{ left:`${x}%`, top:`${y}%` }}>
                  <div className={`orbit-counter-inner ${inView ? "orbit-counter-running-inner" : ""}`}>
                    <div
                      className={`orbit-node orbit-node-psx ${hoveredKey === c.ticker ? "is-hovered" : ""}`}
                      onMouseEnter={() => setHoveredKey(c.ticker)}
                      onMouseLeave={() => setHoveredKey(null)}
                    >
                      <span className="orbit-node-dot orbit-node-dot-gold"/>
                      <span className="orbit-node-sector" style={{ color:"var(--gold)" }}>{c.sector}</span>
                      <span className="orbit-node-name">{c.name}</span>
                      <span className="orbit-node-ticker">{c.ticker}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Outer ring — Associated */}
          <div className={`orbit-rotator ${inView ? "orbit-running" : ""}`}>
            {associated.map((c,i) => {
              const angle = (i / nAssoc) * 2 * Math.PI - Math.PI / 2;
              const x = 50 + outerR * Math.cos(angle);
              const y = 50 + outerR * Math.sin(angle);
              return (
                <div key={c.name} className="orbit-node-pos" style={{ left:`${x}%`, top:`${y}%` }}>
                  <div className={`orbit-counter ${inView ? "orbit-counter-running" : ""}`}>
                    <div
                      className={`orbit-node ${hoveredKey === c.name ? "is-hovered" : ""}`}
                      onMouseEnter={() => setHoveredKey(c.name)}
                      onMouseLeave={() => setHoveredKey(null)}
                    >
                      <span className="orbit-node-dot"/>
                      <span className="orbit-node-sector">{c.sector}</span>
                      <span className="orbit-node-name">{c.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center badge */}
          <div className="orbit-center">
            <div className="orbit-center-pulse"/>
            <div className="orbit-center-inner">
              <img src="/logo-new.png" alt="Ghani Global Group" className="orbit-center-logo"/>
            </div>
          </div>
        </div>



        {/* Mobile fallback */}
        <div className="orbit-mobile-list mt-10">
          <p style={{ fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"var(--gold)", marginBottom:"12px" }}>PSX Listed</p>
          {psxCompanies.map(c => (
            <div key={c.ticker} className="orbit-mobile-item" style={{ borderLeft:"3px solid var(--gold)" }}>
              <span className="orbit-mobile-dot" style={{ background:"var(--gold)" }}/>
              <div>
                <p className="orbit-mobile-name">{c.name}</p>
                <p className="orbit-mobile-sector">{c.ticker} · {c.sector}</p>
              </div>
            </div>
          ))}
          <p style={{ fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"var(--green)", margin:"20px 0 12px" }}>Associated Companies</p>
          {associated.map(c => (
            <div key={c.name} className="orbit-mobile-item">
              <span className="orbit-mobile-dot"/>
              <div>
                <p className="orbit-mobile-name">{c.name}</p>
                <p className="orbit-mobile-sector">{c.sector}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/portfolio" className="btn-outline-gold">View Portfolio <ArrowRight size={12}/></Link>
        </div>
      </div>
    </section>
  );
}

"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useEffect } from "react";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left");
    const io = new IntersectionObserver(
      e => e.forEach(en => { if (en.isIntersecting) en.target.classList.add("in-view"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const companies = [
  {
    ticker: "GGHL",
    name: "Ghani Global Holdings Limited",
    desc: "The principal holding company of the group, managing strategic investments in subsidiary and associated companies across Pakistan's industrial landscape.",
    tag: "PSX Listed",
    href: "https://www.ghaniglobal.com/Investor%20Grievances.html",
    ext: false,
    accent: "var(--gold)",
  },
  {
    ticker: "GCIL",
    name: "Ghani Chemical Industries Limited",
    desc: "Pakistan's leading manufacturer of industrial and medical gases, serving hospitals, industries, and research institutes nationwide.",
    tag: "PSX Listed",
    href: "https://ghaniglobal.com/ghanichemicals/annual-reports-gci/",
    ext: true,
    accent: "var(--green)",
  },
  {
    ticker: "GGGL",
    name: "Ghani Global Glass Limited",
    desc: "Sole manufacturer of borosilicate glass tubes (USP Type I) in Pakistan and market leader in vials and ampoules manufacturing.",
    tag: "PSX Listed",
    href: "https://www.ghaniglobal.com/ghaniglobalglass/investor-grievances/",
    ext: true,
    accent: "var(--gold)",
  },
  {
    ticker: "GCWL",
    name: "Ghani ChemWorld Limited",
    desc: "Specialty chemicals company managing the Calcium Carbide Project at Hattar Special Economic Zone — incorporated in 2024.",
    tag: "PSX Listed",
    href: "https://ghanichemworld.com/annual-reports/",
    ext: false,
    accent: "var(--green)",
  },
];

export default function InvestorRelationsPage() {
  useReveal();
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* HERO BANNER */}
      <section style={{ position:"relative", overflow:"hidden", padding:"64px clamp(32px,6vw,96px) 48px" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          <img src="/hero-banner-3-new.jpeg" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 40%", display:"block" }}/>
          <div style={{ position:"absolute", inset:0, background:"rgba(1,8,44,0.85)" }}/>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          
          <h1 className="font-display" style={{ fontSize:"clamp(40px,6vw,72px)", fontWeight:300, color:"white", lineHeight:1.0, letterSpacing:"-0.02em", marginBottom:"16px" }}>
            Investor<br/>
            <em style={{ fontStyle:"italic", color:"var(--gold)" }}>Relations</em>
          </h1>
          <div style={{ width:"56px", height:"3px", background:"var(--green)", marginBottom:"20px" }}/>
          <p style={{ fontSize:"16px", lineHeight:1.8, color:"rgba(255,255,255,0.6)", fontWeight:300, maxWidth:"560px" }}>
            Access investor information, annual reports, PSX filings, and shareholder communications for all Ghani Global Group listed companies.
          </p>
        </div>
      </section>

      {/* COMPANIES CARDS */}
      <section style={{ padding:"80px clamp(32px,6vw,96px)", background:"var(--bg)" }}>
        <div className="max-w-7xl mx-auto">

          <div style={{ marginBottom:"56px" }} className="reveal">
            <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:"var(--gold)", marginBottom:"12px", display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ width:"24px", height:"1px", background:"var(--gold)", display:"inline-block" }}/>
              Our Listed Entities
            </div>
            <h2 className="font-display" style={{ fontSize:"clamp(28px,3.5vw,44px)", fontWeight:300, color:"var(--navy)", lineHeight:1.1 }}>
              Select a Company to<br/>
              <em style={{ fontStyle:"italic", color:"var(--green)" }}>View Investor Information</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.map((c, i) => {
              const isExternal = c.ext;
              const Tag = isExternal ? "a" : Link;
              const props: any = isExternal
                ? { href: c.href, target: "_blank", rel: "noopener noreferrer" }
                : { href: c.href };

              return (
                <Tag key={i} {...props}
                  className="reveal"
                  style={{
                    display:"block",
                    padding:"40px",
                    background:"white",
                    border:"1px solid var(--line)",
                    borderTop:`3px solid ${c.accent}`,
                    textDecoration:"none",
                    transition:"all 0.3s ease",
                    animationDelay:`${i*0.1}s`,
                    position:"relative",
                    overflow:"hidden",
                  }}
                  onMouseEnter={e=>{
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 12px 40px rgba(1,8,44,0.1)";
                    el.style.borderColor = c.accent;
                  }}
                  onMouseLeave={e=>{
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                    el.style.borderColor = "var(--line)";
                    el.style.borderTopColor = c.accent;
                  }}
                >
                  {/* Ghost ticker */}
                  <div style={{ position:"absolute", bottom:"-10px", right:"20px", fontSize:"80px", fontWeight:900, color:"rgba(1,8,44,0.03)", lineHeight:1, fontFamily:"Maven Pro,sans-serif", userSelect:"none" }}>{c.ticker}</div>

                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"20px" }}>
                    <span style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, padding:"3px 10px", background: c.accent === "var(--gold)" ? "rgba(211,184,59,0.1)" : "rgba(164,199,61,0.1)", color: c.accent, border:`1px solid ${c.accent === "var(--gold)" ? "rgba(211,184,59,0.3)" : "rgba(164,199,61,0.3)"}` }}>
                      {c.tag}
                    </span>
                    {isExternal
                      ? <ExternalLink size={16} style={{ color:"var(--text2)", opacity:0.4 }}/>
                      : <ArrowRight size={16} style={{ color:"var(--text2)", opacity:0.4 }}/>
                    }
                  </div>

                  <p style={{ fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color: c.accent, marginBottom:"8px" }}>{c.ticker}</p>
                  <h3 className="font-display" style={{ fontSize:"clamp(18px,1.8vw,24px)", fontWeight:600, color:"var(--navy)", marginBottom:"14px", lineHeight:1.2 }}>{c.name}</h3>
                  <p style={{ fontSize:"14px", lineHeight:1.75, color:"var(--text2)", fontWeight:300, position:"relative", zIndex:2 }}>{c.desc}</p>

                  <div style={{ marginTop:"28px", display:"flex", alignItems:"center", gap:"6px", fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:700, color: c.accent }}>
                    {isExternal ? "View Investor Relations" : "Coming Soon"}
                    {isExternal ? <ExternalLink size={11}/> : <ArrowRight size={11}/>}
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

type Industry = {
  id: string; tab: string; title: string; desc: string;
  img: string; link: string; ext: boolean;
};

const statsMap: Record<string, { num: string; lbl: string }[]> = {
  holdings: [
    { num:"2007",      lbl:"Year Incorporated" },
    { num:"GGHL",      lbl:"PSX Symbol" },
    { num:"Holdings",  lbl:"Core Business" },
  ],
  glass: [
    { num:"2007",      lbl:"Year Incorporated" },
    { num:"GGGL",      lbl:"PSX Symbol" },
    { num:"Glass Tubes", lbl:"Core Business" },
  ],
  chemical: [
    { num:"2007",      lbl:"Year Incorporated" },
    { num:"GCIL",      lbl:"PSX Symbol" },
    { num:"Industrial & Medical Gases", lbl:"Core Business" },
  ],
  chemworld: [
    { num:"2024",      lbl:"Year Incorporated" },
    { num:"GCWL",      lbl:"PSX Symbol" },
    { num:"Chemicals", lbl:"Core Business" },
  ],
};

export default function WhatWeDoStory({ industries }: { industries: Industry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress,  setProgress]  = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const fn = () => setIsDesktop(window.innerWidth >= 1024);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScrollable = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(-rect.top, totalScrollable));
      const pct = totalScrollable > 0 ? scrolled / totalScrollable : 0;
      setProgress(pct);
      const n = industries.length;
      const idx = Math.min(n - 1, Math.floor(pct * n));
      setActiveIdx(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [industries.length, isDesktop]);

  // ─── Mobile / Tablet fallback ───
  if (!isDesktop) {
    return (
      <>
        {/* Header */}
        <section style={{ background:"var(--bg2)", padding:"clamp(40px,6vw,72px) clamp(20px,5vw,64px) 24px", textAlign:"center" }}>
          <div className="eyebrow-dark mb-4">What We Do</div>
          <h2 className="font-display" style={{ fontSize:"clamp(26px,5vw,42px)", fontWeight:500, color:"var(--navy)", lineHeight:1.05, letterSpacing:"-0.01em" }}>
          Diverse Industries,<br/><em style={{ fontStyle:"italic", color:"var(--blue)" }}>Singular Excellence</em>
          </h2>
          <p style={{ fontSize:"clamp(13px,1.5vw,15px)", lineHeight:1.75, color:"var(--text2)", fontWeight:300, marginTop:"16px" }}>
          Four companies. One vision. Explore the story of the Ghani Global Group.
          </p>
        </section>

        {/* Industry cards */}
        {industries.map((ind, i) => (
          <section key={ind.id} style={{
            background: i % 2 === 0 ? "var(--bg2)" : "var(--bg)",
            padding:"clamp(32px,5vw,48px) clamp(20px,5vw,64px)",
            borderBottom:"1px solid var(--line)"
          }}>
            {/* Image */}
            <img
              src={ind.img}
              alt={ind.title}
              style={{ width:"100%", aspectRatio:"16/9", objectFit:"cover", marginBottom:"24px", borderRadius:"8px" }}
            />

            {/* Company tag */}
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px" }}>
              <span style={{ width:"24px", height:"1px", background:"var(--green)", flexShrink:0 }}/>
              <span style={{ fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"var(--green2)" }}>{ind.tab}</span>
            </div>

            {/* Title */}
            <h3 className="font-display" style={{ fontSize:"clamp(20px,4vw,28px)", fontWeight:500, color:"var(--navy)", lineHeight:1.15, marginBottom:"12px" }}>
              {ind.title}
            </h3>

            {/* Description */}
            <p style={{ fontSize:"clamp(13px,1.5vw,15px)", lineHeight:1.75, color:"var(--text2)", fontWeight:300, marginBottom:"20px" }}>
              {ind.desc}
            </p>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"8px", paddingTop:"16px", borderTop:"1px solid var(--line)", marginBottom:"20px" }}>
              {statsMap[ind.id]?.map(s => (
              <div key={s.lbl} style={{ textAlign:"center" }}>
              <p className="font-display" style={{ fontSize:"clamp(14px,3vw,18px)", fontWeight:500, color:"var(--navy)", lineHeight:1, marginBottom:"4px" }}>{s.num}</p>
              <p style={{ fontSize:"clamp(8px,1.2vw,9px)", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:600, color:"var(--text2)" }}>{s.lbl}</p>
              </div>
              ))}
            </div>

            {/* CTA */}
            <a href={ind.link} target={ind.ext ? "_blank" : "_self"} rel="noopener noreferrer" className="btn-gold">
              <span>Visit Website</span> <ExternalLink size={12}/>
            </a>
          </section>
        ))}
      </>
    );
  }

  // ─── Desktop sticky scroll ───
  const containerHeight = `${industries.length * 100}vh`;

  return (
    <section
      ref={containerRef}
      className="story-sticky-wrap"
      style={{ position:"relative", height: containerHeight, background:"var(--bg2)" }}
    >
      <div style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"32px clamp(32px,5vw,72px) 20px", background:"var(--bg2)", borderBottom:"1px solid var(--line)" }}>
          <div className="max-w-7xl mx-auto flex items-end justify-between gap-8">
            <div>
              <div className="eyebrow-dark mb-2">What We Do</div>
              <h2 className="font-display" style={{ fontSize:"clamp(24px,2.8vw,36px)", fontWeight:500, color:"var(--navy)", lineHeight:1.1, letterSpacing:"-0.01em" }}>
                Diverse Industries,{" "}
                <em style={{ fontStyle:"italic", color:"var(--blue)" }}>Singular Excellence</em>
              </h2>
            </div>
          </div>
        </div>

        <div className="story-stage-grid" style={{ flex:1, overflow:"hidden" }}>
          <aside className="story-aside">
            {industries.map((ind, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={ind.id}
                  onClick={() => {
                    const el = containerRef.current;
                    if (!el) return;
                    const totalScrollable = el.offsetHeight - window.innerHeight;
                    const target = el.offsetTop + (i / industries.length) * totalScrollable + 4;
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }}
                  className="story-nav-item"
                  data-active={isActive}
                  style={{
                    background: isActive ? "rgba(164,199,61,0.12)" : "transparent",
                    borderLeft: isActive ? "3px solid var(--green)" : "3px solid transparent",
                    paddingLeft: "13px"
                  }}
                >
                  <span className="story-nav-num story-nav-dot-wrap">
                    <span className="story-nav-green-dot"/>
                  </span>
                  <span className="story-nav-label">{ind.tab}</span>
                  <span className="story-nav-bar"/>
                </button>
              );
            })}
            <div className="mt-8" style={{ width:"100%", maxWidth:"200px" }}>
              <div style={{ height:"2px", background:"var(--line2)", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, height:"100%", width:`${progress*100}%`, background:"var(--green)", transition:"width 0.2s linear" }}/>
              </div>
            </div>
          </aside>

          <div style={{ position:"relative", overflow:"hidden" }}>
            {industries.map((ind, i) => {
              const isActive = i === activeIdx;
              const stats = statsMap[ind.id] || [];
              return (
                <div
                  key={ind.id}
                  className="story-chapter-slide"
                  data-active={isActive}
                  aria-hidden={!isActive}
                >
                  <div className="story-slide-grid grid grid-cols-12 items-center">
                    <div className="col-span-6" style={{ position:"relative" }}>
                      <div className="story-img-wrap" style={{ position:"relative" }}>
                        <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:1 }}>
                          <div style={{ position:"absolute", top:"-8%", right:"-4%", width:"50%", height:"55%", background:"var(--navy)", clipPath:"polygon(20% 0%, 100% 0%, 100% 85%, 0% 100%)", opacity:0.08 }}/>
                          <div style={{ position:"absolute", bottom:"-4%", left:"-4%", width:"40%", height:"45%", background:"var(--gold)", clipPath:"polygon(0% 15%, 100% 0%, 80% 100%, 0% 100%)", opacity:0.07 }}/>
                          <div style={{ position:"absolute", top:"10px", right:"10px", width:"28px", height:"28px", borderTop:"2px solid var(--gold)", borderRight:"2px solid var(--gold)", opacity:0.5 }}/>
                          <div style={{ position:"absolute", bottom:"10px", left:"10px", width:"28px", height:"28px", borderBottom:"2px solid var(--green)", borderLeft:"2px solid var(--green)", opacity:0.5 }}/>
                        </div>
                        <img src={ind.img} alt={ind.title} className="story-img" style={{ position:"relative", zIndex:2 }}/>
                        <div className="story-img-accent" style={{ zIndex:3 }}/>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <div className="flex items-center gap-4 mb-5">
                        <span className="story-green-dot-lg"/>
                        <span className="story-line"/>
                        <span className="story-company-tag">{ind.tab}</span>
                      </div>
                      <h3 className="font-display story-heading-hover" style={{ fontSize:"clamp(20px,2vw,32px)", fontWeight:500, color:"var(--navy)", lineHeight:1.1, letterSpacing:"-0.01em", marginBottom:"18px", cursor:"default" }}>
                        {ind.title}
                      </h3>
                      <p style={{ fontSize:"clamp(14px,1.05vw,17px)", lineHeight:1.8, color:"var(--text2)", fontWeight:300, marginBottom:"24px", maxWidth:"620px" }}>
                        {ind.desc}
                      </p>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", paddingTop:"16px", borderTop:"1px solid var(--line)", marginBottom:"24px" }}>
                        {stats.map(s => (
                          <div key={s.lbl} style={{ minWidth:0, textAlign:"center" }}>
                            <p className="story-stat-num" style={{ textAlign:"center" }}>{s.num}</p>
                            <p className="story-stat-lbl" style={{ textAlign:"center", whiteSpace:"nowrap" }}>{s.lbl}</p>
                          </div>
                        ))}
                      </div>
                      <a href={ind.link} target={ind.ext ? "_blank" : "_self"} rel="noopener noreferrer" className="btn-gold">
                        <span>Visit Website</span> <ExternalLink size={12}/>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

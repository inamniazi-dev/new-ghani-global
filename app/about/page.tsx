"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";


const timeline = [
  { year:"2007", label:"Incorporated",    tag:"Foundation",    desc:"Ghani Gases (Pvt.) Limited incorporated on November 19, 2007 under the Companies Ordinance, 1984 — founded by three visionary brothers." },
  { year:"2008", label:"Public Company",  tag:"Corporate",     desc:"Converted into a public limited company on February 12, 2008, marking the beginning of a new chapter in growth." },
  { year:"2010", label:"PSX Listing",     tag:"Capital Markets",desc:"Listed on the Pakistan Stock Exchange on January 5, 2010, opening the group to public investment." },
  { year:"2013", label:"Expansion",       tag:"Growth",        desc:"Significant capacity expansion in industrial and medical gas operations across Pakistan." },
  { year:"2016", label:"Diversification", tag:"Growth",        desc:"Strategic diversification into glass manufacturing through Ghani Global Glass Limited." },
  { year:"2019", label:"Restructured",    tag:"Corporate",     desc:"Name changed to Ghani Global Holdings Limited on August 28, 2019. Manufacturing undertaking transferred to Ghani Chemical Industries Limited." },
  { year:"2021", label:"Glass Expansion", tag:"Manufacturing", desc:"Ghani Global Glass Limited scales pharmaceutical-grade glass production, expanding export capabilities." },
  { year:"2024", label:"ChemWorld",       tag:"New Venture",   desc:"Ghani ChemWorld Limited incorporated on July 31, 2024 to manage the Calcium Carbide Project at Hattar Special Economic Zone." },
  { year:"2025", label:"Demerger",        tag:"Milestone",     desc:"Lahore High Court sanctioned Demerger/Merger Scheme on February 20, 2025, completing asset transfer to Ghani ChemWorld Limited." },
];

const principles = [
  { word:"Faith",       urdu:"ایمان",  desc:"Our foundation is built on unwavering faith — in our people, our nation, and our purpose." },
  { word:"Experience",  urdu:"تجربہ", desc:"Decades of industry expertise guide every strategic decision we make across our portfolio." },
  { word:"Innovation",  urdu:"جدت",   desc:"We continuously evolve, embracing new technologies and business models to stay ahead." },
  { word:"Growth",      urdu:"ترقی",  desc:"Sustainable, responsible growth for all stakeholders — from shareholders to communities." },
];

const founders = [
  { name:"Masroor Ahmad Khan",  whiteImg:"/masroor-ahmad-khan-white.jpeg", blueImg:"/masroor-ahmad-khan-blue.jpeg" },
  { name:"Atique Ahmad Khan",   whiteImg:"/atique-ahmad-khan-white.jpeg",  blueImg:"/atique-ahmad-khan-blue.jpeg"  },
  { name:"Hafiz Farooq Ahmad",  whiteImg:"/hafiz-farooq-ahmad-white.jpeg", blueImg:"/hafiz-farooq-ahmad-blue.jpeg" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left");
    const io = new IntersectionObserver(
      e => e.forEach(en => { if (en.isIntersecting) en.target.classList.add("in-view"); }),
      { threshold:0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function AboutPage() {
  useReveal();
  const [activeIdx, setActiveIdx] = useState<number|null>(null);

  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* ── HERO HEADER ── */}
      <section style={{ position:"relative", overflow:"hidden", padding:"32px clamp(32px,6vw,96px) 48px", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        {/* Banner image with dark overlay */}
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          <img src="/hero-banner-2-new.jpeg" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 40%", display:"block" }}/>
          <div style={{ position:"absolute", inset:0, background:"rgba(1,8,44,0.82)" }}/>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              
              <h1 className="font-display" style={{ fontSize:"clamp(40px,6vw,72px)", fontWeight:300, color:"white", lineHeight:1.0, letterSpacing:"-0.02em", marginBottom:"24px" }}>
                Ghani Global Group<br/>
                <em style={{ fontStyle:"italic", color:"var(--gold)" }}>Shariah Compliant</em>
              </h1>
              <div style={{ width:"56px", height:"3px", background:"var(--green)" }}/>
            </div>
            <div>
              <p style={{ fontSize:"16px", lineHeight:1.85, color:"rgba(255,255,255,0.75)", fontWeight:300 }}>
                A diversified conglomerate engaged in the manufacturing of industrial, medical, and specialty gases, along with pharmaceutical-grade glass tube production and chemical manufacturing.
              </p>
            </div>
          </div>
        </div>

        {/* Stats row — full width below content */}
        <div style={{ position:"relative", zIndex:10, borderTop:"1px solid rgba(164,199,61,0.2)", marginTop:"24px" }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 gap-0" style={{ paddingTop:"16px", paddingBottom:"8px" }}>
              {[
                { num:"4",  suffix:"",  label:"PSX Listed Companies" },
                { num:"10", suffix:"+", label:"Associated Companies"  },
                { num:"17", suffix:"+", label:"Years of Excellence"   },
              ].map((s,i) => (
                <div key={s.label} style={{ textAlign:"center", padding:"8px", borderRight:i<2?"1px solid rgba(164,199,61,0.15)":"none" }}>
                  <p className="font-display" style={{ fontSize:"clamp(24px,3.5vw,42px)", fontWeight:300, color:"var(--gold)", lineHeight:1, marginBottom:"4px" }}>{s.num}{s.suffix}</p>
                  <p style={{ fontSize:"10px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)", fontWeight:600 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section style={{ padding:"96px clamp(32px,6vw,96px)", background:"var(--bg)" }}>
        <div className="max-w-7xl mx-auto">
          {/* Vision — full width statement */}
          <div className="reveal" style={{ padding:"48px", background:"var(--navy)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg,var(--green),var(--gold))" }}/>
            <div style={{ position:"absolute", top:"20px", right:"32px", fontSize:"120px", fontWeight:800, color:"rgba(255,255,255,0.03)", lineHeight:1, fontFamily:"Maven Pro,sans-serif", userSelect:"none" }}>V</div>
            <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"32px", alignItems:"center", position:"relative", zIndex:2 }}>
              <div style={{ writingMode:"vertical-rl", textOrientation:"mixed", transform:"rotate(180deg)", fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:"var(--green)", whiteSpace:"nowrap" }}>
                Our Vision
              </div>
              <div>
                <p className="font-display" style={{ fontSize:"clamp(20px,2.5vw,32px)", fontWeight:300, color:"white", lineHeight:1.4, fontStyle:"italic" }}>
                  &ldquo;Growth through the best value creation for the benefit of all stakeholders.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE PRINCIPLES ── */}
      <section style={{ padding:"80px clamp(32px,6vw,96px)", background:"var(--bg2)", borderTop:"1px solid var(--line)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal" style={{ marginBottom:"48px" }}>
            <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:"var(--gold)", marginBottom:"12px", display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ width:"24px", height:"1px", background:"var(--gold)", display:"inline-block" }}/>
              What Drives Us
            </div>
            <h2 className="font-display" style={{ fontSize:"clamp(28px,3.5vw,48px)", fontWeight:300, color:"var(--navy)", lineHeight:1.05 }}>
              Our Core <em style={{ fontStyle:"italic", color:"var(--gold)" }}>Principles</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {principles.map((p, i) => {
              const isHov = activeIdx === i;
              const isGold = i % 2 === 0;
              return (
                <div key={p.word}
                  className="reveal"
                  style={{ animationDelay:`${i*0.1}s` }}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}>
                  <div style={{
                    padding:"36px 28px",
                    background: isHov ? "var(--navy)" : "var(--bg)",
                    border:`1px solid ${isHov ? (isGold ? "rgba(211,184,59,0.5)" : "rgba(164,199,61,0.5)") : "var(--line)"}`,
                    borderTop:`3px solid ${isGold ? "var(--gold)" : "var(--green)"}`,
                    transition:"all 0.35s ease",
                    position:"relative", overflow:"hidden", height:"100%",
                  }}>
                    {/* Ghost letter */}
                    <div style={{ position:"absolute", bottom:"-10px", right:"12px", fontSize:"80px", fontWeight:800, color: isHov ? "rgba(255,255,255,0.04)" : "rgba(1,8,44,0.04)", lineHeight:1, fontFamily:"Maven Pro,sans-serif", userSelect:"none" }}>
                      {p.word[0]}
                    </div>
                    {/* Urdu word */}
                    <p style={{ fontSize:"22px", color: isGold ? "var(--gold)" : "var(--green)", marginBottom:"8px", fontFamily:"serif", direction:"rtl" }}>{p.urdu}</p>
                    {/* English word */}
                    <h3 className="font-display" style={{ fontSize:"clamp(20px,2vw,28px)", fontWeight:600, color: isHov ? "white" : "var(--navy)", marginBottom:"16px", lineHeight:1, transition:"color 0.3s" }}>
                      {p.word}
                    </h3>
                    <div style={{ width:"32px", height:"2px", background: isGold ? "var(--gold)" : "var(--green)", marginBottom:"16px" }}/>
                    <p style={{ fontSize:"13px", lineHeight:1.75, color: isHov ? "rgba(255,255,255,0.6)" : "var(--text2)", fontWeight:300, position:"relative", zIndex:2, transition:"color 0.3s" }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MESSAGE FROM THE FOUNDERS ── */}
      <section style={{ background:"#F0F7EE", padding:"64px clamp(32px,6vw,96px)", overflow:"hidden", minHeight:"100vh", display:"flex", alignItems:"center" }}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-5 gap-16 items-center">

            {/* LEFT — 40%: 3 founder images with geometric decorations */}
            <div className="lg:col-span-2 reveal" style={{ position:"relative" }}>
              <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}>
                <div style={{ position:"absolute", top:"-24px", left:"-24px", width:"160px", height:"200px", background:"var(--navy)", clipPath:"polygon(0% 0%, 85% 0%, 100% 80%, 0% 100%)", opacity:0.06 }}/>
                <div style={{ position:"absolute", bottom:"-20px", right:"-20px", width:"140px", height:"180px", background:"var(--gold)", clipPath:"polygon(15% 0%, 100% 20%, 100% 100%, 0% 100%)", opacity:0.08 }}/>
                <div style={{ position:"absolute", top:"35%", left:"-16px", width:"8px", height:"120px", background:"var(--green)", opacity:0.5, borderRadius:"4px" }}/>
                <div style={{ position:"absolute", top:"20%", right:"-16px", width:"8px", height:"100px", background:"var(--gold)", opacity:0.4, borderRadius:"4px" }}/>
                <div style={{ position:"absolute", top:"8px", right:"8px", width:"28px", height:"28px", borderTop:"2px solid var(--gold)", borderRight:"2px solid var(--gold)", opacity:0.5 }}/>
                <div style={{ position:"absolute", bottom:"8px", left:"8px", width:"28px", height:"28px", borderBottom:"2px solid var(--green)", borderLeft:"2px solid var(--green)", opacity:0.5 }}/>
              </div>
              <div className="grid grid-cols-3 gap-3" style={{ position:"relative", zIndex:1 }}>
                {[
                  { name:"Masroor Ahmad Khan", img:"/masroor-ahmad-khan-white.png" },
                  { name:"Atique Ahmad Khan",  img:"/atique-ahmad-khan-white.png"  },
                  { name:"Hafiz Farooq Ahmad", img:"/hafiz-farooq-ahmad-white.png" },
                ].map((f, i) => (
                  <div key={i} style={{ animationDelay:`${i*0.12}s` }}>
                    <div style={{ position:"relative", overflow:"hidden", background:"#F0F7EE", aspectRatio:"763/975" }}>
                      <img src={f.img} alt={f.name} style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"center bottom", display:"block", transition:"transform 0.6s ease", borderRadius:"0" }}
                        onMouseEnter={e => (e.currentTarget.style.transform="scale(1.04)")}
                        onMouseLeave={e => (e.currentTarget.style.transform="scale(1)")}
                      />
                      <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg, var(--green), var(--gold))", zIndex:3, borderRadius:"0" }}/>
                    </div>
                    <div style={{ padding:"12px 10px", background:"#F0F7EE", borderLeft:"1px solid var(--line)", borderRight:"1px solid var(--line)", borderBottom:"1px solid var(--line)", borderRadius:"0 0 8px 8px" }}>
                      <p style={{ fontSize:"11px", fontWeight:700, color:"var(--navy)", marginBottom:"3px", lineHeight:1.3 }}>{f.name}</p>
                      <p style={{ fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--gold)", fontWeight:700 }}>Founder</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — 60%: all content */}
            <div className="lg:col-span-3 reveal d1">
              <div className="eyebrow-dark mb-5">Leadership</div>
              <h2 className="font-display" style={{ fontSize:"clamp(28px,3.5vw,44px)", fontWeight:300, color:"var(--navy)", lineHeight:1.1, marginBottom:"8px" }}>
                Message from<br/>
                <em style={{ fontStyle:"italic", color:"var(--gold)" }}>the Founders</em>
              </h2>
              <div style={{ width:"48px", height:"3px", background:"var(--gold)", marginBottom:"36px" }}/>
              <p style={{ fontSize:"clamp(14px,1.3vw,17px)", fontStyle:"italic", color:"var(--navy)", borderLeft:"3px solid var(--green)", paddingLeft:"24px", marginBottom:"28px", lineHeight:1.7, fontWeight:300 }}>
                &ldquo;Faith. Experience. Innovation. Growth. &mdash; these are not just words. They are the pillars upon which Ghani Global Group has been built.&rdquo;
              </p>
              <div className="space-y-4" style={{ fontSize:"16px", lineHeight:1.85, color:"var(--text2)", fontWeight:300 }}>
                <p>Since our incorporation in 2007, Ghani Global Group has grown from a single industrial gas company into a diversified conglomerate spanning multiple sectors of Pakistan&apos;s economy. This journey has been defined by our unwavering commitment to excellence, transparency, and the creation of lasting value for all stakeholders.</p>
                <p>As we move forward, our focus remains on sustainable growth, strategic diversification, and contributing meaningfully to Pakistan&apos;s industrial development. We are proud of what we have built &mdash; and more excited about what lies ahead.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

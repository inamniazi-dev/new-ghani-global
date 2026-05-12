"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, ChevronRight } from "lucide-react";
import WhatWeDoStory from "@/components/home/WhatWeDoStory";
import ConstellationNetwork from "@/components/home/ConstellationNetwork";
import HeroSlider from "@/components/home/HeroSlider";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left");
    const io = new IntersectionObserver(
      (e) => e.forEach(en => { if(en.isIntersecting) en.target.classList.add("in-view"); }),
      { threshold:0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ target, suffix="+" }: { target:number; suffix?:string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if(!e.isIntersecting) return;
      io.disconnect();
      let s=0; const step=Math.ceil(target/48);
      const t=setInterval(()=>{ s+=step; if(s>=target){setVal(target);clearInterval(t);}else setVal(s); },28);
    },{ threshold:0.5 });
    if(ref.current) io.observe(ref.current);
    return () => io.disconnect();
  },[target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const industries = [
  { id:"holdings", tab:"Ghani Global Holdings Limited",     title:"Strategic Investment Holdings", desc:"The principal holding company of the group, managing strategic investments in subsidiaries and associated companies — driving long-term value creation for stakeholders across Pakistan's industrial landscape.", img:"/ghani-global-holdings.jpg",     link:"/about", ext:false },
  { id:"chemical", tab:"Ghani Chemical Industries Limited", title:"Industrial & Medical Gases",    desc:"Pakistan's leading manufacturer of industrial and medical gases, serving hospitals, industries, and research institutes nationwide, while also providing medical gas equipment and pipeline solutions to healthcare facilities across the country.", img:"/chemical-banner.jpeg", link:"https://ghaniglobal.com/ghanichemicals/", ext:true },
  { id:"glass",    tab:"Ghani Global Glass Limited",        title:"Precision Glass Products",      desc:"We take pride in being the sole manufacturer of borosilicate glass tubes (USP Type I – \"Neutral Glass\") in Pakistan. We are also the market leader in the manufacturing of vials and ampoules across the country.", img:"/glass-banner.jpeg",        link:"https://www.ghaniglobalglass.com", ext:true },
  { id:"chemworld",tab:"Ghani ChemWorld Limited",           title:"Chemicals",           desc:"Utilizing modern electric arc furnaces, Carbonation towers and Hydro cyclones, Ghani ChemWorld Limited produces Calcium Carbide, Lime and Precipitated Calcium Carbonate — reflecting a continuous pursuit of cutting-edge solutions in the chemical industry.", img:"/Chemworld-banner.jpeg",           link:"https://ghanichemworld.com/", ext:false },
];

const milestones = [
  { year:"2007", label:"", tag:"", desc:"Ghani Global Group" },
  { year:"2007", label:"", tag:"", desc:"Ghani Global Holdings Limited" },
  { year:"2007", label:"", tag:"", desc:"Ghani Global Glass Limited" },
  { year:"2015", label:"", tag:"", desc:"Ghani Chemical Industries Limited" },
  { year:"2020", label:"", tag:"", desc:"Long Term agreement signed with Engro Polymer & Chemicals for Oxygen & Nitrogen Gases" },
  { year:"2024", label:"", tag:"", desc:"Ghani ChemWorld Limited" },
  { year:"2025", label:"", tag:"", desc:"JV with Mari Energies, as the first operator of LNG & CO2 production in Pakistan (Daharki, Sindh)" },
  { year:"2025", label:"", tag:"", desc:"GHG Emissions Mitigation Limited" },
];

const newsItems = [
  { tag:"Announcement",      date:"March 2026",    title:"Ghani ChemWorld Limited Calcium Carbide Project Progresses at Hattar SEZ",    excerpt:"The demerger scheme sanctioned by the Lahore High Court has been fully executed, transferring all assets to Ghani ChemWorld Limited.", img:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80" },
  { tag:"Investor Relations", date:"February 2026", title:"Ghani Global Holdings Limited Announces Interim Financial Results",            excerpt:"The Board of Directors reviewed the interim financial statements, continuing the company's tradition of transparent investor communication.", img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
  { tag:"Corporate",         date:"January 2026",  title:"Annual General Meeting Notice Issued to Shareholders",                  excerpt:"Shareholders of Ghani Global Group are invited to attend the AGM. Full notice and agenda have been dispatched to all registered shareholders.", img:"https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=600&q=80" },
];

const listedCompanies = [
  { tag:"PSX Listed", ticker:"GGHL", name:"Ghani Global Holdings Limited",    desc:"Principal holding company on the Pakistan Stock Exchange.", href:"/about", ext:false },
  { tag:"PSX Listed", ticker:"GGGL",  name:"Ghani Global Glass Limited",       desc:"Glass tubes, vials, ampules and glassware.", href:"https://www.ghaniglobalglass.com", ext:true },
  { tag:"PSX Listed", ticker:"GCIL", name:"Ghani Chemical Industries Limited", desc:"Medical & industrial gases and chemicals.", href:"https://ghaniglobal.com/ghanichemicals/", ext:true },
  { tag:"Subsidiary", ticker:"GCWL", name:"Ghani ChemWorld Limited",          desc:"Calcium Carbide Project, Hattar Special Economic Zone.", href:"/about", ext:false },
  { tag:"Group",      ticker:"GIC",  name:"Industrial Complex",         desc:"Integrated industrial infrastructure.", href:"/about", ext:false },
];

const associatedCompanies = [
  "Air Ghani (Pvt) Limited",
  "Ghani Logistics (Pvt) Limited",
  "Ghani Energies Limited",
  "Ghani Gases (Private) Limited",
  "G3 Properties (Pvt) Limited",
  "Ghani Engineering (Pvt) Limited",
  "Ghani Global Foods (Pvt) Limited",
  "Ghani Industrial Complex (Pvt) Limited",
  "Kaya Projects (Pvt) Limited",
  "Killowatt Labs Technologies Limited",
];

const psxTicker = [
  "Ghani Global Holdings Limited · GGHL",
  "Ghani Chemical Industries Limited · GCIL",
  "Ghani Global Glass Limited · GGGL",
  "Ghani ChemWorld Limited · GCWL",
];

const tickerItems = ["Ghani Global Holdings Limited · GGHL","Ghani Global Glass Limited · PSX Listed","Ghani Chemical Industries Limited · PSX Listed","Ghani ChemWorld Limited · Est. 2024","Ghani Industrial Complex","Lahore · Pakistan · Est. 2007"];

const visionItems = [
  { label:"Vision",             text:"Growth through the best value creation for the benefit of all stakeholders." },
  { label:"Mission",            text:"Invest in projects that optimise risk-return profile. Achieve excellence in business. Continuously develop our human resource." },
  { label:"Principle Business", text:"Managing investments in subsidiary and associated companies and trading activities in line with the Memorandum of Association." },
];

export default function HomePage() {
  useReveal();
  const [activeTab, setActiveTab] = useState("holdings");
  const activeIndustry = industries.find(i => i.id === activeTab)!;

  return (
    <div style={{ background:"var(--bg)" }}>

      {/* ── HERO — full viewport ── */}
      <section className="relative" style={{ height:"100vh", minHeight:"580px" }}>
        <div className="absolute inset-0 overflow-hidden">
          <HeroSlider/>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20" style={{ background:"rgba(1,8,44,0.85)", borderTop:"1px solid rgba(164,199,61,0.25)", overflow:"hidden" }}
          onMouseEnter={e=>(e.currentTarget.querySelector(".ticker-animate") as HTMLElement)?.style.setProperty("animation-play-state","paused")}
          onMouseLeave={e=>(e.currentTarget.querySelector(".ticker-animate") as HTMLElement)?.style.setProperty("animation-play-state","running")}
        >
          <div className="ticker-animate" style={{ display:"flex", width:"max-content" }}>
            {[0,1].map(track => (
              <div key={track} style={{ display:"flex", flexShrink:0 }} aria-hidden={track===1}>
                {[...psxTicker,...associatedCompanies].map((t,i)=>(
                  <span key={i} className="inline-flex items-center gap-4 px-10 text-[11px] tracking-[0.18em] uppercase font-medium py-3" style={{ color: i < psxTicker.length ? "var(--gold)" : "rgba(255,255,255,0.8)", whiteSpace:"nowrap" }}>
                    <span className="w-1 h-1 rounded-full inline-block" style={{ background: i < psxTicker.length ? "var(--green)" : "var(--gold)", opacity:0.9 }}/>{t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section style={{ padding:"96px clamp(32px,6vw,96px)", background:"var(--bg)", overflow:"hidden" }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="eyebrow-dark mb-5">Who We Are</div>
            <h2 className="font-display mb-6" style={{ fontSize:"clamp(34px,4.5vw,52px)", fontWeight:500, color:"var(--navy)", lineHeight:1.08 }}>
              A Legacy Built on<br/><em style={{ fontStyle:"italic", color:"var(--gold)" }}>Trust &amp; Innovation</em>
            </h2>
            <p className="mb-8" style={{ fontSize:"15px", lineHeight:1.85, color:"var(--text2)", fontWeight:300 }}>
              With a legacy spanning nearly six decades, we are a leading industrial group operating across the Gases, Glass, Textile, Automobile, and Mining industries, delivering excellence through innovation and reliability.
            </p>
            <div style={{ marginTop:"40px", display:"grid", gridTemplateColumns:"repeat(3, 1fr)", borderTop:"1px solid rgba(164,199,61,0.2)", paddingTop:"32px" }}>
              {[
                { target:4,  suffix:"",  label:"PSX Listed Companies" },
                { target:10, suffix:"+", label:"Associated Companies"  },
                { target:17, suffix:"+", label:"Years of Excellence"   },
              ].map((s,i)=>(
                <div key={s.label} style={{ borderRight:i<2?"1px solid rgba(164,199,61,0.15)":"none", paddingRight:"16px", paddingLeft: i>0 ? "16px" : "0" }}>
                  <p className="font-display mb-1" style={{ fontSize:"clamp(28px,3vw,42px)", fontWeight:300, lineHeight:1, color:"var(--navy)" }}>
                    <Counter target={s.target} suffix={s.suffix}/>
                  </p>
                  <p style={{ fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:600, color:"var(--gold)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-left" style={{ position:"relative", padding:"24px" }}>
            <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
              <div style={{ position:"absolute", top:"-10%", right:"-5%", width:"55%", height:"60%", background:"var(--navy)", clipPath:"polygon(20% 0%, 100% 0%, 100% 85%, 0% 100%)", opacity:0.07 }}/>
              <div style={{ position:"absolute", bottom:"-5%", left:"-5%", width:"45%", height:"50%", background:"var(--gold)", clipPath:"polygon(0% 15%, 100% 0%, 80% 100%, 0% 100%)", opacity:0.08 }}/>
              <div style={{ position:"absolute", top:"5%", left:"0%", width:"30%", height:"35%", background:"var(--green)", clipPath:"polygon(0% 0%, 100% 10%, 75% 100%, 0% 90%)", opacity:0.06 }}/>
              <div style={{ position:"absolute", top:"0", right:"8%", width:"2px", height:"40%", background:"linear-gradient(180deg, var(--gold) 0%, transparent 100%)", transform:"rotate(15deg)", transformOrigin:"top center", opacity:0.4 }}/>
              <div style={{ position:"absolute", bottom:"0", left:"8%", width:"2px", height:"35%", background:"linear-gradient(0deg, var(--green) 0%, transparent 100%)", transform:"rotate(-12deg)", transformOrigin:"bottom center", opacity:0.4 }}/>
              <div style={{ position:"absolute", top:"12px", right:"12px", width:"32px", height:"32px", borderTop:"2px solid var(--gold)", borderRight:"2px solid var(--gold)", opacity:0.5 }}/>
              <div style={{ position:"absolute", bottom:"12px", left:"12px", width:"32px", height:"32px", borderBottom:"2px solid var(--green)", borderLeft:"2px solid var(--green)", opacity:0.5 }}/>
            </div>
            <div style={{ position:"relative", zIndex:2 }}>
              <img src="/legacy-trust-innovation.png" alt="Ghani Global Group — Trust and Innovation" style={{ width:"100%", height:"auto", objectFit:"contain", display:"block" }}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── MESSAGE FROM THE FOUNDERS ── */}
      <section style={{ background:"#F0F7EE", padding:"64px clamp(32px,6vw,96px)", overflow:"hidden", minHeight:"100vh", display:"flex", alignItems:"center" }}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-2 reveal" style={{ position:"relative" }}>
              <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}>
                <div style={{ position:"absolute", top:"-24px", left:"-24px", width:"160px", height:"200px", background:"var(--navy)", clipPath:"polygon(0% 0%, 85% 0%, 100% 80%, 0% 100%)", opacity:0.06 }}/>
                <div style={{ position:"absolute", bottom:"-20px", right:"-20px", width:"140px", height:"180px", background:"var(--gold)", clipPath:"polygon(15% 0%, 100% 20%, 100% 100%, 0% 100%)", opacity:0.08 }}/>
                <div style={{ position:"absolute", top:"35%", left:"-16px", width:"8px", height:"120px", background:"var(--green)", opacity:0.5, borderRadius:"4px" }}/>
                <div style={{ position:"absolute", top:"20%", right:"-16px", width:"8px", height:"100px", background:"var(--gold)", opacity:0.4, borderRadius:"4px" }}/>
                <div style={{ position:"absolute", top:"8px", right:"8px", width:"28px", height:"28px", borderTop:"2px solid var(--gold)", borderRight:"2px solid var(--gold)", opacity:0.5 }}/>
                <div style={{ position:"absolute", bottom:"8px", left:"8px", width:"28px", height:"28px", borderBottom:"2px solid var(--green)", borderLeft:"2px solid var(--green)", opacity:0.5 }}/>
                <div style={{ position:"absolute", top:0, right:"18%", width:"2px", height:"30%", background:"linear-gradient(180deg, var(--gold) 0%, transparent 100%)", transform:"rotate(12deg)", transformOrigin:"top center", opacity:0.35 }}/>
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
            <div className="lg:col-span-3 reveal d1">
              <div className="eyebrow-dark mb-5">Leadership</div>
              <h2 className="font-display" style={{ fontSize:"clamp(28px,3.5vw,44px)", fontWeight:500, color:"var(--navy)", lineHeight:1.1, marginBottom:"8px" }}>
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

      {/* ── WHAT WE DO — Sticky Scroll Story ── */}
      <WhatWeDoStory industries={industries}/>

      {/* ── CONSTELLATION NETWORK ── */}
      <ConstellationNetwork/>

      {/* ── OUR JOURNEY ── */}
      <section style={{ background:"#F0F7EE", padding:"96px clamp(32px,6vw,96px)", overflow:"hidden" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-16 reveal">
            <div>
              <div className="eyebrow-dark mb-5">Our Journey</div>
              <h2 className="font-display" style={{ fontSize:"clamp(36px,5vw,64px)", fontWeight:500, color:"var(--navy)", lineHeight:1.0, letterSpacing:"-0.02em" }}>
                A Legacy Built<br/>
                <em style={{ fontStyle:"italic", color:"var(--green)" }}>Year on Year</em>
              </h2>
            </div>
            <div>
              <p style={{ fontSize:"16px", lineHeight:1.85, color:"var(--text2)", fontWeight:300 }}>
                From a single industrial gas company founded by three brothers in 2007 to a diversified conglomerate operating across multiple sectors of Pakistan's economy.
              </p>
            </div>
          </div>
        </div>

        <div
          className="journey-scroll-outer"
          style={{ position:"relative", overflow:"hidden", paddingBottom:"20px" }}
          onMouseEnter={e => {
            const track = e.currentTarget.querySelector('.journey-scroll-track') as HTMLElement;
            if (track) track.style.animationPlayState = 'paused';
          }}
          onMouseLeave={e => {
            const track = e.currentTarget.querySelector('.journey-scroll-track') as HTMLElement;
            if (track) track.style.animationPlayState = 'running';
          }}
        >
          <div style={{ position:"absolute", top:0, left:0, bottom:0, width:"120px", background:"linear-gradient(90deg, #F0F7EE 0%, transparent 100%)", zIndex:10, pointerEvents:"none" }}/>
          <div style={{ position:"absolute", top:0, right:0, bottom:0, width:"120px", background:"linear-gradient(270deg, #F0F7EE 0%, transparent 100%)", zIndex:10, pointerEvents:"none" }}/>
          <div className="journey-scroll-track" style={{ display:"flex", flexDirection:"column", width:"max-content" }}>
            <div style={{ display:"flex", flexDirection:"row" }}>
              {[...milestones, ...milestones].map((m, i) => (
                <div key={i} style={{ width:"clamp(220px, 22vw, 320px)", flexShrink:0, padding:"0 clamp(24px,3vw,48px)", height:"200px" }}>
                  <div className="font-display" style={{ fontSize:"clamp(48px,5vw,80px)", fontWeight:700, color:"var(--green)", lineHeight:1, marginBottom:"16px", letterSpacing:"-0.02em" }}>{m.year}</div>
                  <p style={{ fontSize:"clamp(13px,1.1vw,16px)", color:"var(--navy)", fontWeight:400, lineHeight:1.4 }}>{m.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ height:"32px" }}/>
            <div style={{ display:"flex", flexDirection:"row", alignItems:"center", position:"relative", height:"28px" }}>
              <div style={{ position:"absolute", top:"50%", left:0, right:0, height:"1px", background:"rgba(1,8,44,0.2)", transform:"translateY(-50%)", zIndex:0 }}/>
              {[...milestones, ...milestones].map((m, i) => (
                <div key={i} style={{ width:"clamp(220px, 22vw, 320px)", flexShrink:0, padding:"0 clamp(24px,3vw,48px)", display:"flex", alignItems:"center" }}>
                  <div style={{ width:"24px", height:"24px", borderRadius:"50%", background:"var(--green)", boxShadow:"0 0 0 6px rgba(164,199,61,0.2), 0 0 16px rgba(164,199,61,0.6)", zIndex:2, flexShrink:0 }}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CSR SECTION ── */}
      <section style={{ background:"#f8fdf4", padding:"96px clamp(32px,6vw,96px)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-100px", right:"-100px", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle, rgba(164,199,61,0.08) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-80px", left:"-80px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(211,184,59,0.06) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="eyebrow mb-4 reveal">Corporate Social Responsibility</div>
              <div className="section-divider reveal"/>
              <h2 className="font-display reveal d1" style={{ fontSize:"clamp(28px,3.5vw,46px)", fontWeight:500, color:"var(--navy)", lineHeight:1.1, marginBottom:"20px" }}>
                Committed to <em style={{ fontStyle:"italic", color:"var(--blue)" }}>People &amp; Community</em>
              </h2>
              <p className="reveal d2" style={{ fontSize:"16px", color:"var(--text2)", lineHeight:1.85, fontWeight:300, marginBottom:"28px" }}>
                At Ghani Global Group, we believe that true success goes beyond financial performance. We are deeply committed to making a positive and lasting impact on the communities we serve and the people who make our work possible.
              </p>
              <Link href="/coming-soon" style={{ fontSize:"13px", fontWeight:600, color:"var(--green2)", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"6px", borderBottom:"1px solid var(--green)", paddingBottom:"2px" }}>
                Learn More <ArrowRight size={12}/>
              </Link>
            </div>
            <div className="reveal-left">
              <div style={{ background:"linear-gradient(135deg, var(--navy) 0%, #050e3a 100%)", padding:"48px", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg, var(--green) 0%, var(--gold) 100%)" }}/>
                <p style={{ fontSize:"clamp(48px,5vw,72px)", fontWeight:700, color:"var(--green)", lineHeight:1, marginBottom:"12px" }}>CSR</p>
                <p className="font-display" style={{ fontSize:"clamp(18px,2vw,26px)", fontWeight:500, color:"white", lineHeight:1.3, marginBottom:"16px" }}>
                  A responsibility we take seriously — every year, every project, every community.
                </p>
                <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.5)", lineHeight:1.75, fontStyle:"italic", marginBottom:"24px" }}>
                  Our detailed CSR report and community initiatives will be published soon. Stay tuned.
                </p>
                <Link href="/coming-soon" style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"11px", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:600, color:"var(--green)", borderBottom:"1px solid rgba(164,199,61,0.4)", paddingBottom:"2px", textDecoration:"none" }}>
                  Coming Soon <ArrowRight size={12}/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY SECTION ── */}
      <section style={{ background:"var(--navy)", padding:"96px clamp(32px,6vw,96px)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-120px", right:"-120px", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle, rgba(164,199,61,0.06) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-100px", left:"-100px", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle, rgba(211,184,59,0.05) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg, transparent 0%, var(--green) 30%, var(--gold) 70%, transparent 100%)" }}/>
        <div className="max-w-7xl mx-auto relative z-10">
          <div style={{ textAlign:"center", marginBottom:"72px" }} className="reveal">
            <div className="eyebrow mb-4" style={{ color:"rgba(255,255,255,0.5)" }}>Sustainability & HSE</div>
            <h2 className="font-display" style={{ fontSize:"clamp(32px,4vw,56px)", fontWeight:500, color:"white", lineHeight:1.1, marginBottom:"20px" }}>
              Building a <em style={{ fontStyle:"italic", color:"var(--green)" }}>Greener Tomorrow</em>
            </h2>
            <p style={{ fontSize:"16px", color:"rgba(255,255,255,0.55)", lineHeight:1.85, fontWeight:300, maxWidth:"680px", margin:"0 auto" }}>
              Sustainability is not just a commitment — it is embedded in how we operate. From harnessing solar energy to achieving carbon-free operations, we are proud to lead Pakistan&apos;s industrial sector toward a cleaner, greener future.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon:"☀️", label:"Solar Energy",          text:"We have installed solar power plants across our facilities, generating clean renewable energy and significantly reducing our dependence on fossil fuels.", accent:"var(--gold)" },
              { icon:"🌱", label:"Zero Carbon Emissions", text:"Our operations are designed to be free from carbon emissions, reflecting our unwavering commitment to environmental responsibility and a cleaner Pakistan. We also strive to contribute towards improved air quality by adopting sustainable and environmentally responsible operational practices.", accent:"var(--green)" },
              { icon:"🤝", label:"HSE Commitment",       text:"Health, Safety, and Environment (HSE) remain integral to every aspect of our operations. We are committed to maintaining the highest safety standards through continuous training, risk management, compliance monitoring, and responsible operational practices. By fostering a strong culture of safety and environmental awareness, we aim to protect our workforce, enhance operational reliability, and contribute to a safer and healthier future for Pakistan.", accent:"var(--gold)" },
            ].map((c,i)=>(
              <div key={c.label} className="reveal" style={{ animationDelay:`${i*0.12}s`, padding:"40px 32px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderTop:`3px solid ${c.accent}`, backdropFilter:"blur(8px)" }}>
                <div style={{ fontSize:"40px", marginBottom:"20px" }}>{c.icon}</div>
                <h3 className="font-display" style={{ fontSize:"20px", fontWeight:700, color:"white", marginBottom:"14px" }}>{c.label}</h3>
                <p style={{ fontSize:"14px", lineHeight:1.85, color:"rgba(255,255,255,0.55)", fontWeight:300 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section style={{ background:"var(--bg)", padding:"96px clamp(32px,6vw,96px)" }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <div className="eyebrow-dark mb-4">Latest Updates</div>
            <h2 className="font-display" style={{ fontSize:"clamp(30px,4vw,48px)", fontWeight:500, color:"var(--navy)" }}>
              News &amp; <em style={{ fontStyle:"italic", color:"var(--blue)" }}>Announcements</em>
            </h2>
          </div>
          <Link href="/news" className="btn-outline shrink-0">All News</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((n,i)=>(
            <div key={i} className="news-card reveal" style={{ animationDelay:`${i*0.1}s` }}>
              <div className="overflow-hidden" style={{ height:"196px" }}>
                <img src={n.img} alt={n.title} className="w-full h-full" style={{ objectFit:"cover", transition:"transform 0.5s" }}/>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[9px] tracking-[0.18em] uppercase px-2 py-1" style={{ background:"rgba(164,199,61,0.1)", color:"var(--green2)", border:"1px solid rgba(164,199,61,0.25)" }}>{n.tag}</span>
                  <span className="text-[10px]" style={{ color:"var(--text2)", opacity:0.6 }}>{n.date}</span>
                </div>
                <h3 className="font-display font-normal mb-3 leading-snug" style={{ fontSize:"18px", color:"var(--navy)" }}>{n.title}</h3>
                <p className="text-[13px] font-light leading-relaxed mb-5" style={{ color:"var(--text2)" }}>{n.excerpt}</p>
                <span className="text-[10px] tracking-[0.15em] uppercase flex items-center gap-2" style={{ color:"var(--blue3)" }}>Read More <ArrowRight size={10}/></span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

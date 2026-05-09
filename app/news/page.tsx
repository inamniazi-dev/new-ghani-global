"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

const newsItems = [
  { tag:"Announcement",      date:"March 2026",    title:"Ghani ChemWorld Limited Calcium Carbide Project Progresses at Hattar SEZ",    excerpt:"The demerger scheme sanctioned by the Lahore High Court has been fully executed, transferring all assets to Ghani ChemWorld Limited. The project marks a significant milestone in the group's expansion into specialty chemicals.", img:"https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80" },
  { tag:"Investor Relations", date:"February 2026", title:"Ghani Global Holdings Limited Announces Interim Financial Results",            excerpt:"The Board of Directors reviewed the interim financial statements, continuing the company's tradition of transparent investor communication. Results reflect strong operational performance across all subsidiaries.", img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" },
  { tag:"Corporate",         date:"January 2026",  title:"Annual General Meeting Notice Issued to Shareholders",                         excerpt:"Shareholders of Ghani Global Group are invited to attend the AGM. Full notice and agenda have been dispatched to all registered shareholders. The meeting will cover financial results and strategic outlook.", img:"https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?w=600&q=80" },
  { tag:"Corporate",         date:"December 2025", title:"Ghani Global Glass Limited Expands Pharmaceutical Glass Production Capacity",  excerpt:"Ghani Global Glass Limited has commissioned new production lines for borosilicate glass tubes, further strengthening its position as Pakistan's sole manufacturer of USP Type I pharmaceutical-grade glass.", img:"https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80" },
  { tag:"Milestone",         date:"November 2025", title:"Demerger Scheme Successfully Completed — Assets Transferred to Ghani ChemWorld", excerpt:"Following the Lahore High Court sanction, the demerger scheme has been fully executed. All relevant assets have been transferred to Ghani ChemWorld Limited, paving the way for the Calcium Carbide Project at Hattar SEZ.", img:"https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80" },
  { tag:"Announcement",      date:"October 2025",  title:"Ghani Chemical Industries Limited Launches New Medical Gas Pipeline Solutions", excerpt:"Ghani Chemical Industries Limited has expanded its product portfolio to include comprehensive medical gas pipeline solutions for hospitals and healthcare facilities across Pakistan.", img:"https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80" },
];

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

export default function NewsPage() {
  useReveal();
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>

      {/* HERO BANNER */}
      <section style={{ position:"relative", overflow:"hidden", padding:"64px clamp(32px,6vw,96px) 48px" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          <img src="/hero-banner.jpg" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 30%", display:"block" }}/>
          <div style={{ position:"absolute", inset:0, background:"rgba(1,8,44,0.82)" }}/>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div style={{ fontSize:"9px", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:"var(--gold)", marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ width:"24px", height:"1px", background:"var(--gold)", display:"inline-block" }}/>
            Latest Updates
          </div>
          <h1 className="font-display" style={{ fontSize:"clamp(40px,6vw,72px)", fontWeight:300, color:"white", lineHeight:1.0, letterSpacing:"-0.02em", marginBottom:"16px" }}>
            News &amp;<br/>
            <em style={{ fontStyle:"italic", color:"var(--gold)" }}>Announcements</em>
          </h1>
          <div style={{ width:"56px", height:"3px", background:"var(--green)" }}/>
        </div>
      </section>

      {/* NEWS GRID */}
      <section style={{ padding:"80px clamp(32px,6vw,96px)", background:"var(--bg)" }}>
        <div className="max-w-7xl mx-auto">

          {/* Featured first item */}
          <div className="reveal" style={{ marginBottom:"48px" }}>
            <div className="grid lg:grid-cols-2 gap-0" style={{ background:"white", border:"1px solid var(--line)", overflow:"hidden" }}>
              <div style={{ height:"360px", overflow:"hidden", position:"relative" }}>
                <img src={newsItems[0].img} alt={newsItems[0].title}
                  style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.6s ease" }}
                  onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.04)")}
                  onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}/>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg, var(--green), var(--gold))" }}/>
              </div>
              <div style={{ padding:"48px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"20px" }}>
                  <span style={{ fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700, padding:"3px 10px", background:"rgba(164,199,61,0.1)", color:"var(--green2)", border:"1px solid rgba(164,199,61,0.25)" }}>{newsItems[0].tag}</span>
                  <span style={{ fontSize:"11px", color:"var(--text2)", opacity:0.6 }}>{newsItems[0].date}</span>
                </div>
                <h2 className="font-display" style={{ fontSize:"clamp(20px,2.5vw,30px)", fontWeight:300, color:"var(--navy)", lineHeight:1.2, marginBottom:"16px" }}>{newsItems[0].title}</h2>
                <p style={{ fontSize:"14px", lineHeight:1.8, color:"var(--text2)", fontWeight:300, marginBottom:"28px" }}>{newsItems[0].excerpt}</p>
                <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--green2)", fontWeight:700 }}>
                  Read More <ArrowRight size={11}/>
                </div>
              </div>
            </div>
          </div>

          {/* Rest grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.slice(1).map((n, i) => (
              <div key={i} className="news-card reveal" style={{ animationDelay:`${i*0.1}s` }}>
                <div style={{ overflow:"hidden", height:"196px", position:"relative" }}>
                  <img src={n.img} alt={n.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }}
                    onMouseEnter={e=>(e.currentTarget.style.transform="scale(1.04)")}
                    onMouseLeave={e=>(e.currentTarget.style.transform="scale(1)")}/>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"linear-gradient(90deg, var(--green), var(--gold))" }}/>
                </div>
                <div style={{ padding:"24px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
                    <span style={{ fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700, padding:"2px 8px", background:"rgba(164,199,61,0.1)", color:"var(--green2)", border:"1px solid rgba(164,199,61,0.25)" }}>{n.tag}</span>
                    <span style={{ fontSize:"10px", color:"var(--text2)", opacity:0.6 }}>{n.date}</span>
                  </div>
                  <h3 className="font-display" style={{ fontSize:"17px", fontWeight:400, color:"var(--navy)", marginBottom:"10px", lineHeight:1.35 }}>{n.title}</h3>
                  <p style={{ fontSize:"13px", lineHeight:1.75, color:"var(--text2)", fontWeight:300, marginBottom:"16px" }}>{n.excerpt}</p>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--green2)", fontWeight:700 }}>
                    Read More <ArrowRight size={10}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

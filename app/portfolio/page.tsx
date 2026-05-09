import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <div style={{ height:"3px", background:"linear-gradient(90deg, var(--green) 0%, var(--gold) 100%)" }}/>
      <div style={{ padding:"28px clamp(32px,6vw,96px) 0", borderBottom:"1px solid var(--line)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", fontSize:"11px", letterSpacing:"0.12em", textTransform:"uppercase" }}>
          <Link href="/" style={{ color:"var(--text2)", fontWeight:500 }}>Home</Link>
          <span style={{ color:"var(--line2)" }}>/</span>
          <span style={{ color:"var(--gold)", fontWeight:700 }}>Our Portfolio</span>
        </div>
      </div>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"80px clamp(32px,6vw,96px)" }}>
        <div style={{ textAlign:"center", maxWidth:"600px" }}>
          <img src="/logo-header.png" alt="Ghani Global Group" style={{ height:"48px", width:"auto", display:"block", margin:"0 auto 48px", opacity:0.85 }}/>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"10px", fontSize:"10px", letterSpacing:"0.28em", textTransform:"uppercase", fontWeight:700, color:"var(--gold)", marginBottom:"28px" }}>
            <span style={{ width:"24px", height:"1px", background:"var(--gold)", display:"inline-block" }}/>
            Our Portfolio
            <span style={{ width:"24px", height:"1px", background:"var(--gold)", display:"inline-block" }}/>
          </div>
          <h1 className="font-display" style={{ fontSize:"clamp(42px,7vw,80px)", fontWeight:300, color:"var(--navy)", lineHeight:1.0, letterSpacing:"-0.02em", marginBottom:"24px" }}>
            Coming <em style={{ fontStyle:"italic", color:"var(--green)" }}>Soon</em>
          </h1>
          <div style={{ width:"56px", height:"3px", background:"var(--green)", margin:"0 auto 28px" }}/>
          <p style={{ fontSize:"16px", lineHeight:1.8, color:"var(--text2)", fontWeight:300, marginBottom:"48px" }}>
            We are preparing a comprehensive portfolio showcase of the Ghani Global Group — our PSX-listed companies, associated entities, and strategic investments. Check back soon.
          </p>
          <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:"10px", background:"var(--navy)", color:"white", fontSize:"11px", letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700, padding:"16px 36px" }}>
            Get In Touch <ArrowRight size={13}/>
          </Link>
        </div>
      </div>
      <div style={{ borderTop:"1px solid var(--line)", padding:"20px clamp(32px,6vw,96px)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <p style={{ fontSize:"11px", color:"var(--text2)", letterSpacing:"0.05em" }}>© {new Date().getFullYear()} Ghani Global Group · All rights reserved</p>
        <p style={{ fontSize:"11px", color:"var(--text2)", letterSpacing:"0.05em" }}>Est. 2007 · Lahore, Pakistan</p>
      </div>
    </div>
  );
}

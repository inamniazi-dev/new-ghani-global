import Link from "next/link";

const footerLinks = [
  { label:"Home",                 href:"/" },
  { label:"About Us",             href:"/about" },
  { label:"Our Core Team",        href:"/our-core-team" },
  { label:"Investor Relations",   href:"/investor-relations" },
  { label:"PSX Listed Companies", href:"/companies/psx-listed" },
  { label:"Portfolio",            href:"/portfolio" },
  { label:"Contact Us",           href:"/contact" },
  { label:"Sitemap",              href:"/sitemap" },
];

const LAST_UPDATED = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });

export default function Footer() {
  return (
    <footer style={{ background:"var(--navy)" }}>
      {/* Top gold accent line */}
      <div style={{ height:"3px", background:"linear-gradient(90deg, var(--gold) 0%, var(--green) 50%, var(--gold) 100%)" }}/>

      {/* ── 3-column main section ── */}
      <div style={{ padding:"64px clamp(32px,6vw,96px) 0" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">

          {/* Col 1: Brand */}
          <div>
            <img src="/logo-header.png" alt="Ghani Global Group"
              style={{ height:"42px", width:"auto", display:"block", marginBottom:"20px" }}/>
            <p style={{ fontSize:"14px", lineHeight:1.8, color:"rgba(255,255,255,0.75)", marginBottom:"20px" }}>
              A diversified conglomerate engaged in the manufacturing of industrial, medical, and specialty gases, along with pharmaceutical-grade glass tube production and chemical manufacturing.
            </p>

            {/* Logos side by side */}
            <div style={{ marginTop:"28px" }}>
              <div style={{ display:"flex", flexDirection:"row", alignItems:"center", gap:"20px" }}>
                <a href="https://sdms.secp.gov.pk/" target="_blank" rel="noopener noreferrer">
                  <img src="/secp-logo-1.png" alt="SECP" style={{ height:"64px", width:"auto", objectFit:"contain", display:"block" }}/>
                </a>
                <a href="https://www.jamapunji.pk/" target="_blank" rel="noopener noreferrer">
                  <img src="/jama-punji-logo.png" alt="Jama Punji" style={{ height:"64px", width:"auto", objectFit:"contain", display:"block" }}/>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Corporate Office */}
          <div>
            <p style={{ fontSize:"10px", letterSpacing:"0.25em", textTransform:"uppercase", fontWeight:700, color:"var(--gold)", marginBottom:"20px" }}>Corporate Office</p>
            <div style={{ fontSize:"14px", color:"rgba(255,255,255,0.75)", lineHeight:1.8, marginBottom:"16px" }}>
              <p>10-N, Model Town Extension</p>
              <p>Lahore 54000, Pakistan</p>
            </div>
            <div style={{ marginBottom:"12px" }}>
              <p style={{ fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"3px", fontWeight:700 }}>Phone</p>
              <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.75)" }}>+92 42 35161424-5</p>
              <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.75)" }}>UAN: 111-GHANI-1</p>
            </div>
            <div>
              <p style={{ fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"3px", fontWeight:700 }}>Email</p>
              <a href="mailto:corporate@ghaniglobal.com"
                style={{ fontSize:"13px", color:"rgba(255,255,255,0.75)", transition:"color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
                corporate@ghaniglobal.com
              </a>
            </div>
          </div>

          {/* Col 3: Google Map */}
          <div>
            <p style={{ fontSize:"10px", letterSpacing:"0.25em", textTransform:"uppercase", fontWeight:700, color:"var(--gold)", marginBottom:"20px" }}>Find Us</p>
            <div style={{ width:"100%", height:"260px", borderRadius:"6px", overflow:"hidden", border:"1px solid rgba(211,184,59,0.2)" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.1!2d74.3436!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s10-N%20Model%20Town%20Extension%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="100%"
                style={{ border:0, display:"block", filter:"grayscale(20%) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop:"1px solid rgba(211,184,59,0.15)", marginTop:"40px" }}>
        <div style={{ padding:"20px clamp(32px,6vw,96px)", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:"12px" }}>
          <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.75)", letterSpacing:"0.04em" }}>
            © {new Date().getFullYear()} Ghani Global Group · All rights reserved
          </p>
          <div style={{ display:"flex", alignItems:"center", gap:"20px", flexWrap:"wrap" }}>
            <p style={{ fontSize:"12px", letterSpacing:"0.04em" }}>
              <span style={{ color:"rgba(255,255,255,0.75)" }}>Last Updated: </span>
              <span style={{ color:"var(--gold)", fontWeight:700 }}>{LAST_UPDATED}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

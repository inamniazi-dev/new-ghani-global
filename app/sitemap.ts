"use client";
import Link from "next/link";


export default function SitemapPage() {
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", paddingTop:"62px" }}>

      {/* Hero Banner */}
      <section style={{ position:"relative", overflow:"hidden", padding:"64px clamp(32px,6vw,96px) 48px" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0 }}>
          <img src="/hero-banner.jpg" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 30%", display:"block" }}/>
          <div style={{ position:"absolute", inset:0, background:"rgba(1,8,44,0.85)" }}/>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="font-display" style={{ fontSize:"clamp(40px,6vw,72px)", fontWeight:300, color:"white", lineHeight:1.0, letterSpacing:"-0.02em", marginBottom:"16px" }}>
            Sitemap
          </h1>
          <div style={{ width:"56px", height:"3px", background:"var(--green)" }}/>
        </div>
      </section>

      {/* Sitemap Content */}
      <section style={{ padding:"80px clamp(32px,6vw,96px)", background:"var(--bg)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">

            {/* About Us */}
            <div>
              <h2 style={{ fontSize:"13px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"var(--navy)", marginBottom:"16px", paddingBottom:"10px", borderBottom:"2px solid var(--gold)" }}>About Us</h2>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {[
                  { label:"About Ghani Global Group", href:"/about" },
                  { label:"Message from the Founders", href:"/about" },
                  { label:"Our Vision", href:"/about" },
                  { label:"Core Principles", href:"/about" },
                  { label:"Our Journey", href:"/" },
                ].map(l => (
                  <li key={l.label} style={{ marginBottom:"10px" }}>
                    <Link href={l.href} style={{ fontSize:"14px", color:"var(--text2)", textDecoration:"none", display:"flex", alignItems:"center", gap:"8px", transition:"color 0.2s" }}
                      onMouseEnter={e=>(e.currentTarget.style.color="var(--green2)")}
                      onMouseLeave={e=>(e.currentTarget.style.color="var(--text2)")}>
                      <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--green)", flexShrink:0 }}/>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Businesses */}
            <div>
              <h2 style={{ fontSize:"13px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"var(--navy)", marginBottom:"16px", paddingBottom:"10px", borderBottom:"2px solid var(--gold)" }}>Core Businesses</h2>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {[
                  { label:"Ghani Global Holdings Limited",     href:"https://ghaniglobal.com" },
                  { label:"Ghani Chemical Industries Limited", href:"https://ghaniglobal.com/ghanichemicals/" },
                  { label:"Ghani Global Glass Limited",        href:"https://www.ghaniglobalglass.com" },
                  { label:"Ghani ChemWorld Limited",           href:"https://ghanichemworld.com/" },
                ].map(l => (
                  <li key={l.label} style={{ marginBottom:"10px" }}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:"14px", color:"var(--text2)", textDecoration:"none", display:"flex", alignItems:"center", gap:"8px", transition:"color 0.2s" }}
                      onMouseEnter={e=>(e.currentTarget.style.color="var(--green2)")}
                      onMouseLeave={e=>(e.currentTarget.style.color="var(--text2)")}>
                      <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--green)", flexShrink:0 }}/>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Investor Relations */}
            <div>
              <h2 style={{ fontSize:"13px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"var(--navy)", marginBottom:"16px", paddingBottom:"10px", borderBottom:"2px solid var(--gold)" }}>Investor Relations</h2>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {[
                  { label:"Investor Relations",                              href:"/investor-relations",                                                      ext:false },
                  { label:"GGHL — Annual Reports",                          href:"/coming-soon",                                                              ext:false },
                  { label:"GCIL — Annual Reports",                          href:"https://ghaniglobal.com/ghanichemicals/annual-reports-gci/",                ext:true  },
                  { label:"GGGL — Investor Grievances",                     href:"https://www.ghaniglobal.com/ghaniglobalglass/investor-grievances/",         ext:true  },
                  { label:"GCWL — Investor Relations",                      href:"/coming-soon",                                                              ext:false },
                ].map(l => (
                  <li key={l.label} style={{ marginBottom:"10px" }}>
                    {l.ext ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:"14px", color:"var(--text2)", textDecoration:"none", display:"flex", alignItems:"center", gap:"8px", transition:"color 0.2s" }}
                        onMouseEnter={e=>(e.currentTarget.style.color="var(--green2)")}
                        onMouseLeave={e=>(e.currentTarget.style.color="var(--text2)")}>
                        <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--green)", flexShrink:0 }}/>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} style={{ fontSize:"14px", color:"var(--text2)", textDecoration:"none", display:"flex", alignItems:"center", gap:"8px", transition:"color 0.2s" }}
                        onMouseEnter={e=>(e.currentTarget.style.color="var(--green2)")}
                        onMouseLeave={e=>(e.currentTarget.style.color="var(--text2)")}>
                        <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--green)", flexShrink:0 }}/>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* News & Media */}
            <div>
              <h2 style={{ fontSize:"13px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"var(--navy)", marginBottom:"16px", paddingBottom:"10px", borderBottom:"2px solid var(--gold)" }}>News & Media</h2>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {[
                  { label:"All News & Announcements", href:"/news" },
                  { label:"Investor Relations News",  href:"/news" },
                  { label:"Corporate News",           href:"/news" },
                ].map(l => (
                  <li key={l.label} style={{ marginBottom:"10px" }}>
                    <Link href={l.href} style={{ fontSize:"14px", color:"var(--text2)", textDecoration:"none", display:"flex", alignItems:"center", gap:"8px", transition:"color 0.2s" }}
                      onMouseEnter={e=>(e.currentTarget.style.color="var(--green2)")}
                      onMouseLeave={e=>(e.currentTarget.style.color="var(--text2)")}>
                      <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--green)", flexShrink:0 }}/>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sustainability */}
            <div>
              <h2 style={{ fontSize:"13px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"var(--navy)", marginBottom:"16px", paddingBottom:"10px", borderBottom:"2px solid var(--gold)" }}>Sustainability</h2>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {[
                  { label:"Solar Energy",          href:"/" },
                  { label:"Zero Carbon Emissions", href:"/" },
                  { label:"Community First",        href:"/" },
                  { label:"CSR",                    href:"/" },
                ].map(l => (
                  <li key={l.label} style={{ marginBottom:"10px" }}>
                    <Link href={l.href} style={{ fontSize:"14px", color:"var(--text2)", textDecoration:"none", display:"flex", alignItems:"center", gap:"8px", transition:"color 0.2s" }}
                      onMouseEnter={e=>(e.currentTarget.style.color="var(--green2)")}
                      onMouseLeave={e=>(e.currentTarget.style.color="var(--text2)")}>
                      <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--green)", flexShrink:0 }}/>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory */}
            <div>
              <h2 style={{ fontSize:"13px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"var(--navy)", marginBottom:"16px", paddingBottom:"10px", borderBottom:"2px solid var(--gold)" }}>Regulatory</h2>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {[
                  { label:"SECP",        href:"https://sdms.secp.gov.pk/" },
                  { label:"Jama Punji",  href:"https://www.jamapunji.pk/" },
                  { label:"PSX",         href:"https://www.psx.com.pk/" },
                ].map(l => (
                  <li key={l.label} style={{ marginBottom:"10px" }}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:"14px", color:"var(--text2)", textDecoration:"none", display:"flex", alignItems:"center", gap:"8px", transition:"color 0.2s" }}
                      onMouseEnter={e=>(e.currentTarget.style.color="var(--green2)")}
                      onMouseLeave={e=>(e.currentTarget.style.color="var(--text2)")}>
                      <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--green)", flexShrink:0 }}/>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h2 style={{ fontSize:"13px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"var(--navy)", marginBottom:"16px", paddingBottom:"10px", borderBottom:"2px solid var(--gold)" }}>Contact</h2>
              <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                {[
                  { label:"Contact Us", href:"/contact"      },
                  { label:"Careers",    href:"/coming-soon"  },
                  { label:"LinkedIn",   href:"https://www.linkedin.com/company/ghaniglobalgroup",          ext:true },
                  { label:"Facebook",   href:"https://www.facebook.com/profile.php?id=61578499738385",     ext:true },
                  { label:"Instagram",  href:"https://www.instagram.com/ghaniglobalgroup/",               ext:true },
                ].map(l => (
                  <li key={l.label} style={{ marginBottom:"10px" }}>
                    {(l as any).ext ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:"14px", color:"var(--text2)", textDecoration:"none", display:"flex", alignItems:"center", gap:"8px", transition:"color 0.2s" }}
                        onMouseEnter={e=>(e.currentTarget.style.color="var(--green2)")}
                        onMouseLeave={e=>(e.currentTarget.style.color="var(--text2)")}>
                        <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--green)", flexShrink:0 }}/>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} style={{ fontSize:"14px", color:"var(--text2)", textDecoration:"none", display:"flex", alignItems:"center", gap:"8px", transition:"color 0.2s" }}
                        onMouseEnter={e=>(e.currentTarget.style.color="var(--green2)")}
                        onMouseLeave={e=>(e.currentTarget.style.color="var(--text2)")}>
                        <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--green)", flexShrink:0 }}/>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

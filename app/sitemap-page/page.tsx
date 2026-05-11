"use client";
import Link from "next/link";

const sections = [
  {
    heading: "About Us",
    links: [
      { label:"About Ghani Global Group",  href:"/about",        ext:false },
      { label:"Message from the Founders", href:"/about",        ext:false },
      { label:"Our Vision",                href:"/about",        ext:false },
      { label:"Core Principles",           href:"/about",        ext:false },
      { label:"Our Journey",               href:"/",             ext:false },
    ],
  },
  {
    heading: "Core Businesses",
    links: [
      { label:"Ghani Global Holdings Limited",     href:"https://ghaniglobal.com",                 ext:true },
      { label:"Ghani Chemical Industries Limited", href:"https://ghaniglobal.com/ghanichemicals/", ext:true },
      { label:"Ghani Global Glass Limited",        href:"https://www.ghaniglobalglass.com",         ext:true },
      { label:"Ghani ChemWorld Limited",           href:"https://ghanichemworld.com/",              ext:true },
    ],
  },
  {
    heading: "Investor Relations",
    links: [
      { label:"Investor Relations",         href:"/investor-relations",                                                     ext:false },
      { label:"GGHL — Annual Reports",      href:"/coming-soon",                                                            ext:false },
      { label:"GCIL — Annual Reports",      href:"https://ghaniglobal.com/ghanichemicals/annual-reports-gci/",             ext:true  },
      { label:"GGGL — Investor Grievances", href:"https://www.ghaniglobal.com/ghaniglobalglass/investor-grievances/",      ext:true  },
      { label:"GCWL — Investor Relations",  href:"/coming-soon",                                                            ext:false },
    ],
  },
  {
    heading: "News & Media",
    links: [
      { label:"All News & Announcements", href:"/news", ext:false },
      { label:"Investor Relations News",  href:"/news", ext:false },
      { label:"Corporate News",           href:"/news", ext:false },
    ],
  },
  {
    heading: "Sustainability",
    links: [
      { label:"Solar Energy",          href:"/", ext:false },
      { label:"Zero Carbon Emissions", href:"/", ext:false },
      { label:"Community First",       href:"/", ext:false },
      { label:"CSR",                   href:"/", ext:false },
    ],
  },
  {
    heading: "Regulatory",
    links: [
      { label:"SECP",       href:"https://sdms.secp.gov.pk/", ext:true },
      { label:"Jama Punji", href:"https://www.jamapunji.pk/", ext:true },
      { label:"PSX",        href:"https://www.psx.com.pk/",   ext:true },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label:"Contact Us", href:"/contact",     ext:false },
      { label:"Careers",    href:"/coming-soon", ext:false },
      { label:"LinkedIn",   href:"https://www.linkedin.com/company/ghaniglobalgroup",       ext:true },
      { label:"Facebook",   href:"https://www.facebook.com/profile.php?id=61578499738385",  ext:true },
      { label:"Instagram",  href:"https://www.instagram.com/ghaniglobalgroup/",             ext:true },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh", paddingTop:"62px" }}>

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

      <section style={{ padding:"80px clamp(32px,6vw,96px)", background:"var(--bg)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 style={{ fontSize:"13px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:"var(--navy)", marginBottom:"16px", paddingBottom:"10px", borderBottom:"2px solid var(--gold)" }}>
                  {section.heading}
                </h2>
                <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                  {section.links.map((link) => (
                    <li key={link.label} style={{ marginBottom:"10px" }}>
                      <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:"var(--green)", display:"inline-block", marginRight:"8px", verticalAlign:"middle" }}/>
                      {link.ext ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:"14px", color:"var(--text2)", textDecoration:"none" }}>
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} style={{ fontSize:"14px", color:"var(--text2)", textDecoration:"none" }}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

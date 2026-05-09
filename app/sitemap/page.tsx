import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    title:"Main Pages",
    links:[
      { label:"Home",                    href:"/",                      desc:"Overview of Ghani Global Group" },
      { label:"About Us",                href:"/about",                 desc:"History, vision, mission, and milestones" },
      { label:"Portfolio",               href:"/portfolio",             desc:"Full portfolio of PSX listed and associated companies" },
      { label:"Contact Us",              href:"/contact",               desc:"Head office address, phone, email and contact form" },
    ]
  },
  {
    title:"Core Companies",
    links:[
      { label:"PSX Listed Companies",    href:"/companies/psx-listed",  desc:"GGHL, GCIL, GGL, GCWL — all publicly listed entities" },
      { label:"Associated Companies",    href:"/companies/associated",  desc:"Strategic group network across key sectors" },
    ]
  },
  {
    title:"Legal & Info",
    links:[
      { label:"Sitemap",                 href:"/sitemap",               desc:"Complete site structure" },
    ]
  },
];

export default function SitemapPage() {
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <PageHeader
        eyebrow="Navigation"
        title="Sitemap"
        breadcrumbs={[{label:"Home",href:"/"},{label:"Sitemap"}]}
      />
      <section style={{ padding:"80px clamp(32px,6vw,96px)" }}>
        <div className="max-w-5xl mx-auto space-y-14">
          {sections.map(sec=>(
            <div key={sec.title}>
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width:"24px", height:"2px", background:"var(--green)", flexShrink:0 }}/>
                <h2 className="font-display" style={{ fontSize:"13px", letterSpacing:"0.22em", textTransform:"uppercase", fontWeight:700, color:"var(--green2)" }}>{sec.title}</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {sec.links.map(lnk=>(
                  <Link key={lnk.href} href={lnk.href}
                    className="group flex items-start gap-4 p-5 transition-all"
                    style={{ background:"var(--bg2)", border:"1px solid var(--line)" }}>
                    <ArrowRight size={14} style={{ color:"var(--green)", flexShrink:0, marginTop:"3px", transition:"transform 0.2s" }}/>
                    <div>
                      <p style={{ fontSize:"14px", fontWeight:700, color:"var(--navy)", marginBottom:"4px" }}>{lnk.label}</p>
                      <p style={{ fontSize:"12px", color:"var(--text2)", lineHeight:1.5 }}>{lnk.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

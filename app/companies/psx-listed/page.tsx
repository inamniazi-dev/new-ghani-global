"use client";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const companies = [
  {
    name:"Ghani Global Holdings Limited",
    ticker:"GGHL",
    tag:"Principal Holding",
    desc:"The principal holding company managing strategic investments across the group portfolio, listed on the Pakistan Stock Exchange.",
  },
  {
    name:"Ghani Chemical Industries Limited",
    ticker:"GCIL",
    tag:"Industrial Gases",
    desc:"Medical & industrial gases and chemicals serving hospitals, factories, and research institutions across Pakistan.",
    holding:"55.96% held by GGHL",
    website:"https://ghaniglobal.com/ghanichemicals/",
  },
  {
    name:"Ghani Global Glass Limited",
    ticker:"GGL",
    tag:"Manufacturing",
    desc:"We are the sole manufacturer of glass tubing in Pakistan, which covers almost the entire pharmaceutical industry in Pakistan as our client base.",
    holding:"50.10% held by GGHL",
    website:"https://www.ghaniglobalglass.com",
  },
  {
    name:"Ghani ChemWorld Limited",
    ticker:"GCWL",
    tag:"Specialty Chemicals",
    desc:"Calcium Carbide Project at Hattar Special Economic Zone — a strategic venture in specialty chemicals incorporated July 31, 2024.",
    holding:"Subsidiary of GGHL",
  },
];

export default function PSXPage() {
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <PageHeader
        eyebrow="Our Portfolio"
        title="PSX Listed Companies"
        breadcrumbs={[{label:"Home",href:"/"},{label:"PSX Listed Companies"}]}
      />
      <section style={{ padding:"64px clamp(32px,6vw,96px)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companies.map(c=>(
              <div key={c.ticker} className="p-8" style={{ background:"white", border:"1px solid var(--line)", boxShadow:"0 2px 12px rgba(1,8,44,0.05)" }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span style={{ fontSize:"9px", letterSpacing:"0.22em", textTransform:"uppercase", fontWeight:700, padding:"3px 8px", background:"rgba(164,199,61,0.12)", color:"var(--green2)", border:"1px solid rgba(164,199,61,0.3)", display:"inline-block", marginBottom:"10px" }}>{c.tag}</span>
                    <h3 className="font-display font-normal" style={{ fontSize:"20px", color:"var(--navy)", lineHeight:1.2 }}>{c.name}</h3>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <p style={{ fontSize:"10px", color:"var(--text2)", letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600 }}>PSX</p>
                    <p style={{ fontSize:"22px", fontWeight:700, color:"var(--green2)" }}>{c.ticker}</p>
                  </div>
                </div>
                <p style={{ fontSize:"14px", color:"var(--text2)", lineHeight:1.75, marginBottom:"14px" }}>{c.desc}</p>
                {c.holding && (
                  <p style={{ fontSize:"11px", letterSpacing:"0.1em", color:"var(--text2)", textTransform:"uppercase", fontWeight:600, marginBottom:"14px" }}>{c.holding}</p>
                )}
                {c.website && (
                  <a href={c.website} target="_blank" rel="noopener noreferrer" style={{ fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:700, color:"var(--green2)", display:"inline-flex", alignItems:"center", gap:"8px" }}>
                    Visit Website <ExternalLink size={12}/>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

const associated = [
  { name:"Air Ghani (Pvt) Limited",               sector:"Aviation & Gases" },
  { name:"Ghani Logistics (Pvt) Limited",         sector:"Logistics" },
  { name:"Ghani Energies Limited",                sector:"Energy" },
  { name:"Ghani Gases (Private) Limited",         sector:"Industrial Gases" },
  { name:"G3 Properties (Pvt) Limited",           sector:"Real Estate" },
  { name:"Ghani Engineering (Pvt) Limited",       sector:"Engineering" },
  { name:"Ghani Global Foods (Pvt) Limited",      sector:"Food & Agri" },
  { name:"Ghani Industrial Complex (Pvt) Ltd",    sector:"Infrastructure" },
  { name:"Kaya Projects (Pvt) Limited",           sector:"Projects" },
  { name:"Killowatt Labs Technologies Limited",   sector:"Technology" },
];

export default function AssociatedPage() {
  return (
    <div style={{ background:"var(--bg)", minHeight:"100vh" }}>
      <PageHeader
        eyebrow="Group Network"
        title="Associated Companies"
        breadcrumbs={[{label:"Home",href:"/"},{label:"Associated Companies"}]}
      />
      <section style={{ padding:"64px clamp(32px,6vw,96px)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p style={{ fontSize:"16px", lineHeight:1.85, color:"var(--text2)" }}>
              Ghani Global Holdings Limited maintains strategic associations with {associated.length} companies across Pakistan, spanning aviation, logistics, energy, real estate, food, infrastructure, and technology.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {associated.map(c=>(
              <div key={c.name} className="p-6" style={{ background:"white", border:"1px solid var(--line)", boxShadow:"0 1px 6px rgba(1,8,44,0.04)", transition:"box-shadow 0.2s, transform 0.2s" }}>
                <span style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, padding:"3px 8px", background:"rgba(164,199,61,0.1)", color:"var(--green2)", border:"1px solid rgba(164,199,61,0.25)", display:"inline-block", marginBottom:"12px" }}>{c.sector}</span>
                <h3 className="font-display font-normal" style={{ fontSize:"15px", color:"var(--navy)", lineHeight:1.35 }}>{c.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

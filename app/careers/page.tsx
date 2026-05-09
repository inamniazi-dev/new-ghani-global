import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title:"Careers" };

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers"
        subtitle="Join Pakistan's leading industrial conglomerate. Explore opportunities across our group companies."
        breadcrumb={[{ label:"Home", href:"/" }, { label:"Careers" }]}
      />
      <section style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg)" }}>
        <div style={{ textAlign:"center", padding:"80px 32px" }}>
          <div style={{ fontSize:"48px", marginBottom:"24px" }}>💼</div>
          <h2 style={{ fontSize:"clamp(24px,3vw,36px)", fontWeight:300, color:"var(--navy)", marginBottom:"16px" }}>
            Coming Soon
          </h2>
          <p style={{ fontSize:"16px", color:"var(--text2)", maxWidth:"480px", margin:"0 auto", lineHeight:1.75 }}>
            Our Careers portal is under development. Current openings and LinkedIn posts will be available here soon.
          </p>
        </div>
      </section>
    </>
  );
}

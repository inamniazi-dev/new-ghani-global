import Link from "next/link";
type Crumb = { label:string; href?:string };
export default function PageHeader({ eyebrow, title, subtitle, breadcrumbs }:{
  eyebrow?:string; title:string; subtitle?:string; breadcrumbs?:Crumb[];
}) {
  return (
    <>
      <div className="page-header">
        <div style={{ maxWidth:"900px" }}>
          {eyebrow && <div className="eyebrow mb-5"><span>{eyebrow}</span></div>}
          <h1 className="font-display" style={{ fontSize:"clamp(34px,5vw,60px)", fontWeight:300, color:"white", lineHeight:1.05 }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 font-light" style={{ fontSize:"15px", color:"rgba(255,255,255,0.65)", lineHeight:1.75, maxWidth:"560px" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {breadcrumbs && (
        <div style={{ background:"var(--blue2)", borderBottom:"1px solid rgba(164,199,61,0.15)", padding:"11px clamp(32px,6vw,96px)" }}>
          <div className="flex flex-wrap gap-2 text-[11px] tracking-[0.06em]" style={{ color:"rgba(255,255,255,0.4)" }}>
            {breadcrumbs.map((c,i)=>(
              <span key={c.label} className="flex items-center gap-2">
                {i>0&&<span style={{ opacity:0.4 }}>/</span>}
                {c.href
                  ? <Link href={c.href} className="page-link">{c.label}</Link>
                  : <span style={{ color:"var(--gold)" }}>{c.label}</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

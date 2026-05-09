export default function InfoCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{ background:"var(--bg)", border:"1px solid var(--line)", padding:"36px", boxShadow:"0 2px 12px rgba(1,8,44,0.04)" }}>
      {title && (
        <>
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width:"24px", height:"2px", background:"var(--gold)", flexShrink:0 }}/>
            <h2 className="font-display font-normal" style={{ fontSize:"22px", color:"var(--navy)", letterSpacing:"-0.005em" }}>{title}</h2>
          </div>
        </>
      )}
      {children}
    </div>
  );
}

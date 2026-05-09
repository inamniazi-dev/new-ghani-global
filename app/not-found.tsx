import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8" style={{background:"var(--bg2)",paddingTop:"72px"}}>
      <div className="text-center">
        <p className="font-display mb-4" style={{fontSize:"120px",fontWeight:300,color:"rgba(1,8,44,0.08)",lineHeight:1}}>404</p>
        <h1 className="font-display text-3xl font-light mb-3" style={{color:"var(--blue)"}}>Page Not Found</h1>
        <p className="text-sm font-light mb-8 max-w-xs mx-auto" style={{color:"rgba(1,8,44,0.5)",lineHeight:1.7}}>The page you are looking for does not exist or may have moved.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-blue">Go Home</Link>
          <Link href="/sitemap" className="btn-outline">Site Map</Link>
        </div>
      </div>
    </div>
  );
}

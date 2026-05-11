"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const nav: any[] = [
  { label:"About Us",           href:"/about" },
  { label:"Core Businesses", children:[
    { label:"Ghani Global Holdings Limited",     href:"https://ghaniglobal.com",                 ext:true },
    { label:"Ghani Chemical Industries Limited", href:"https://ghaniglobal.com/ghanichemicals/", ext:true },
    { label:"Ghani Global Glass Limited",        href:"https://www.ghaniglobalglass.com",         ext:true },
    { label:"Ghani ChemWorld Limited",           href:"https://ghaniglobal.com",                 ext:true },
  ]},
  { label:"Investor Relations", href:"/investor-relations" },
  { label:"News & Media",       href:"/news" },
  { label:"Careers",            href:"/coming-soon" },
];

const pages = [
  { label:"Home",                              href:"/" },
  { label:"About Us",                          href:"/about" },
  { label:"Investor Relations",                href:"/investor-relations" },
  { label:"Contact Us",                        href:"/contact" },
  { label:"Ghani Global Holdings Limited",     href:"#" },
  { label:"Ghani Chemical Industries Limited", href:"#" },
  { label:"Ghani Global Glass Limited",        href:"#" },
  { label:"Ghani ChemWorld Limited",           href:"#" },
];

const LANGUAGES = [
  { code:"en",    label:"English",              flag:"🇬🇧" },
  { code:"ur",    label:"اردو",                 flag:"🇵🇰" },
  { code:"ar",    label:"Arabic",               flag:"🇸🇦" },
  { code:"zh-CN", label:"Chinese (Simplified)", flag:"🇨🇳" },
  { code:"nl",    label:"Dutch",                flag:"🇳🇱" },
  { code:"fr",    label:"French",               flag:"🇫🇷" },
  { code:"de",    label:"German",               flag:"🇩🇪" },
  { code:"it",    label:"Italian",              flag:"🇮🇹" },
  { code:"pt",    label:"Portuguese",           flag:"🇵🇹" },
  { code:"ru",    label:"Russian",              flag:"🇷🇺" },
  { code:"es",    label:"Spanish",              flag:"🇪🇸" },
  { code:"tr",    label:"Turkish",              flag:"🇹🇷" },
];

export default function Navbar() {
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeMenu,  setActiveMenu]  = useState<string|null>(null);
  const [mobileSub,   setMobileSub]   = useState<string|null>(null);
  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen,    setLangOpen]    = useState(false);
  const [lang,        setLang]        = useState("en");
  const searchRef   = useRef<HTMLInputElement>(null);
  const pathname    = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchOpen]);

  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      const wrap = document.querySelector(".lang-dropdown-wrap");
      if (wrap && !wrap.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  function switchLanguage(l: string) {
    setLang(l);
    if (l === "en") {
      // Reset to English — clear cookies and reload
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
      window.location.reload();
      return;
    }
    // Set translation cookie
    document.cookie = `googtrans=/en/${l}; path=/`;
    document.cookie = `googtrans=/en/${l}; path=/; domain=` + window.location.hostname;
    document.cookie = `googtrans=/en/${l}; path=/; domain=.` + window.location.hostname;
    // Try to trigger via combo select
    const sel = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (sel) {
      sel.value = l;
      sel.dispatchEvent(new Event("change"));
    } else {
      // Fallback — reload with cookie set
      window.location.reload();
    }
  }

  const filtered = searchQuery.length > 1
    ? pages.filter(p => p.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <header
        style={{
          position:"fixed", top:"0", left:0, right:0, zIndex:50, width:"100%",
          background:"linear-gradient(135deg, rgba(1,8,44,0.97) 0%, rgba(2,14,60,0.95) 100%)",
          backdropFilter:"blur(20px)",
          padding: "12px clamp(16px,3vw,48px)",
          transition:"box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 4px 24px rgba(1,8,44,0.4)" : "none",
        }}
      >
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", gap:"12px", position:"relative" }}>

          {/* Full-width search overlay */}
          {searchOpen && (
            <div style={{
              position:"absolute", top:"50%", left:0, right:0,
              transform:"translateY(-50%)",
              display:"flex", alignItems:"center", gap:"12px",
              background:"rgba(1,8,44,0.97)",
              backdropFilter:"blur(24px) saturate(1.8)",
              WebkitBackdropFilter:"blur(24px) saturate(1.8)",
              border:"1px solid rgba(211,184,59,0.3)",
              borderRadius:"10px",
              padding:"0 20px",
              height:"52px",
              zIndex:100,
            }}>
              <Search size={16} style={{ color:"var(--gold)", flexShrink:0 }}/>
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={e=>setSearchQuery(e.target.value)}
                placeholder="Search pages, companies..."
                style={{ flex:1, background:"none", border:"none", outline:"none", color:"white", fontSize:"14px", fontFamily:"Maven Pro, sans-serif" }}
              />
              <button
                onClick={()=>{ setSearchOpen(false); setSearchQuery(""); }}
                style={{ width:"32px", height:"32px", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"50%", color:"rgba(255,255,255,0.7)", cursor:"pointer", flexShrink:0 }}>
                <X size={14}/>
              </button>
              {filtered.length > 0 && (
                <div style={{ position:"absolute", top:"calc(100% + 8px)", left:0, right:0, background:"rgba(1,8,44,0.97)", backdropFilter:"blur(32px)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"16px", overflow:"hidden", boxShadow:"0 20px 60px rgba(1,8,44,0.5)", zIndex:200 }}>
                  {filtered.map(p=>(
                    <Link key={p.label} href={p.href} onClick={()=>{ setSearchOpen(false); setSearchQuery(""); }}
                      style={{ display:"block", padding:"11px 20px", fontSize:"13px", color:"rgba(255,255,255,0.75)", borderBottom:"1px solid rgba(255,255,255,0.05)", transition:"background 0.2s" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="rgba(211,184,59,0.08)")}
                      onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Logo */}
          <Link href="/" style={{ display:"flex", alignItems:"center", flexShrink:0, zIndex:1 }}>
            <img src="/logo-header.png" alt="Ghani Global Group" style={{ height:"38px", width:"auto", display:"block" }}/>
          </Link>

          {/* Nav links — desktop */}
          <div style={{
            alignItems:"center", flex:"0 1 auto",
            gap:"2px", zIndex:1,
            background:"rgba(255,255,255,0.08)",
            backdropFilter:"blur(20px)",
            border:"1px solid rgba(255,255,255,0.15)",
            borderRadius:"14px",
            padding:"6px 8px",
          }} className="lg-nav">
            {nav.map((item) => {
              const hasChildren = !!item.children;
              const isActive    = !hasChildren && (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));
              if (hasChildren) {
                return (
                  <div key={item.label} style={{ position:"relative" }}
                    onMouseEnter={()=>setActiveMenu(item.label)}
                    onMouseLeave={()=>setActiveMenu(null)}>
                    <button style={{
                      display:"flex", alignItems:"center", gap:"4px",
                      padding:"7px 14px", borderRadius:"8px", border:"none",
                      background: activeMenu===item.label ? "rgba(255,255,255,0.12)" : "transparent",
                      color:"rgba(255,255,255,0.9)", cursor:"pointer",
                      fontSize:"clamp(10px,0.85vw,12px)", fontWeight:600,
                      letterSpacing:"0.08em", textTransform:"uppercase",
                      fontFamily:"Maven Pro, sans-serif", whiteSpace:"nowrap", transition:"all 0.2s",
                    }}>
                      <span>{item.label}</span>
                      <ChevronDown size={10} style={{ opacity:0.6, transform:activeMenu===item.label?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.2s" }}/>
                    </button>
                    {activeMenu===item.label && (
                      <div style={{ position:"absolute", top:"100%", left:"50%", transform:"translateX(-50%)", zIndex:50, minWidth:"270px", paddingTop:"10px" }}>
                        <div style={{
                          background:"rgba(1,8,44,0.95)",
                          backdropFilter:"blur(40px) saturate(2)",
                          WebkitBackdropFilter:"blur(40px) saturate(2)",
                          border:"1px solid rgba(255,255,255,0.12)",
                          boxShadow:"0 24px 64px rgba(1,8,44,0.6)",
                          borderRadius:"16px", overflow:"hidden", padding:"6px",
                        }}>
                          {item.children.map((c:any)=>(
                            <a key={c.label} href={c.href}
                              target={c.ext ? "_blank" : undefined}
                              rel={c.ext ? "noopener noreferrer" : undefined}
                              style={{ display:"block", padding:"10px 14px", borderRadius:"8px", fontSize:"12px", color:"rgba(255,255,255,0.88)", fontWeight:500, transition:"all 0.2s", marginBottom:"2px", textDecoration:"none" }}
                              onMouseEnter={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="rgba(255,255,255,0.1)"; el.style.color="white"; }}
                              onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.color="rgba(255,255,255,0.88)"; }}>
                              {c.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link key={item.label} href={item.href}
                  style={{
                    display:"flex", alignItems:"center", padding:"7px 14px", borderRadius:"8px",
                    fontSize:"clamp(10px,0.85vw,12px)", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase",
                    color: isActive ? "var(--gold)" : "rgba(255,255,255,0.9)",
                    background: isActive ? "rgba(211,184,59,0.15)" : "transparent",
                    textDecoration:"none", whiteSpace:"nowrap", transition:"all 0.2s",
                  }}
                  onMouseEnter={e=>{ if(!isActive){ const el=e.currentTarget as HTMLElement; el.style.background="rgba(255,255,255,0.12)"; el.style.color="white"; }}}
                  onMouseLeave={e=>{ if(!isActive){ const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.color="rgba(255,255,255,0.9)"; }}}>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right controls */}
          <div style={{ alignItems:"center", gap:"8px", flexShrink:0, zIndex:1, justifyContent:"flex-end" }} className="lg-flex">
            <button onClick={()=>setSearchOpen(true)}
              style={{ width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.1)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"50%", color:"rgba(255,255,255,0.8)", cursor:"pointer", transition:"all 0.2s", flexShrink:0 }}
              onMouseEnter={e=>{const el=e.currentTarget; el.style.borderColor="var(--gold)"; el.style.color="var(--gold)";}}
              onMouseLeave={e=>{const el=e.currentTarget; el.style.borderColor="rgba(255,255,255,0.2)"; el.style.color="rgba(255,255,255,0.8)";}}>
              <Search size={14}/>
            </button>

            <div style={{ position:"relative", flexShrink:0 }} className="lang-dropdown-wrap">
              <button onClick={()=>setLangOpen(!langOpen)}
                style={{ display:"flex", alignItems:"center", gap:"6px", padding:"7px 12px", background:"rgba(255,255,255,0.1)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"10px", color:"rgba(255,255,255,0.85)", cursor:"pointer", fontSize:"11px", fontWeight:700, letterSpacing:"0.08em", fontFamily:"Maven Pro, sans-serif", transition:"all 0.2s", whiteSpace:"nowrap" }}
                onMouseEnter={e=>{const el=e.currentTarget; el.style.borderColor="var(--gold)"; el.style.color="var(--gold)";}}
                onMouseLeave={e=>{const el=e.currentTarget; el.style.borderColor="rgba(255,255,255,0.2)"; el.style.color="rgba(255,255,255,0.85)";}}>
                <span>🌐</span>
                <span>{LANGUAGES.find(l=>l.code===lang)?.label ?? "English"}</span>
                <ChevronDown size={10} style={{ opacity:0.6, transform:langOpen?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.2s" }}/>
              </button>
              {langOpen && (
                <div style={{ position:"absolute", top:"calc(100% + 8px)", right:0, background:"rgba(1,8,44,0.95)", backdropFilter:"blur(40px) saturate(2)", WebkitBackdropFilter:"blur(40px) saturate(2)", border:"1px solid rgba(255,255,255,0.12)", boxShadow:"0 24px 64px rgba(1,8,44,0.6)", borderRadius:"16px", overflow:"hidden", minWidth:"160px", zIndex:100, padding:"6px" }}>
                  {LANGUAGES.map(l => (
                    <button key={l.code} onClick={()=>{ switchLanguage(l.code); setLangOpen(false); }}
                      style={{ display:"flex", alignItems:"center", gap:"8px", width:"100%", padding:"8px 12px", borderRadius:"10px", background: lang===l.code ? "rgba(211,184,59,0.15)" : "transparent", border:"none", color: lang===l.code ? "var(--gold)" : "rgba(255,255,255,0.8)", fontSize:"12px", cursor:"pointer", fontFamily:"Maven Pro, sans-serif", textAlign:"left", transition:"background 0.2s", marginBottom:"2px" }}
                      onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.1)")}
                      onMouseLeave={e=>(e.currentTarget.style.background=lang===l.code?"rgba(211,184,59,0.15)":"transparent")}>
                      <span style={{ fontSize:"14px" }}>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact"
              style={{ display:"flex", alignItems:"center", padding:"8px 18px", background:"var(--gold)", borderRadius:"10px", color:"var(--navy)", fontSize:"clamp(10px,0.85vw,12px)", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", textDecoration:"none", whiteSpace:"nowrap", flexShrink:0, transition:"all 0.2s" }}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLElement; el.style.background="var(--green)"; el.style.color="white";}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLElement; el.style.background="var(--gold)"; el.style.color="var(--navy)";}}>
              Get In Touch
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={()=>setMobileOpen(!mobileOpen)} className="lg:hidden p-1.5"
            style={{ color:"rgba(255,255,255,0.9)", background:"rgba(255,255,255,0.1)", backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"8px", cursor:"pointer", flexShrink:0, zIndex:1, justifySelf:"end" }}>
            {mobileOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        {/* Mobile slide-down */}
        <div style={{ overflow:"hidden", maxHeight:mobileOpen?"600px":"0", transition:"max-height 0.4s cubic-bezier(0.22,1,0.36,1)", background:"rgba(1,8,44,0.95)", backdropFilter:"blur(40px) saturate(2)", WebkitBackdropFilter:"blur(40px) saturate(2)", border:mobileOpen?"1px solid rgba(255,255,255,0.12)":"none", borderRadius:"16px", marginTop:mobileOpen?"10px":"0" }}>
          <div style={{ padding:"16px 20px 20px" }}>
            {nav.map((item:any) => {
              if (item.children) {
                const open = mobileSub === item.label;
                return (
                  <div key={item.label}>
                    <button onClick={()=>setMobileSub(open?null:item.label)}
                      style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", padding:"11px 0", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.75)", background:"none", border:"none", borderBottom:"1px solid rgba(255,255,255,0.08)", cursor:"pointer", fontFamily:"Maven Pro, sans-serif" }}>
                      <span>{item.label}</span>
                      <ChevronDown size={11} style={{ transform:open?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.2s" }}/>
                    </button>
                    <div style={{ overflow:"hidden", maxHeight:open?"280px":"0", transition:"max-height 0.3s ease" }}>
                      <div style={{ paddingLeft:"12px", paddingTop:"6px", paddingBottom:"6px" }}>
                        {item.children.map((c:any)=>(
                          <a key={c.label} href={c.href} onClick={()=>setMobileOpen(false)}
                            style={{ display:"block", padding:"8px 0", fontSize:"11px", color:"rgba(255,255,255,0.75)", borderBottom:"1px solid rgba(255,255,255,0.06)", textDecoration:"none" }}>
                            {c.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={item.label} href={item.href} onClick={()=>setMobileOpen(false)}
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 0", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.75)", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
                  {item.label}
                </Link>
              );
            })}
            <div style={{ paddingTop:"14px" }}>
              <p style={{ fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:"8px", fontWeight:700 }}>Language</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                {LANGUAGES.map(l => (
                  <button key={l.code} onClick={()=>{ switchLanguage(l.code); setMobileOpen(false); }}
                    style={{ padding:"5px 10px", fontSize:"11px", fontWeight:600, border:"1px solid rgba(255,255,255,0.15)", background:lang===l.code?"var(--gold)":"transparent", color:lang===l.code?"var(--navy)":"rgba(255,255,255,0.6)", cursor:"pointer", fontFamily:"Maven Pro, sans-serif", borderRadius:"6px", display:"flex", alignItems:"center", gap:"4px" }}>
                    <span>{l.flag}</span><span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link href="/contact" onClick={()=>setMobileOpen(false)}
              style={{ display:"block", textAlign:"center", padding:"11px", fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", background:"var(--gold)", color:"var(--navy)", fontWeight:700, borderRadius:"10px", marginTop:"12px", textDecoration:"none" }}>
              Get In Touch
            </Link>
          </div>
        </div>
      </header>

      <style>{`
        .lg-nav { display: none; }
        .lg-flex { display: none; }
        @media (min-width: 1024px) {
          .lg-nav { display: flex !important; }
          .lg-flex { display: flex !important; }
        }
      `}</style>
    </>
  );
}

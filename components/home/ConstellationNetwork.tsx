"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const PSX = [
  { id:"GGHL", name:"Ghani Global Holdings Limited",     ticker:"GGHL", sector:"Principal Holding"   },
  { id:"GCIL", name:"Ghani Chemical Industries Limited", ticker:"GCIL", sector:"Industrial Gases"    },
  { id:"GGGL", name:"Ghani Global Glass Limited",        ticker:"GGGL", sector:"Manufacturing"       },
  { id:"GCWL", name:"Ghani ChemWorld Limited",           ticker:"GCWL", sector:"Specialty Chemicals" },
];

const ASSOC = [
  { id:"ag",   name:"Air Ghani (Pvt) Limited",             sector:"Aviation & Gases"   },
  { id:"gl",   name:"Ghani Logistics (Pvt) Limited",       sector:"Logistics"          },
  { id:"ge",   name:"Ghani Energies Limited",              sector:"Energy"             },
  { id:"gg",   name:"Ghani Gases (Pvt) Limited",           sector:"Industrial Gases"   },
  { id:"g3",   name:"G3 Properties (Pvt) Limited",         sector:"Real Estate"        },
  { id:"geng", name:"Ghani Engineering (Pvt) Limited",     sector:"Engineering"        },
  { id:"gf",   name:"Ghani Global Foods (Pvt) Limited",    sector:"Food & Agriculture" },
  { id:"gi",   name:"Ghani Industrial Complex (Pvt) Ltd",  sector:"Infrastructure"     },
  { id:"kp",   name:"Kaya Projects (Pvt) Limited",         sector:"Projects"           },
  { id:"kl",   name:"Killowatt Labs Technologies Limited",  sector:"Technology"         },
  { id:"rl",   name:"Reit Limited",                        sector:"Real Estate"        },
];

const GOLD  = "#d3b83b";
const GREEN = "#a4c73d";
const NAVY  = "#01082c";



export default function ConstellationNetwork() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const logoRef    = useRef<HTMLImageElement|null>(null);
  const rafRef     = useRef<number>(0);
  const hovRef     = useRef<{ ring:"psx"|"assoc"|null; idx:number }>({ ring:null, idx:-1 });
  const rotRef     = useRef<number>(0);
  const pauseRef   = useRef<boolean>(false);
  const dimsRef    = useRef({ W:0, H:0, cx:0, cy:0, coreR:0, psxInner:0, psxOuter:0, assocInner:0, assocOuter:0 });

  const [hovered,    setHovered]    = useState<{ name:string; sector:string; ticker?:string; isPsx:boolean }|null>(null);
  const [tipPos,     setTipPos]     = useState({ x:0, y:0 });
  const [activeTab,  setActiveTab]  = useState<"psx"|"assoc">("psx");


  useEffect(() => {
    const img = new Image();
    img.src = "/logo-new.png";
    img.onload = () => { logoRef.current = img; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      const W = canvas!.width  = rect.width;
      const H = canvas!.height = rect.height;
      const cx = W / 2;
      const cy = H / 2;
      const base = Math.min(W * 0.46, H * 0.46);
      dimsRef.current = {
        W, H, cx, cy,
        coreR:      base * 0.28,
        psxInner:   base * 0.24,
        psxOuter:   base * 0.58,
        assocInner: base * 0.62,
        assocOuter: base * 0.99,
      };
    }

    function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
      ctx.font = `600 ${fontSize}px Maven Pro, sans-serif`;
      const words = text.split(" ");
      const lines: string[] = [];
      let cur = "";
      for (const w of words) {
        const test = cur ? cur + " " + w : w;
        if (ctx.measureText(test).width > maxWidth && cur) { lines.push(cur); cur = w; }
        else cur = test;
      }
      if (cur) lines.push(cur);
      return lines;
    }

    function drawLines(lines: string[], tx: number, ty: number, fontSize: number, color: string, bold = false) {
      ctx.font = `${bold ? "700" : "600"} ${fontSize}px Maven Pro, sans-serif`;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const lh = fontSize * 1.35;
      const startY = ty - ((lines.length - 1) * lh) / 2;
      lines.forEach((line, i) => ctx.fillText(line, tx, startY + i * lh));
    }

    function drawArc(cx: number, cy: number, r1: number, r2: number, a1: number, a2: number, fill: string, stroke: string, lw: number) {
      ctx.beginPath();
      ctx.arc(cx, cy, r2, a1, a2);
      ctx.arc(cx, cy, r1, a2, a1, true);
      ctx.closePath();
      ctx.fillStyle = fill; ctx.fill();
      ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke();
    }

    function animate() {
      const d = dimsRef.current;
      if (!d.W) { rafRef.current = requestAnimationFrame(animate); return; }
      const { W, H, cx, cy, coreR, psxInner, psxOuter, assocInner, assocOuter } = d;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = NAVY;
      ctx.fillRect(0, 0, W, H);

      // Dot grid background
      ctx.fillStyle = "rgba(164,199,61,0.04)";
      for (let gx = 0; gx < W; gx += 60)
        for (let gy = 0; gy < H; gy += 60) {
          ctx.beginPath(); ctx.arc(gx, gy, 0.8, 0, Math.PI * 2); ctx.fill();
        }

      if (!pauseRef.current) rotRef.current += 0.0008;
      const rot = rotRef.current;
      const hov = hovRef.current;

      const psxArc   = (Math.PI * 2) / 4;
      const assocArc = (Math.PI * 2) / 11;

      // Adaptive font sizes based on available band width
      const psxFontSize   = Math.max(7,  Math.min(13, (psxOuter - psxInner) * 0.13));
      const assocFontSize = Math.max(6.5, Math.min(11, (assocOuter - assocInner) * 0.11));
      const psxBandW      = (psxOuter - psxInner) * 0.75;
      const assocBandW    = (assocOuter - assocInner) * 0.72;

      // ── PSX RING ──
      PSX.forEach((p, i) => {
        const a1  = rot + i * psxArc - Math.PI / 2;
        const a2  = a1 + psxArc - 0.025;
        const mid = a1 + psxArc / 2;
        const isHov = hov.ring === "psx" && hov.idx === i;

        drawArc(cx, cy, psxInner, psxOuter, a1, a2,
          isHov ? "rgba(211,184,59,0.28)" : "rgba(211,184,59,0.07)",
          isHov ? GOLD : "rgba(211,184,59,0.38)",
          isHov ? 2 : 1
        );

        // Outer glow arc on hover
        if (isHov) {
          ctx.beginPath();
          ctx.arc(cx, cy, psxOuter + 4, a1 + 0.02, a2 - 0.02);
          ctx.strokeStyle = "rgba(211,184,59,0.55)";
          ctx.lineWidth = 3; ctx.stroke();
        }

        const labelR = psxInner + (psxOuter - psxInner) * 0.5;
        const lx = cx + labelR * Math.cos(mid);
        const ly = cy + labelR * Math.sin(mid);
        const lines = wrapText(p.name, psxBandW, psxFontSize);
        drawLines(lines, lx, ly, psxFontSize, isHov ? "white" : "rgba(255,255,255,0.88)", true);
      });

      // ── ASSOC RING ──
      ASSOC.forEach((a, i) => {
        const a1  = rot + i * assocArc - Math.PI / 2;
        const a2  = a1 + assocArc - 0.018;
        const mid = a1 + assocArc / 2;
        const isHov = hov.ring === "assoc" && hov.idx === i;

        drawArc(cx, cy, assocInner, assocOuter, a1, a2,
          isHov ? "rgba(164,199,61,0.22)" : "rgba(164,199,61,0.05)",
          isHov ? GREEN : "rgba(164,199,61,0.25)",
          isHov ? 1.8 : 0.7
        );

        const labelR = assocInner + (assocOuter - assocInner) * 0.5;
        const lx = cx + labelR * Math.cos(mid);
        const ly = cy + labelR * Math.sin(mid);
        const lines = wrapText(a.name, assocBandW, assocFontSize);
        drawLines(lines, lx, ly, assocFontSize, isHov ? "white" : "rgba(164,199,61,0.88)");
      });

      // Ring borders
      ([
        [psxInner,   "rgba(211,184,59,0.18)"],
        [psxOuter,   "rgba(211,184,59,0.35)"],
        [assocInner, "rgba(164,199,61,0.18)"],
        [assocOuter, "rgba(164,199,61,0.25)"],
      ] as [number, string][]).forEach(([r, color]) => {
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.stroke();
      });

      // Gap between rings
      const gapMid = (psxOuter + assocInner) / 2;
      const gapW   = assocInner - psxOuter;
      ctx.beginPath(); ctx.arc(cx, cy, gapMid, 0, Math.PI * 2);
      ctx.strokeStyle = NAVY; ctx.lineWidth = gapW - 2; ctx.stroke();

      // Core glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.2);
      glow.addColorStop(0, "rgba(211,184,59,0.18)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath(); ctx.arc(cx, cy, coreR * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = glow; ctx.fill();

      // Core circle
      ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(1,8,44,0.97)"; ctx.fill();
      ctx.strokeStyle = GOLD; ctx.lineWidth = 2.5; ctx.stroke();

      // Logo
      const logo = logoRef.current;
      if (logo && logo.complete) {
        const ls = coreR * 1.65;
        ctx.save();
        ctx.beginPath(); ctx.arc(cx, cy, coreR - 3, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(logo, cx - ls / 2, cy - ls / 2, ls, ls);
        ctx.restore();
      } else {
        ctx.fillStyle = GOLD; ctx.font = `bold ${Math.max(12, coreR * 0.18)}px Maven Pro,sans-serif`;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("G³", cx, cy);
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  // Shared hit-test logic for both mouse and touch
  const hitTest = useCallback((clientX: number, clientY: number) => {
    const d = dimsRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    const dx = mx - d.cx, dy = my - d.cy;
    const dist  = Math.sqrt(dx * dx + dy * dy);
    const angle = ((Math.atan2(dy, dx) + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2));

    if (dist >= d.psxInner && dist <= d.psxOuter) {
      const norm = ((angle - rotRef.current) % (Math.PI*2) + Math.PI*2) % (Math.PI*2);
      const idx  = Math.floor(norm / ((Math.PI * 2) / 4)) % 4;
      return { ring:"psx" as const, idx, mx, my };
    } else if (dist >= d.assocInner && dist <= d.assocOuter) {
      const norm = ((angle - rotRef.current) % (Math.PI*2) + Math.PI*2) % (Math.PI*2);
      const idx  = Math.floor(norm / ((Math.PI * 2) / 11)) % 11;
      return { ring:"assoc" as const, idx, mx, my };
    }
    return null;
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const hit = hitTest(e.clientX, e.clientY);
    if (hit) {
      hovRef.current = { ring: hit.ring, idx: hit.idx };
      if (hit.ring === "psx") {
        setHovered({ name: PSX[hit.idx].name, sector: PSX[hit.idx].sector, ticker: PSX[hit.idx].ticker, isPsx: true });
      } else {
        setHovered({ name: ASSOC[hit.idx].name, sector: ASSOC[hit.idx].sector, isPsx: false });
      }
      setTipPos({ x: hit.mx, y: hit.my });
      canvasRef.current!.style.cursor = "pointer";
    } else {
      hovRef.current = { ring: null, idx: -1 };
      setHovered(null);
      canvasRef.current!.style.cursor = "default";
    }
  }

  // Touch support for tablet canvas
  function handleTouchStart(e: React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault();
    pauseRef.current = true;
    const touch = e.touches[0];
    const hit = hitTest(touch.clientX, touch.clientY);
    if (hit) {
      hovRef.current = { ring: hit.ring, idx: hit.idx };
      if (hit.ring === "psx") {
        setHovered({ name: PSX[hit.idx].name, sector: PSX[hit.idx].sector, ticker: PSX[hit.idx].ticker, isPsx: true });
      } else {
        setHovered({ name: ASSOC[hit.idx].name, sector: ASSOC[hit.idx].sector, isPsx: false });
      }
      setTipPos({ x: hit.mx, y: hit.my });
    } else {
      hovRef.current = { ring: null, idx: -1 };
      setHovered(null);
    }
  }

  function handleTouchEnd() {
    pauseRef.current = false;
    setTimeout(() => {
      hovRef.current = { ring: null, idx: -1 };
      setHovered(null);
    }, 1800);
  }

  function handleMouseLeave() { hovRef.current = { ring:null, idx:-1 }; setHovered(null); pauseRef.current = false; }
  function handleMouseEnter() { pauseRef.current = true; }



  return (
    <section style={{ background: NAVY, position: "relative", overflow: "hidden" }} className="ecosystem-section">

      {/* Grid background */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"linear-gradient(rgba(164,199,61,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(164,199,61,0.025) 1px,transparent 1px)",
        backgroundSize:"60px 60px", pointerEvents:"none",
      }}/>

      {/* ── HEADER ── */}
      <div className="ecosystem-header">
        <div className="ecosystem-header-inner">
          <div className="reveal">
            <div className="eyebrow" style={{ marginBottom:"8px" }}>Group Ecosystem</div>
            <h2 className="font-display" style={{ fontSize:"clamp(18px,2vw,30px)", fontWeight:300, color:"white", lineHeight:1.05 }}>
              Our Companies, <em style={{ fontStyle:"italic", color:GOLD }}>at a Glance</em>
            </h2>
          </div>
          <div className="ecosystem-legend">
            <div className="legend-item">
              <span className="legend-dot" style={{ background:GOLD, boxShadow:`0 0 8px ${GOLD}` }}/>
              <span className="legend-label">PSX Listed</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background:GREEN, boxShadow:`0 0 8px ${GREEN}` }}/>
              <span className="legend-label">Associated</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESKTOP / TABLET CANVAS ── */}
      <div className="ecosystem-canvas-wrap">
        <canvas
          ref={canvasRef}
          style={{ width:"100%", height:"100%", display:"block", touchAction:"none" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
        {hovered && (
          <div className="canvas-tooltip" style={{
            left: Math.min(tipPos.x + 20, (canvasRef.current?.offsetWidth ?? 800) - 260),
            top:  Math.max(tipPos.y - 60, 10),
            borderColor: hovered.isPsx ? "rgba(211,184,59,0.5)" : "rgba(164,199,61,0.4)",
          }}>
            {hovered.ticker && (
              <span className="tooltip-ticker" style={{ color: GOLD }}>{hovered.ticker}</span>
            )}
            <p className="tooltip-name">{hovered.name}</p>
            <p className="tooltip-sector">{hovered.sector}</p>
            {hovered.isPsx && (
              <span className="tooltip-badge" style={{ background:"rgba(211,184,59,0.15)", color:GOLD, border:`1px solid rgba(211,184,59,0.3)` }}>
                PSX Listed
              </span>
            )}
          </div>
        )}

        {/* Tap hint for tablet */}
        <div className="tablet-hint">
          <span>Tap the rings to explore</span>
        </div>
      </div>

      {/* ── MOBILE CARD UI ── */}
      <div className="ecosystem-mobile">

        {/* Tab switcher */}
        <div className="mobile-tabs">
          <button
            className={`mobile-tab ${activeTab === "psx" ? "active-psx" : ""}`}
            onClick={() => setActiveTab("psx")}
            style={{
              borderColor: activeTab === "psx" ? GOLD : "rgba(255,255,255,0.1)",
              color:        activeTab === "psx" ? GOLD : "rgba(255,255,255,0.45)",
              background:   activeTab === "psx" ? "rgba(211,184,59,0.08)" : "transparent",
            }}
          >
            <span className="tab-dot" style={{ background: activeTab === "psx" ? GOLD : "rgba(255,255,255,0.2)", boxShadow: activeTab === "psx" ? `0 0 6px ${GOLD}` : "none" }}/>
            PSX Listed
            <span className="tab-count" style={{ background: activeTab === "psx" ? "rgba(211,184,59,0.2)" : "rgba(255,255,255,0.08)", color: activeTab === "psx" ? GOLD : "rgba(255,255,255,0.35)" }}>
              {PSX.length}
            </span>
          </button>
          <button
            className={`mobile-tab ${activeTab === "assoc" ? "active-assoc" : ""}`}
            onClick={() => setActiveTab("assoc")}
            style={{
              borderColor: activeTab === "assoc" ? GREEN : "rgba(255,255,255,0.1)",
              color:        activeTab === "assoc" ? GREEN : "rgba(255,255,255,0.45)",
              background:   activeTab === "assoc" ? "rgba(164,199,61,0.08)" : "transparent",
            }}
          >
            <span className="tab-dot" style={{ background: activeTab === "assoc" ? GREEN : "rgba(255,255,255,0.2)", boxShadow: activeTab === "assoc" ? `0 0 6px ${GREEN}` : "none" }}/>
            Associated
            <span className="tab-count" style={{ background: activeTab === "assoc" ? "rgba(164,199,61,0.2)" : "rgba(255,255,255,0.08)", color: activeTab === "assoc" ? GREEN : "rgba(255,255,255,0.35)" }}>
              {ASSOC.length}
            </span>
          </button>
        </div>

        {/* PSX Cards */}
        {activeTab === "psx" && (
          <div className="mobile-cards">
            {PSX.map((c, i) => (
              <div
                key={c.id}
                className="mobile-card mobile-card-psx"
                style={{
                  animationDelay: `${i * 60}ms`,
                  borderColor: "rgba(211,184,59,0.15)",
                  background:  "rgba(211,184,59,0.04)",
                }}
              >
                <div className="card-row">
                  <div className="card-body">
                    <div className="card-top-row">
                      <span className="card-ticker" style={{ color: GOLD, background:"rgba(211,184,59,0.12)", border:`1px solid rgba(211,184,59,0.25)` }}>
                        {c.ticker}
                      </span>
                      <span className="card-psx-badge">PSX</span>
                    </div>
                    <p className="card-name">{c.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Associated Cards */}
        {activeTab === "assoc" && (
          <div className="mobile-cards">
            {ASSOC.map((c, i) => (
              <div
                key={c.id}
                className="mobile-card mobile-card-assoc"
                style={{
                  animationDelay: `${i * 45}ms`,
                  borderColor: "rgba(164,199,61,0.12)",
                  background:  "rgba(164,199,61,0.03)",
                }}
              >
                <div className="card-row">
                  <div className="card-body">
                    <p className="card-name">{c.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


      </div>

      <style>{`
        /* ── Section layout ── */
        .ecosystem-section {
          display: flex;
          flex-direction: column;
          min-height: 100svh;
        }

        /* ── Header ── */
        .ecosystem-header {
          position: relative;
          z-index: 10;
          flex-shrink: 0;
          padding: 20px clamp(16px, 4vw, 64px) 12px;
        }
        .ecosystem-header-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        /* ── Legend ── */
        .ecosystem-legend {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .legend-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }
        .legend-label {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          font-weight: 600;
          white-space: nowrap;
        }

        /* ── Canvas wrapper ── */
        .ecosystem-canvas-wrap {
          display: none;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          position: relative;
        }

        /* ── Tablet hint ── */
        .tablet-hint {
          display: none;
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(1,8,44,0.85);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.08em;
          pointer-events: none;
          white-space: nowrap;
        }

        /* ── Canvas tooltip ── */
        .canvas-tooltip {
          position: absolute;
          background: rgba(1,8,44,0.97);
          border: 1px solid;
          padding: 14px 18px;
          pointer-events: none;
          z-index: 20;
          min-width: 200px;
          max-width: 240px;
          border-radius: 10px;
          backdrop-filter: blur(12px);
        }
        .tooltip-ticker {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }
        .tooltip-name {
          font-size: 13px;
          font-weight: 700;
          color: white;
          line-height: 1.35;
          margin: 0 0 3px;
        }
        .tooltip-sector {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          font-weight: 600;
          margin: 0 0 8px;
        }
        .tooltip-badge {
          display: inline-block;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 4px;
        }

        /* ── Mobile UI ── */
        .ecosystem-mobile {
          display: flex;
          flex-direction: column;
          padding: 0 16px 32px;
          gap: 0;
          position: relative;
          z-index: 10;
        }

        /* Tab switcher */
        .mobile-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
        }
        .mobile-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px 12px;
          border: 1px solid;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: Maven Pro, sans-serif;
        }
        .tab-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .tab-count {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 20px;
          transition: all 0.2s;
        }

        /* Cards */
        .mobile-cards {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }
        .mobile-card {
          border: 1px solid;
          border-radius: 10px;
          overflow: hidden;
          animation: cardIn 0.3s ease both;
        }
        @keyframes cardIn {
          from { opacity:0; transform: translateY(8px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .card-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
        }
        .card-body {
          flex: 1;
          min-width: 0;
        }
        .card-top-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 3px;
        }
        .card-ticker {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 4px;
        }
        .card-psx-badge {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
        }
        .card-name {
          font-size: 13px;
          font-weight: 700;
          color: white;
          margin: 0 0 2px;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-sector {
          font-size: 10px;
          margin: 0;
          font-weight: 500;
        }



        /* ── RESPONSIVE BREAKPOINTS ── */

        /* Mobile only (< 768px) */
        @media (max-width: 767px) {
          .ecosystem-section { min-height: auto; }
          .ecosystem-canvas-wrap { display: none !important; }
          .ecosystem-mobile { display: flex; }
          .ecosystem-legend { display: flex; justify-content: center; }
          .ecosystem-header { padding-bottom: 16px; }
          .ecosystem-header-inner { flex-direction: column; align-items: center; text-align: center; }
          .reveal { display: flex; flex-direction: column; align-items: center; }
        }

        /* Tablet (768px – 1023px): show canvas, hide mobile list */
        @media (min-width: 768px) and (max-width: 1023px) {
          .ecosystem-section { min-height: 100svh; }
          .ecosystem-canvas-wrap {
            display: block !important;
            min-height: 520px;
          }
          .ecosystem-mobile { display: none !important; }
          .tablet-hint { display: block; }
          .ecosystem-legend { display: flex; }
        }

        /* Desktop (≥ 1024px) */
        @media (min-width: 1024px) {
          .ecosystem-canvas-wrap { display: block !important; }
          .ecosystem-mobile { display: none !important; }
          .tablet-hint { display: none !important; }
        }
      `}</style>
    </section>
  );
}

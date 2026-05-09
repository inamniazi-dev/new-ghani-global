"use client";
import { useEffect, useRef, useState } from "react";

const PSX = [
  { id:"GGHL", name:"Ghani Global Holdings Limited",     ticker:"GGHL", sector:"Principal Holding"   },
  { id:"GCIL", name:"Ghani Chemical Industries Limited", ticker:"GCIL", sector:"Industrial Gases"    },
  { id:"GGGL", name:"Ghani Global Glass Limited",        ticker:"GGGL", sector:"Manufacturing"       },
  { id:"GCWL", name:"Ghani ChemWorld Limited",           ticker:"GCWL", sector:"Specialty Chemicals" },
];

const ASSOC = [
  { id:"ag",   name:"Air Ghani (Pvt) Limited",             sector:"Aviation & Gases"  },
  { id:"gl",   name:"Ghani Logistics (Pvt) Limited",       sector:"Logistics"         },
  { id:"ge",   name:"Ghani Energies Limited",              sector:"Energy"            },
  { id:"gg",   name:"Ghani Gases (Private) Limited",       sector:"Industrial Gases"  },
  { id:"g3",   name:"G3 Properties (Pvt) Limited",         sector:"Real Estate"       },
  { id:"geng", name:"Ghani Engineering (Pvt) Limited",     sector:"Engineering"       },
  { id:"gf",   name:"Ghani Global Foods (Pvt) Limited",    sector:"Food & Agriculture"},
  { id:"gi",   name:"Ghani Industrial Complex (Pvt) Ltd",  sector:"Infrastructure"    },
  { id:"kp",   name:"Kaya Projects (Pvt) Limited",         sector:"Projects"          },
  { id:"kl",   name:"Killowatt Labs Technologies Limited", sector:"Technology"        },
];

const GOLD  = "#d3b83b";
const GREEN = "#a4c73d";
const NAVY  = "#01082c";

export default function ConstellationNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef   = useRef<HTMLImageElement|null>(null);
  const rafRef    = useRef<number>(0);
  const hovRef    = useRef<{ ring:"psx"|"assoc"|null; idx:number }>({ ring:null, idx:-1 });
  const rotRef    = useRef<number>(0);
  const pauseRef  = useRef<boolean>(false);
  const dimsRef   = useRef({ W:0, H:0, cx:0, cy:0, coreR:0, psxInner:0, psxOuter:0, assocInner:0, assocOuter:0 });
  const [hovered, setHovered] = useState<{ name:string; sector:string; ticker?:string; isPsx:boolean }|null>(null);
  const [tipPos,  setTipPos]  = useState({ x:0, y:0 });

  useEffect(() => {
    const img = new Image();
    img.src = "/logo-new.png";
    img.onload = () => { logoRef.current = img; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;

    function resize() {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const W = canvas.width  = rect.width;
      const H = canvas.height = rect.height;
      const cx = W / 2;
      const cy = H / 2;
      // Make wheel as large as possible while fitting in viewport
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

    // Word-wrap text into lines that fit maxWidth
    function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
      ctx.font = `600 ${fontSize}px Maven Pro, sans-serif`;
      const words = text.split(" ");
      const lines: string[] = [];
      let cur = "";
      for (const w of words) {
        const test = cur ? cur + " " + w : w;
        if (ctx.measureText(test).width > maxWidth && cur) {
          lines.push(cur);
          cur = w;
        } else {
          cur = test;
        }
      }
      if (cur) lines.push(cur);
      return lines;
    }

    // Draw horizontally centered multiline text at position (tx, ty)
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

      // Subtle dot grid
      ctx.fillStyle = "rgba(164,199,61,0.04)";
      for (let gx = 0; gx < W; gx += 60)
        for (let gy = 0; gy < H; gy += 60) {
          ctx.beginPath(); ctx.arc(gx, gy, 0.8, 0, Math.PI * 2); ctx.fill();
        }

      // Slow rotation
      if (!pauseRef.current) rotRef.current += 0.0008;
      const rot = rotRef.current;

      const hov = hovRef.current;
      const psxArc   = (Math.PI * 2) / 4;
      const assocArc = (Math.PI * 2) / 10;

      // Scale font sizes with wheel — min 8px, max 13px for PSX, min 7px max 11px for assoc
      const psxFontSize   = Math.max(8,  Math.min(13, (psxOuter - psxInner) * 0.13));
      const assocFontSize = Math.max(7,  Math.min(11, (assocOuter - assocInner) * 0.11));

      // PSX band width — scale with ring size
      const psxBandW   = (psxOuter - psxInner) * 0.75;
      // Assoc band width — scale with ring size
      const assocBandW = (assocOuter - assocInner) * 0.72;

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

        if (isHov) {
          ctx.beginPath();
          ctx.arc(cx, cy, psxOuter + 4, a1 + 0.02, a2 - 0.02);
          ctx.strokeStyle = "rgba(211,184,59,0.55)";
          ctx.lineWidth = 3; ctx.stroke();
        }

        // Place label at radial midpoint of band
        const labelR = psxInner + (psxOuter - psxInner) * 0.5;
        const lx = cx + labelR * Math.cos(mid);
        const ly = cy + labelR * Math.sin(mid);

        const fontSize = psxFontSize;
        const lines = wrapText(p.name, psxBandW, fontSize);
        drawLines(lines, lx, ly, fontSize, isHov ? "white" : "rgba(255,255,255,0.88)", true);


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

        const fontSize = assocFontSize;
        const lines = wrapText(a.name, assocBandW, fontSize);
        drawLines(lines, lx, ly, fontSize, isHov ? "white" : "rgba(164,199,61,0.88)");
      });

      // Ring borders
      [
        [psxInner,   "rgba(211,184,59,0.18)"],
        [psxOuter,   "rgba(211,184,59,0.35)"],
        [assocInner, "rgba(164,199,61,0.18)"],
        [assocOuter, "rgba(164,199,61,0.25)"],
      ].forEach(([r, color]) => {
        ctx.beginPath(); ctx.arc(cx, cy, r as number, 0, Math.PI * 2);
        ctx.strokeStyle = color as string; ctx.lineWidth = 1; ctx.stroke();
      });

      // Dark gap between PSX and ASSOC
      const gapMid = (psxOuter + assocInner) / 2;
      const gapW   = assocInner - psxOuter;
      ctx.beginPath(); ctx.arc(cx, cy, gapMid, 0, Math.PI * 2);
      ctx.strokeStyle = NAVY; ctx.lineWidth = gapW - 2; ctx.stroke();

      // Center glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 2.2);
      glow.addColorStop(0, "rgba(211,184,59,0.18)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath(); ctx.arc(cx, cy, coreR * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = glow; ctx.fill();

      // Center fill
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

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const d = dimsRef.current;
    const rect = canvasRef.current!.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const dx = mx - d.cx, dy = my - d.cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = ((Math.atan2(dy, dx) + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2));

    if (dist >= d.psxInner && dist <= d.psxOuter) {
      const norm = ((angle - rotRef.current) % (Math.PI*2) + Math.PI*2) % (Math.PI*2);
      const idx = Math.floor(norm / ((Math.PI * 2) / 4)) % 4;
      hovRef.current = { ring:"psx", idx };
      setHovered({ name:PSX[idx].name, sector:PSX[idx].sector, ticker:PSX[idx].ticker, isPsx:true });
      setTipPos({ x:mx, y:my });
      canvasRef.current!.style.cursor = "pointer";
    } else if (dist >= d.assocInner && dist <= d.assocOuter) {
      const norm = ((angle - rotRef.current) % (Math.PI*2) + Math.PI*2) % (Math.PI*2);
      const idx = Math.floor(norm / ((Math.PI * 2) / 10)) % 10;
      hovRef.current = { ring:"assoc", idx };
      setHovered({ name:ASSOC[idx].name, sector:ASSOC[idx].sector, isPsx:false });
      setTipPos({ x:mx, y:my });
      canvasRef.current!.style.cursor = "pointer";
    } else {
      hovRef.current = { ring:null, idx:-1 };
      setHovered(null);
      canvasRef.current!.style.cursor = "default";
    }
  }

  function handleMouseLeave() { hovRef.current = { ring:null, idx:-1 }; setHovered(null); pauseRef.current = false; }
  function handleMouseEnter() { pauseRef.current = true; }

  return (
    <section style={{ background:NAVY, position:"relative", overflow:"hidden", height:"100vh", display:"flex", flexDirection:"column" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(164,199,61,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(164,199,61,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none" }}/>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 xl:px-16 pt-5 pb-2 relative z-10" style={{ flexShrink:0 }}>
        <div className="flex flex-wrap items-center justify-between gap-4 reveal">
          <div>
            <div className="eyebrow mb-2">Group Ecosystem</div>
            <h2 className="font-display" style={{ fontSize:"clamp(18px,2vw,30px)", fontWeight:300, color:"white", lineHeight:1.05 }}>
              Our Companies, <em style={{ fontStyle:"italic", color:GOLD }}>Explored</em>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span style={{ width:"10px", height:"10px", borderRadius:"50%", background:GOLD, display:"inline-block", boxShadow:`0 0 8px ${GOLD}` }}/>
              <span style={{ fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.45)", fontWeight:600 }}>PSX Listed</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ width:"10px", height:"10px", borderRadius:"50%", background:GREEN, display:"inline-block", boxShadow:`0 0 8px ${GREEN}` }}/>
              <span style={{ fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.45)", fontWeight:600 }}>Associated</span>
            </div>
            
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="hidden md:block" style={{ flex:1, minHeight:0, overflow:"hidden", position:"relative" }}>
        <canvas
          ref={canvasRef}
          style={{ width:"100%", height:"100%", display:"block" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        />
        {hovered && (
          <div style={{
            position:"absolute",
            left: Math.min(tipPos.x + 20, (canvasRef.current?.offsetWidth ?? 800) - 260),
            top:  Math.max(tipPos.y - 60, 10),
            background:"rgba(1,8,44,0.97)",
            border:`1px solid ${hovered.isPsx ? "rgba(211,184,59,0.5)" : "rgba(164,199,61,0.4)"}`,
            padding:"14px 18px", pointerEvents:"none", zIndex:20, minWidth:"210px", borderRadius:"8px", backdropFilter:"blur(12px)",
          }}>
            
            <p style={{ fontSize:"14px", fontWeight:700, color:"white", lineHeight:1.35, marginBottom:"3px" }}>{hovered.name}</p>
            <p style={{ fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", fontWeight:600 }}>{hovered.sector}</p>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden max-w-7xl mx-auto px-8 pb-16 mt-4 space-y-6">
        <div>
          <p style={{ fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", fontWeight:700, color:GOLD, marginBottom:"10px" }}>PSX Listed Companies</p>
          <div className="space-y-2">
            {PSX.map(c => (
              <div key={c.id} style={{ padding:"12px 16px", background:"rgba(211,184,59,0.06)", border:"1px solid rgba(211,184,59,0.2)", borderRadius:"8px" }}>
                <p style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", fontWeight:700, color:GOLD, marginBottom:"3px" }}>{c.ticker}</p>
                <p style={{ fontSize:"13px", fontWeight:700, color:"white" }}>{c.name}</p>
                <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)" }}>{c.sector}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontSize:"10px", letterSpacing:"0.22em", textTransform:"uppercase", fontWeight:700, color:GREEN, marginBottom:"10px" }}>Associated Companies</p>
          <div className="space-y-2">
            {ASSOC.map(c => (
              <div key={c.id} style={{ padding:"10px 16px", background:"rgba(164,199,61,0.04)", border:"1px solid rgba(164,199,61,0.15)", borderRadius:"8px" }}>
                <p style={{ fontSize:"12px", fontWeight:600, color:"rgba(255,255,255,0.85)" }}>{c.name}</p>
                <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.35)" }}>{c.sector}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

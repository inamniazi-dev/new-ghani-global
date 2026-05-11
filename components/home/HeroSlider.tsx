"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const SLIDE_CONTENT = {
  headline: ["Faith. Experience.", "Innovation. Growth."],
  accentWords: ["Experience.", "Growth."],
  description: "A diversified conglomerate engaged in the manufacturing of industrial, medical, and specialty gases, along with pharmaceutical-grade glass tube production and chemical manufacturing.",
  cta: { label:"Our Story", href:"/about", external:false },
  ctaSecondary: { label:"Get In Touch", href:"/contact", external:false },
};

const heroSlides = [
  { src:"/hero-banner.jpg",        position:"center 25%", ...SLIDE_CONTENT },
  { src:"/hero-banner-3-new.jpeg", position:"center 40%", ...SLIDE_CONTENT },
  { src:"/hero-banner-2-new.jpeg", position:"center 40%", ...SLIDE_CONTENT },
  { src:"/hero-banner-2.jpeg",     position:"center 40%", ...SLIDE_CONTENT },
  { src:"/hero-banner-4-new-new.jpeg",     position:"center 40%", ...SLIDE_CONTENT },
  { src:"/hero-banner-new-1.jpeg", position:"center 35%", ...SLIDE_CONTENT },
  { src:"/hero-banner-new-2.jpeg", position:"center 30%", ...SLIDE_CONTENT },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const n = heroSlides.length;

  const goTo = useCallback((idx: number) => {
    if (idx === current) return;
    setCurrent(idx);
  }, [current]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % n);
    }, 5000);
  }, [n]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const slide = heroSlides[current];

  return (
    <>
      {/* Background images — smooth cross-fade */}
      {heroSlides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={`Ghani Global Group — Slide ${i + 1}`}
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: s.position,
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.9s ease-in-out",
            zIndex: i === current ? 2 : 1,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(105deg, rgba(1,8,44,0.80) 0%, rgba(1,8,44,0.45) 55%, rgba(1,8,44,0.15) 100%)",
        zIndex: 3,
        pointerEvents: "none",
      }}/>

      {/* Text content — fully static */}
      <div
        className="relative flex flex-col justify-center"
        style={{
          height: "100%",
          padding: "0 clamp(32px,6vw,96px) 80px",
          zIndex: 10,
        }}
      >
        {/* Headline */}
        <h1 className="font-display" style={{
          fontSize: "clamp(32px,5vw,72px)",
          fontWeight: 700,
          lineHeight: 1.05,
          color: "white",
          maxWidth: "820px",
          letterSpacing: "-0.01em",
          marginBottom: "20px",
        }}>
          {slide.headline.map((line, li) => {
            const words = line.split(" ");
            return (
              <span key={li} style={{ display:"block" }}>
                {words.map((word, wi) => {
                  const isAccent = slide.accentWords.includes(word);
                  return (
                    <span key={wi} style={{ color: isAccent ? "var(--gold)" : "white", fontStyle: isAccent ? "italic" : "normal" }}>
                      {word}{wi < words.length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </h1>

        {/* Description */}
        <p style={{ fontSize:"15px", lineHeight:1.75, color:"rgba(255,255,255,0.75)", maxWidth:"560px", fontWeight:300, marginBottom:"32px" }}>
          {slide.description}
        </p>

      </div>

      {/* Dots */}
      {n > 1 && (
        <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-2" style={{ zIndex:30 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => { goTo(i); startTimer(); }}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === current ? "var(--gold)" : "rgba(255,255,255,0.4)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

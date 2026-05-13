"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const SLIDE_CONTENT = {
  headline: ["Faith. Experience.", "Innovation. Growth."],
  accentWords: ["Experience.", "Growth."],
  description: "A diversified conglomerate engaged in the manufacturing of industrial, medical, and specialty gases, along with pharmaceutical-grade glass tube production and chemical manufacturing.",
};

const heroSlides = [
  { src:"/hero-banner.jpg",            position:"center 25%", ...SLIDE_CONTENT },
  { src:"/hero-banner-3-new.jpeg",     position:"center 40%", ...SLIDE_CONTENT },
  { src:"/hero-banner-2-new.jpeg",     position:"center 40%", ...SLIDE_CONTENT },
  { src:"/hero-banner-4-new-new.jpeg", position:"center 40%", ...SLIDE_CONTENT },
  { src:"/hero-banner-2.jpeg",         position:"center 40%", ...SLIDE_CONTENT },
  { src:"/hero-banner-new-1.jpeg",     position:"center 35%", ...SLIDE_CONTENT },
  { src:"/hero-banner-new-2.jpeg",     position:"center 30%", ...SLIDE_CONTENT },
];

const mobileSlides = [
  { src:"/hero-mobile-1.jpeg", position:"center 40%", ...SLIDE_CONTENT },
  { src:"/hero-mobile-2.jpeg", position:"center 50%", ...SLIDE_CONTENT },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const slides = isMobile ? mobileSlides : heroSlides;
  const n = slides.length;

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % n);
    }, 5000);
  }, [n]);

  useEffect(() => {
    setCurrent(0);
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isMobile, startTimer]);

  const slide = slides[current] || slides[0];

  return (
    <>
      {/* Background images */}
      {slides.map((s, i) => (
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

      {/* Dark overlay — stronger on mobile for text readability */}
      <div className="absolute inset-0" style={{
        background: isMobile
          ? "linear-gradient(180deg, rgba(1,8,44,0.75) 0%, rgba(1,8,44,0.55) 50%, rgba(1,8,44,0.75) 100%)"
          : "linear-gradient(105deg, rgba(1,8,44,0.80) 0%, rgba(1,8,44,0.45) 55%, rgba(1,8,44,0.15) 100%)",
        zIndex: 3,
        pointerEvents: "none",
      }}/>

      {/* Text content */}
      <div
        className="relative flex flex-col"
        style={{
          height: "100%",
          padding: isMobile
            ? "80px 24px 100px"
            : "0 clamp(32px,6vw,96px) 80px",
          zIndex: 10,
          justifyContent: isMobile ? "flex-start" : "center",
          alignItems: isMobile ? "center" : "flex-start",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        {/* Headline */}
        <h1 className="font-display" style={{
          fontSize: isMobile ? "clamp(32px,8vw,48px)" : "clamp(32px,5vw,72px)",
          fontWeight: 700,
          lineHeight: 1.05,
          color: "white",
          maxWidth: isMobile ? "100%" : "820px",
          letterSpacing: "-0.01em",
          marginBottom: "14px",
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
        <p style={{
          fontSize: isMobile ? "13px" : "15px",
          lineHeight: 1.75,
          color: "rgba(255,255,255,0.75)",
          maxWidth: isMobile ? "100%" : "560px",
          fontWeight: 300,
          marginBottom: isMobile ? "20px" : "32px",
        }}>
          {slide.description}
        </p>
      </div>

      {/* Dots */}
      {n > 1 && (
        <div className="absolute left-0 right-0 flex justify-center gap-2" style={{ bottom: isMobile ? "60px" : "56px", zIndex:30 }}>
          {slides.map((_, i) => (
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

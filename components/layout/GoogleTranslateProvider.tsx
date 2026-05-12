"use client";
import GoogleTranslate from "next-google-translate-widget";

export default function GoogleTranslateProvider() {
  return (
    <div style={{ display:"none" }}>
      <GoogleTranslate
        pageLanguage="en"
        includedLanguages="ur,en,ar,zh-CN,nl,fr,de,it,pt,ru,es,tr"
      />
    </div>
  );
}
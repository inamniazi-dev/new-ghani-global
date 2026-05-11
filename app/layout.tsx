import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Script from "next/script";

export const metadata: Metadata = {
  title: { default: "Ghani Global Group", template: "%s | Ghani Global Group" },
  description: "Ghani Global Group — A diversified conglomerate listed on the Pakistan Stock Exchange since 2010.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Apply saved language cookie BEFORE page renders — runs synchronously */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var lang = localStorage.getItem('ghani_lang');
              if (lang && lang !== 'en') {
                var cookie = 'googtrans=/auto/' + lang;
                document.cookie = cookie + '; path=/';
                document.cookie = cookie + '; path=/; domain=' + window.location.hostname;
                document.cookie = cookie + '; path=/; domain=.' + window.location.hostname;
              }
            } catch(e) {}
          })();
        `}}/>
      </head>
      <body>
        <div id="google_translate_element" style={{ display:"none" }}/>
        <LoadingScreen />
        <ConditionalLayout>{children}</ConditionalLayout>
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html:`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'ur,en,ar,zh-CN,nl,fr,de,it,pt,ru,es,tr',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}}
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialSidebar from "@/components/layout/SocialSidebar";
import GoogleTranslateProvider from "@/components/layout/GoogleTranslateProvider";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleTranslateProvider />
      <Navbar />
      <SocialSidebar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialSidebar from "@/components/layout/SocialSidebar";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <SocialSidebar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import LoadingScreen from "@/components/ui/LoadingScreen";

export const metadata: Metadata = {
  title: { default: "Ghani Global Group", template: "%s | Ghani Global Group" },
  description: "Ghani Global Group — A diversified conglomerate listed on the Pakistan Stock Exchange since 2010.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LoadingScreen />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
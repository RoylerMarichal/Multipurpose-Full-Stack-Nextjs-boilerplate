import type { Metadata } from "next";
import React from "react";
import { HeaderLanding } from "./ui/HeaderLanding";
import FooterLanding from "./ui/FooterLanding";
import FloatingWhatsAppButton from "@/components/core/FloatingWhatsAppButton";

export const metadata: Metadata = {
  title: "The Hosting Clan ",
  description: "The Hosting Clan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <HeaderLanding />
      {children}
      <FooterLanding />

      <FloatingWhatsAppButton />
    </main>
  );
}

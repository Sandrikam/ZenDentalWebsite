import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zen Dental",
  description: "Zen Dental in Tbilisi, Georgia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

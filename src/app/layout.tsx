import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zen Dental — A calmer kind of dental care in Tbilisi",
  description: "Considered dental care in a space designed to help you feel at ease. Find Zen Dental at 63 Merab Kostava Street, Tbilisi.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

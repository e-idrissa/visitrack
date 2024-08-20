import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "VisiTrack",
  description: "A Visits Tracking Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}

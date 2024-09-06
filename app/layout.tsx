import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "VisiTrack",
  description: "A Visits Tracking Web App",
  openGraph: {
    title: "VisiTrack",
    description: "A Visits Tracking Web App",
    url: "https://visitrack.vercel.app", // Replace with your website URL
    siteName: "VisiTrack",
    images: [
      {
        url: "https://visitrack.vercel.app/public/images/og.png", // Replace with the URL to your OG image
        width: 842,
        height: 595,
        alt: "VisiTrack Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

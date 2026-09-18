import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Reuben's Home",
    template: "%s · Reuben's Home",
  },
  description: "Reuben's Home — personal site",
  icons: {
    icon: [{ url: "/assets/website%20photo.png", type: "image/png" }],
    apple: "/assets/website%20photo.png",
  },
  applicationName: "Reuben's Home",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070707",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        <div className="noise print:hidden" aria-hidden />
        {children}
      </body>
    </html>
  );
}

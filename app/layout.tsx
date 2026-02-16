import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const fraunces = Fraunces({ 
  subsets: ["latin"],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: "Political Race Intelligence | Gregory Curtis",
  description: "Editorial-quality analysis of competitive 2026 races",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>
        {/* Ambient Background Blobs - EXACT from GLASS_REFERENCE.md */}
        <div className="fixed inset-0 -z-10 bg-[#f0f2f5]">
          <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-cyan-300/30 blur-[150px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-blue-300/25 blur-[120px]" />
          <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-indigo-300/20 blur-[130px]" />
        </div>
        {children}
      </body>
    </html>
  );
}

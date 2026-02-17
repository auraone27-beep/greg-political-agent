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
        {/* Ambient Background — High saturation navy/crimson editorial */}
        <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(135deg, #edf2f7 0%, #f0f2f5 40%, #f5f0f0 100%)' }}>
          <div className="absolute -top-[10%] -left-[5%] w-[800px] h-[800px] rounded-full blur-[180px]" style={{ background: 'rgba(30, 58, 95, 0.20)' }} />
          <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full blur-[160px]" style={{ background: 'rgba(220, 38, 38, 0.10)' }} />
          <div className="absolute top-[40%] right-[15%] w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: 'rgba(99, 102, 241, 0.12)' }} />
        </div>
        {children}
      </body>
    </html>
  );
}

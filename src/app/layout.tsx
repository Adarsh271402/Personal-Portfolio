import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/providers";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Adarsh Gupta — Full Stack & .NET Developer",
  description:
    "Portfolio of Adarsh Gupta, a Full Stack & .NET Developer building modern, scalable and interactive digital experiences with clean code, great performance and user-friendly design.",
  keywords: [
    "Adarsh Gupta",
    "Full Stack Developer",
    ".NET Developer",
    "C#",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Adarsh Gupta" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Adarsh Gupta — Full Stack & .NET Developer",
    description:
      "I build modern, scalable and interactive digital experiences with a focus on clean code, great performance and user-friendly design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${geistMono.variable} ${caveat.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

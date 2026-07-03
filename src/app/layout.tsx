import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter,Noto_Sans_Arabic, Noto_Sans_Tamil, } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/providers/theme-provider";
import { SmoothScroll } from "@/providers/smooth-scroll";
import { ParticlesInitProvider } from "@/providers/particles-provider";
import { SiteShell } from "@/components/ui/site-shell";
import "./globals.css";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohamed Suhaib — AI Developer & Embedded Engineer",
  description:
    "Portfolio of Mohamed Suhaib — AI Developer, Embedded Engineer, Full Stack Developer, and Computer Vision Enthusiast.",
  keywords: [
    "Mohamed Suhaib",
    "AI Developer",
    "Embedded Engineer",
    "Full Stack Developer",
    "Computer Vision",
    "Portfolio",
  ],
  authors: [{ name: "Mohamed Suhaib" }],
  openGraph: {
    title: "Mohamed Suhaib — AI Developer & Embedded Engineer",
    description:
      "Portfolio of Mohamed Suhaib — AI Developer, Embedded Engineer, Full Stack Developer.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
       ${spaceGrotesk.variable}
       ${jetbrainsMono.variable}
       ${inter.variable}
       ${notoArabic.variable}
       ${notoTamil.variable}
`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans bg-[#09090b] text-white antialiased min-h-screen">
        <ThemeProvider>
          <SmoothScroll>
            <ParticlesInitProvider>
              <SiteShell>{children}</SiteShell>
            </ParticlesInitProvider>
          </SmoothScroll>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

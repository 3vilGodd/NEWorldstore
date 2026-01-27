import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

function resolveMetadataBaseUrl(): URL | null {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.URL ??
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);

  if (!raw) return null;

  try {
    return new URL(raw);
  } catch {
    // Don't crash the whole app if misconfigured; just omit metadataBase/openGraph.url.
    // This avoids an unhelpful startup crash while still preventing localhost URLs in production metadata.
    return null;
  }
}

const metadataBaseUrl = resolveMetadataBaseUrl();

export const metadata: Metadata = {
  title: "NEWorld eStore | Premium Mobile Protection & Accessories",
  description:
    "NEWorld eStore is a production-ready marketplace for tempered glass, hydrogel films, watch shields, MagSafe cases, and curated accessories.",
  ...(metadataBaseUrl ? { metadataBase: metadataBaseUrl } : {}),
  openGraph: {
    title: "NEWorld eStore",
    description: "Amazon-scale mobile protection and accessories",
    ...(metadataBaseUrl ? { url: metadataBaseUrl.toString() } : {}),
    siteName: "NEWorld eStore",
  },
  keywords: [
    "tempered glass",
    "hydrogel film",
    "mobile accessories",
    "NEWorld eStore",
    "MagSafe cases",
    "Apple Watch protector",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

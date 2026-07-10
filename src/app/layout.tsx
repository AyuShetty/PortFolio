import type { Metadata } from "next";
import { Mona_Sans, Hubot_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { IntroOverlay } from "@/components/intro/IntroOverlay";
import BackgroundMotion from "@/components/intro/BackgroundMotion";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import "./globals.css";
import "./ui-improvements.css";

const monaSans = Mona_Sans({
  variable: "--font-header",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const hubotSans = Hubot_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayushetty.com"),
  title: {
    default: "Ayush Shetty | Portfolio",
    template: "%s | Ayush Shetty",
  },
  description:
    "Product engineer focused on Web3, AI, and Ethereum governance tooling. Portfolio highlights, projects, leadership, and research.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Ayush Shetty | Portfolio",
    description:
      "Product engineer focused on Web3, AI, and Ethereum governance tooling. Portfolio highlights, projects, leadership, and research.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Ayush Shetty portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Shetty | Portfolio",
    description:
      "Product engineer focused on Web3, AI, and Ethereum governance tooling. Portfolio highlights, projects, leadership, and research.",
    images: ["/og.svg"],
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
      className={`${monaSans.variable} ${hubotSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-primary transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <BackgroundMotion />
          <Script id="intro-visit-flag" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `(function () {
  try {
    var visited = window.localStorage.getItem("visited") === "true";
    document.documentElement.dataset.introVisited = visited ? "true" : "false";
    document.documentElement.dataset.introState = visited ? "entered" : "intro";
  } catch (error) {
    document.documentElement.dataset.introVisited = "false";
    document.documentElement.dataset.introState = "intro";
  }
})();` }} />
        <IntroOverlay />
        <div className="site-shell relative z-10 max-w-[100vw] overflow-x-hidden">
          <PrimaryNav className="primary-nav--fixed" />
          {children}
        </div>
        </ThemeProvider>
        <Script id="performance-polyfill" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function () {
  if (typeof window === "undefined") return;
  var noop = function () {};
  var perf = window.performance || {};

  var methods = [
    'clearMarks',
    'clearMeasures',
    'mark',
    'measure',
    'getEntriesByName',
    'getEntriesByType',
  ];

  for (var i = 0; i < methods.length; i++) {
    if (typeof perf[methods[i]] !== 'function') {
      perf[methods[i]] = noop;
    }
  }

  if (typeof perf.now !== 'function') {
    perf.now = function() { return Date.now(); };
  }
  
  window.performance = perf;
})();` }} />
        <Analytics />
      </body>
    </html>
  );
}

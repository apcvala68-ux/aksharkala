import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import SiteLayout from "@/components/SiteLayout";
import SmoothScroll from "@/components/SmoothScroll";
import WebGLCanvas from "@/components/WebGLCanvas";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair-display",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Aksharkala - Luxury Indian Textiles & Handcrafted Sarees",
    template: "%s | Aksharkala",
  },
  description:
    "Handcrafted Banarasi silk sarees, Kanjivaram, and luxury Indian textiles. B2B wholesale for global luxury houses. Pure silk, zari, and zardozi artistry from Varanasi.",
  keywords: [
    "Banarasi silk saree",
    "Kanjivaram saree",
    "Indian luxury textiles",
    "handwoven saree",
    "zari work",
    "B2B textile wholesale",
    "Indian bridal saree",
  ],
  metadataBase: new URL("https://aksharkala.com"),
  openGraph: {
    title: "Aksharkala - Luxury Indian Textiles",
    description: "Handcrafted Banarasi silk sarees and luxury Indian textiles for global luxury houses.",
    url: "https://aksharkala.com",
    siteName: "Aksharkala",
    images: [
      {
        url: "/aksharkala-logo.png",
        width: 1200,
        height: 630,
        alt: "Aksharkala - Luxury Indian Textiles",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aksharkala - Luxury Indian Textiles",
    description: "Handcrafted Banarasi silk sarees and luxury Indian textiles.",
    images: ["/aksharkala-logo.png"],
  },
  icons: {
    icon: "/lotus-favicon.png",
    apple: "/lotus-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${montserrat.variable} ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for (var i = 0; i < registrations.length; i++) {
                    registrations[i].unregister();
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <WebGLCanvas />
        <SmoothScroll>
          <SiteLayout>{children}</SiteLayout>
        </SmoothScroll>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                var observer = new IntersectionObserver(function(entries) {
                  entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                      var animatedElements = entry.target.querySelectorAll('.fade-in-up');
                      animatedElements.forEach(function(el) {
                        el.classList.add('is-visible');
                      });
                    }
                  });
                }, { threshold: 0.1 });

                document.querySelectorAll('.scroll-reveal').forEach(function(section) {
                  observer.observe(section);
                });

                setTimeout(function() {
                  document.querySelectorAll('.scroll-reveal').forEach(function(section) {
                    var rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                      var animatedElements = section.querySelectorAll('.fade-in-up');
                      animatedElements.forEach(function(el) {
                        el.classList.add('is-visible');
                      });
                    }
                  });
                }, 100);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}

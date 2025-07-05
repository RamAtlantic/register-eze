import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Montserrat, Chango, Anton, Antic_Didone, Archivo_Black, Rowdies, Alfa_Slab_One, Luckiest_Guy } from "next/font/google"
import { TrackingProvider } from "./context/tracking-context"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"



const anton = Montserrat({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-anton" })
const montserrat =Anton({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-montserrat" })

const chango = Anton({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-chango" })





const siteConfig = {
  name: "MooneyMaker",
  title: "MooneyMaker - Juegos y Entretenimiento",
  description: "Descubrí una nueva forma de divertirte con MooneyMaker. Juegos, premios y emoción.",
  url: "https://mooneymaker.co", // Reemplaza con tu URL de producción
  ogImage: "https://mooneymaker.co/frontend/CSOFTV7/img/logo%20mooney.png", // URL del logo
  favicon: "https://mooneymaker.co/frontend/CSOFTV7/img/logo%20mooney.png", // URL del logo para favicon
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  
  // Favicons y icons
  icons: {
    icon: siteConfig.favicon,
    shortcut: siteConfig.favicon,
    apple: siteConfig.favicon,
  },

  // Open Graph
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200, // Ancho deseado para la imagen de vista previa (ajusta si es necesario)
        height: 630, // Alto deseado para la imagen de vista previa (ajusta si es necesario)
        alt: siteConfig.name,
      },
    ],
    locale: 'es_AR', // Asumiendo español de Argentina
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    // Puedes añadir @creator si tienes un handle de Twitter
  },
  
  // Otros metadatos útiles
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${anton.variable} ${montserrat.variable} ${chango.variable}`}> {/* Puedes quitar className=\"dark\" si ThemeProvider lo maneja o si prefieres tema claro por defecto */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      {/* Aplicamos la clase de Montserrat al body */}
      <body className={montserrat.className}> 
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                  n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = "2.0";
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
              })(
                window,
                document,
                "script",
                "https://connect.facebook.net/en_US/fbevents.js"
              );
              fbq("init", "${process.env.NEXT_PUBLIC_META_PIXEL_ID}");
              fbq("track", "PageView");
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TrackingProvider>
            {children}
          </TrackingProvider>
        </ThemeProvider>
        </body>
      </html>
  )
}

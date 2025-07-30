import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";
import { UserProvider } from "@/app/context/UserContext";
import KeepAlive from "@/app/components/KeepAlive";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "FreshMarket - Premium Online Grocery Store",
  description: "Discover fresh vegetables, fruits, and premium meat delivered to your doorstep. Experience the finest quality groceries with our modern e-commerce platform.",
  keywords: "grocery, fresh vegetables, fruits, meat, online shopping, food delivery",
  authors: [{ name: "FreshMarket Team" }],
  creator: "FreshMarket",
  publisher: "FreshMarket",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://my-ecommerce-black.vercel.app'),
  openGraph: {
    title: "FreshMarket - Premium Online Grocery Store",
    description: "Discover fresh vegetables, fruits, and premium meat delivered to your doorstep.",
    url: 'https://my-ecommerce-black.vercel.app',
    siteName: 'FreshMarket',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FreshMarket - Premium Online Grocery Store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "FreshMarket - Premium Online Grocery Store",
    description: "Discover fresh vegetables, fruits, and premium meat delivered to your doorstep.",
    images: ['/og-image.jpg'],
  },
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
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          <UserProvider>
            <KeepAlive />
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
              {/* Main Content */}
              <main className="relative">
                {children}
              </main>
            </div>
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
}
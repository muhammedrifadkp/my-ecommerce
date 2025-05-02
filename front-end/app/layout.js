import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/app/context/CartContext";
import { UserProvider } from "@/app/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FreshMarket - Online Grocery Store",
  description: "Buy fresh vegetables, fruits, and meat online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CartProvider>
          <UserProvider>
            <main className="min-h-screen bg-gray-50">
              {children}
            </main>
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
}
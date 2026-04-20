import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import CookieConsent from "@/components/CookieConsent";
import AuthProvider from "@/components/AuthProvider";
import { NavbarProvider } from "@/context/NavbarContext";
import Footer4Col from "@/components/ui/footer-column";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto-DE Admin",
  description: "Car management dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <NavbarProvider>
            <NavbarWrapper />
            <CookieConsent />
            {children}
            <Footer4Col />
          </NavbarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

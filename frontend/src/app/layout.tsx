import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/HeaderFooter/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vintage Watch",
  description: "One stop solution for all vintage watch lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="rgb(141 110 99)" />
        <main>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}

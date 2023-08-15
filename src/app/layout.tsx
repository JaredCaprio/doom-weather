import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doom Weather",
  description: "Weather forecast for the apocalypse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative m-auto bg-slate-800 text-slate-100 container  p-10`}
      >
        {children}
      </body>
    </html>
  );
}

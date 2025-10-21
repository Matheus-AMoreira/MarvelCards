import "./globals.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import NavBar from "@app/components/NavBar";
import { Suspense } from "react";
import NavBarSkeleton from "@app/components/NavBarSkeleton";

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Marvel Cards",
  description: "Aplicação para procurar por personagens, comics, séries e eventos relacionados a marvel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable}`}>
          <Suspense fallback={<NavBarSkeleton />}>
            <NavBar />
          </Suspense>
          {children}
      </body>
    </html>
  );
}

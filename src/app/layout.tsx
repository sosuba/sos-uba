import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SOS UBÁ — Apoio às Vítimas das Enchentes",
  description:
    "Cadastre sua instituição e receba medicamentos essenciais e itens de higiene em parceria com a CIMED para apoio às vítimas das enchentes em Ubá/MG.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

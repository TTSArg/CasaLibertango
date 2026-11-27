import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casa Libertango | Buenos Aires",
  description:
    "Séjournez à Casa Libertango et découvrez Buenos Aires avec Eva, danseuse et professeure de tango.",
  icons: {
    icon: "/favicon.svg",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}

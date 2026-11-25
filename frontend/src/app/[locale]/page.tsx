import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/site-page";
import { getCmsPage } from "@/lib/cms";
import { copy, locales, type Locale } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) return {};

  const locale = localeParam as Locale;
  const cmsPage = await getCmsPage(locale, "home");
  return {
    title: `${cmsPage?.title ?? copy[locale].pages.home.title} | Casa Libertango`,
    description: cmsPage?.intro ?? copy[locale].pages.home.intro,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();

  const locale = localeParam as Locale;
  const content = copy[locale].pages.home;
  const cmsPage = await getCmsPage(locale, "home");

  return (
    <SitePage
      locale={locale}
      pageKey="home"
      page={{
        ...content,
        ...(cmsPage?.title ? { title: cmsPage.title } : {}),
        ...(cmsPage?.eyebrow ? { eyebrow: cmsPage.eyebrow } : {}),
        ...(cmsPage?.intro ? { intro: cmsPage.intro } : {}),
        ...(cmsPage?.body ? { body: cmsPage.body } : {}),
        ...(cmsPage?.imageUrl ? { imageUrl: cmsPage.imageUrl } : {}),
      }}
    />
  );
}

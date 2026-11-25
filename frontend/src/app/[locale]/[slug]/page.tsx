import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePage } from "@/components/site-page";
import { getCmsExperiences, getCmsPage } from "@/lib/cms";
import {
  copy,
  getPageKey,
  locales,
  pageKeys,
  pageSlugs,
  type Locale,
} from "@/lib/content";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pageKeys.map((key) => ({ locale, slug: pageSlugs[key][locale] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!locales.includes(localeParam as Locale)) return {};

  const locale = localeParam as Locale;
  const pageKey = getPageKey(locale, slug);
  if (!pageKey) return {};
  const cmsPage = await getCmsPage(locale, slug);

  return {
    title: `${cmsPage?.title ?? copy[locale].pages[pageKey].title} | Casa Libertango`,
    description: cmsPage?.intro ?? copy[locale].pages[pageKey].intro,
  };
}

export default async function LocalizedPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();

  const locale = localeParam as Locale;
  const pageKey = getPageKey(locale, slug);
  if (!pageKey) notFound();

  const content = copy[locale].pages[pageKey];
  const cmsPage = await getCmsPage(locale, slug);
  const experiences =
    pageKey === "tango" || pageKey === "city"
      ? await getCmsExperiences(locale, pageKey === "tango" ? "tango" : "city")
      : [];

  return (
    <SitePage
      locale={locale}
      pageKey={pageKey}
      experiences={experiences}
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

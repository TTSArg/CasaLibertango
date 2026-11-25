import type { Locale } from "@/lib/content";

export type CmsPage = {
  title?: string;
  eyebrow?: string;
  intro?: string;
  body?: string;
  imageUrl?: string;
};

type StrapiPageResponse = {
  data?: Array<{
    title?: string;
    eyebrow?: string;
    intro?: string;
    body?: string;
    heroImage?: {
      url?: string;
      data?: { attributes?: { url?: string } };
    };
  }>;
};

export type CmsExperience = {
  title: string;
  description: string;
  imageUrl?: string;
};

type StrapiExperienceResponse = {
  data?: Array<{
    title?: string;
    description?: string;
    image?: {
      url?: string;
      data?: { attributes?: { url?: string } };
    };
  }>;
};

export async function getCmsPage(locale: Locale, slug: string): Promise<CmsPage | null> {
  const apiUrl = process.env.CMS_API_URL;
  if (!apiUrl) return null;

  const query = new URLSearchParams({
    "filters[locale][$eq]": locale,
    "filters[slug][$eq]": slug,
    populate: "heroImage",
    status: "published",
  });

  try {
    const response = await fetch(`${apiUrl}/pages?${query}`, {
      cache: "no-store",
      headers: cmsHeaders(),
    });
    if (!response.ok) {
      console.warn(`Strapi page lookup returned HTTP ${response.status} for ${locale}/${slug}.`);
      return null;
    }

    const payload = (await response.json()) as StrapiPageResponse;
    const page = payload.data?.[0];
    if (!page) return null;

    const imagePath = page.heroImage?.url ?? page.heroImage?.data?.attributes?.url;
    const publicUrl = process.env.CMS_PUBLIC_URL ?? apiUrl.replace(/\/api\/?$/, "");
    const imageUrl = imagePath
      ? new URL(imagePath, `${publicUrl.replace(/\/$/, "")}/`).toString()
      : undefined;

    return {
      title: page.title,
      eyebrow: page.eyebrow,
      intro: page.intro,
      body: page.body,
      imageUrl,
    };
  } catch (error) {
    console.warn(`Strapi page lookup failed for ${locale}/${slug}.`, error);
    return null;
  }
}

export async function getCmsExperiences(
  locale: Locale,
  category: "tango" | "city",
): Promise<CmsExperience[]> {
  const apiUrl = process.env.CMS_API_URL;
  if (!apiUrl) return [];

  const query = new URLSearchParams({
    "filters[locale][$eq]": locale,
    "filters[category][$eq]": category,
    sort: "sortOrder:asc",
    populate: "image",
    status: "published",
  });

  try {
    const response = await fetch(`${apiUrl}/experiences?${query}`, {
      cache: "no-store",
      headers: cmsHeaders(),
    });
    if (!response.ok) {
      console.warn(`Strapi experience lookup returned HTTP ${response.status} for ${locale}/${category}.`);
      return [];
    }

    const payload = (await response.json()) as StrapiExperienceResponse;
    const publicUrl = process.env.CMS_PUBLIC_URL ?? apiUrl.replace(/\/api\/?$/, "");
    return (payload.data ?? []).flatMap((experience) => {
      if (!experience.title || !experience.description) return [];
      const imagePath = experience.image?.url ?? experience.image?.data?.attributes?.url;
      const imageUrl = imagePath
        ? new URL(imagePath, `${publicUrl.replace(/\/$/, "")}/`).toString()
        : undefined;
      return [{ title: experience.title, description: experience.description, imageUrl }];
    });
  } catch (error) {
    console.warn(`Strapi experience lookup failed for ${locale}/${category}.`, error);
    return [];
  }
}

function cmsHeaders(): HeadersInit | undefined {
  const token = process.env.CMS_API_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : undefined;
}

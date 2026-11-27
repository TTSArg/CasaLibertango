import Image from "next/image";
import Link from "next/link";
import {
  copy,
  getPagePath,
  locales,
  type Locale,
  type PageKey,
  whatsappHref,
} from "@/lib/content";
import type { CmsExperience, CmsPage } from "@/lib/cms";
import { PlanSelector } from "@/components/plan-selector";

const languageNames: Record<Locale, string> = {
  es: "ES",
  fr: "FR",
  en: "EN",
};

export function SitePage({
  locale,
  pageKey,
  page,
  experiences = [],
}: {
  locale: Locale;
  pageKey: PageKey;
  page: CmsPage & { eyebrow: string; title: string; intro: string; body: string };
  experiences?: CmsExperience[];
}) {
  const languageCopy = copy[locale];
  const message = languageCopy.contactMessage;
  const navKeys: PageKey[] = ["home", "lodging", "tango", "city", "prepare"];

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href={`/${locale}`} aria-label="Casa Libertango">
            <Image
              className="brand-logo"
              src="/favicon.svg"
              alt=""
              width={56}
              height={56}
              priority
            />
            <span className="brand-copy">
              <span className="brand-name">Casa Libertango</span>
              <span className="brand-note">{languageCopy.footer}</span>
            </span>
          </Link>
          <div className="header-actions">
            <nav
              className="language-switch"
              aria-label={locale === "fr" ? "Langue" : locale === "en" ? "Language" : "Idioma"}
            >
              {locales.map((language) => (
                <Link
                  aria-current={language === locale ? "page" : undefined}
                  href={getPagePath(language, pageKey)}
                  key={language}
                  lang={language}
                >
                  {languageNames[language]}
                </Link>
              ))}
            </nav>
            <a className="header-contact" href={whatsappHref(message)}>
              {languageCopy.contactLabel} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>

      <nav
        className="tabs-wrap"
        aria-label={locale === "fr" ? "Navigation principale" : locale === "en" ? "Main navigation" : "Navegación principal"}
      >
        <div className="tabs">
          {navKeys.map((key) => (
            <Link
              aria-current={key === pageKey ? "page" : undefined}
              className="tab"
              href={getPagePath(locale, key)}
              key={key}
            >
              {languageCopy.nav[key]}
            </Link>
          ))}
        </div>
      </nav>

      <main className="page-wrap">
        <section className="page-view">
          {pageKey === "home" ? (
            <div className="welcome-grid">
              <div className="welcome-copy">
                <p className="eyebrow">{page.eyebrow}</p>
                <h1>{page.title}</h1>
                <p className="lede">{page.intro}</p>
                <p>{page.body}</p>
                <blockquote className="welcome-quote">
                  {locale === "fr"
                    ? "« Je vous accompagne pour découvrir Buenos Aires comme si vous y viviez. »"
                    : locale === "en"
                      ? "“Let me help you discover Buenos Aires like someone who lives here.”"
                      : "“Con mi guía, descubrí la ciudad como alguien que la vive todos los días.”"}
                </blockquote>
                <div className="welcome-facts">
                  <div className="welcome-fact">
                    <strong>{languageCopy.details.twoApartments}</strong>
                    <span>{languageCopy.details.personalWelcome}</span>
                  </div>
                  <div className="welcome-fact">
                    <strong>{languageCopy.details.address}</strong>
                    <span>Buenos Aires · Argentina</span>
                  </div>
                </div>
                <div className="button-row">
                  <Link className="button" href={getPagePath(locale, "lodging")}>
                    {languageCopy.nav.lodging}
                  </Link>
                  <Link className="button button--outline" href={getPagePath(locale, "tango")}>
                    {languageCopy.nav.tango}
                  </Link>
                </div>
              </div>
              <div
                className="welcome-photo"
                role="img"
                aria-label="Buenos Aires, Argentina"
                style={page.imageUrl ? { backgroundImage: `url("${page.imageUrl}")` } : undefined}
              >
                <span className="welcome-photo-caption">Buenos Aires · Argentina</span>
              </div>
            </div>
          ) : (
            <PageContent locale={locale} pageKey={pageKey} page={page} experiences={experiences} />
          )}
        </section>
      </main>

      <footer className="site-footer">
        Casa Libertango · Libertad 192, Buenos Aires ·{" "}
        <a href="https://www.instagram.com/casa.libertango/" target="_blank" rel="noreferrer">
          @casa.libertango
        </a>
      </footer>
    </>
  );
}

function PageContent({
  locale,
  pageKey,
  page,
  experiences,
}: {
  locale: Locale;
  pageKey: Exclude<PageKey, "home">;
  page: CmsPage & { eyebrow: string; title: string; intro: string; body: string };
  experiences: CmsExperience[];
}) {
  const languageCopy = copy[locale];
  const message = languageCopy.contactMessage;
  const cityExperiences: CmsExperience[] = experiences.length
    ? experiences
    : languageCopy.details.cityServices.map((title) => ({ title, description: "" }));

  return (
    <>
      <div className="section-intro">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
      </div>

      {pageKey === "lodging" && (
        <>
          <div className="photo-strip" aria-label={languageCopy.nav.lodging}>
            <div className="photo photo-one" role="img" aria-label="Interior acogedor" />
            <div className="photo photo-two" role="img" aria-label="Detalle del alojamiento" />
            <div className="photo photo-three" role="img" aria-label="Sala luminosa" />
          </div>
          <div className="apartment-card">
            <div
              className="apartment-photo"
              role="img"
              aria-label={languageCopy.nav.lodging}
              style={page.imageUrl ? { backgroundImage: `url("${page.imageUrl}")` } : undefined}
            />
            <div className="apartment-copy">
              <span className="mini-label">{languageCopy.details.twoApartments}</span>
              <h2>{languageCopy.details.personalWelcome}</h2>
              <p>{page.body}</p>
              <div className="time-grid">
                <div className="time-box"><strong>15:00</strong><span>{languageCopy.details.checkIn}</span></div>
                <div className="time-box"><strong>10:00</strong><span>{languageCopy.details.checkOut}</span></div>
              </div>
              <p className="amenities-note">
                {locale === "fr"
                  ? "Besoin de déposer vos bagages plus tôt ? Écrivez-moi et nous verrons ensemble."
                  : locale === "en"
                    ? "Need to leave your bags early? Let me know and we’ll see what we can arrange."
                    : "¿Necesitás dejar tu equipaje antes? Avisame y vemos cómo ayudarte."}
              </p>
            </div>
          </div>
          <div className="content-grid top-gap">
            <article className="card card--mist">
              <span className="mini-label">{languageCopy.nav.lodging}</span>
              <h3>{languageCopy.details.address}</h3>
              <p>{page.body}</p>
            </article>
            <article className="card card--sand">
              <span className="mini-label">
                {locale === "fr" ? "Quelques règles" : locale === "en" ? "A few house rules" : "Reglas de la casa"}
              </span>
              <ul className="detail-list">
                {languageCopy.details.houseRules.map((rule) => <li key={rule}>{rule}</li>)}
              </ul>
            </article>
          </div>
        </>
      )}

      {pageKey === "tango" && (
        <>
          <div className="content-grid">
            <article className="card card--mist">
              <span className="mini-label">{languageCopy.nav.tango}</span>
              <h3>{locale === "fr" ? "Avec Eva" : locale === "en" ? "Learn with Eva" : "Clases con Eva"}</h3>
              <p>{page.body}</p>
            </article>
            <article className="card card--sand">
              <span className="mini-label">{languageCopy.details.personalWelcome}</span>
              <h3>{locale === "fr" ? "À votre rythme" : locale === "en" ? "At your own pace" : "A tu ritmo"}</h3>
              <p>{page.intro}</p>
            </article>
          </div>
          <h2 className="subheading">
            {locale === "fr" ? "Choisissez vos expériences" : locale === "en" ? "Choose your experiences" : "Elegí tus experiencias"}
          </h2>
          <PlanSelector
            locale={locale}
            options={experiences.length
              ? experiences
              : languageCopy.details.tangoServices.map((title) => ({ title }))}
            message={message}
          />
        </>
      )}

      {pageKey === "city" && (
        <>
          <div className="city-categories">
            {cityExperiences.map((experience, index) => (
              <article className="city-card" key={experience.title}>
                {experience.imageUrl && (
                  <div
                    className="city-photo"
                    role="img"
                    aria-label={experience.title}
                    style={{ backgroundImage: `url("${experience.imageUrl}")` }}
                  />
                )}
                <span className="city-number">0{index + 1}</span>
                <h3>{experience.title}</h3>
                {experience.description && <p>{experience.description}</p>}
              </article>
            ))}
          </div>
          <article className="card card--mist top-gap">
            <span className="mini-label">{languageCopy.nav.city}</span>
            <h3>{page.body}</h3>
            <p>{page.intro}</p>
          </article>
          <div className="button-row">
            <a className="button" href={whatsappHref(message)}>{languageCopy.contactLabel}</a>
          </div>
        </>
      )}

      {pageKey === "prepare" && (
        <>
          <div className="preparation-list">
            {languageCopy.details.travelTips.map((tip, index) => (
              <article className="prep-item" key={tip}>
                <span className="prep-icon">0{index + 1}</span>
                <p>{tip}</p>
              </article>
            ))}
          </div>
          <div className="host-note">
            <div className="host-avatar" role="img" aria-label="Eva, anfitriona" />
            <div>
              <p className="eyebrow">{languageCopy.details.personalWelcome}</p>
              <h2>{locale === "fr" ? "Une question avant de partir ?" : locale === "en" ? "Questions before you travel?" : "¿Una pregunta antes de viajar?"}</h2>
              <p>{page.body}</p>
              <a className="button" href={whatsappHref(message)}>{languageCopy.contactLabel}</a>
            </div>
          </div>
        </>
      )}

      <div className="button-row">
        <a className="button" href={whatsappHref(message)}>{languageCopy.details.askAvailability}</a>
      </div>
    </>
  );
}

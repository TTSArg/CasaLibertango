"use client";

import { useState } from "react";
import type { Locale } from "@/lib/content";
import { whatsappHref } from "@/lib/content";

const labels: Record<Locale, { empty: string; selected: (count: number) => string; action: string }> = {
  es: {
    empty: "Elegí una o varias propuestas y armemos tu plan.",
    selected: (count) => `${count} propuesta${count === 1 ? "" : "s"} seleccionada${count === 1 ? "" : "s"}.`,
    action: "Consultar mi plan",
  },
  fr: {
    empty: "Choisissez une ou plusieurs activités pour composer votre programme.",
    selected: (count) => `${count} activité${count > 1 ? "s" : ""} sélectionnée${count > 1 ? "s" : ""}.`,
    action: "Demander mon programme",
  },
  en: {
    empty: "Choose one or more experiences to start planning your stay.",
    selected: (count) => `${count} experience${count === 1 ? "" : "s"} selected.`,
    action: "Ask about my plan",
  },
};

export function PlanSelector({
  locale,
  options,
  message,
}: {
  locale: Locale;
  options: Array<{ title: string; description?: string; imageUrl?: string }>;
  message: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const copy = labels[locale];
  const text = selected.length
    ? `${message} ${selected.join(", ")}.`
    : message;

  function toggle(option: string) {
    setSelected((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  return (
    <>
      <div className="service-grid">
        {options.map((option) => (
          <label className="service-card" key={option.title}>
            <input
              type="checkbox"
              checked={selected.includes(option.title)}
              onChange={() => toggle(option.title)}
            />
            {option.imageUrl && (
              <span
                aria-hidden="true"
                className="service-image"
                style={{ backgroundImage: `url("${option.imageUrl}")` }}
              />
            )}
            <span className="service-copy">
              <strong>{option.title}</strong>
              {option.description && <small>{option.description}</small>}
            </span>
          </label>
        ))}
      </div>
      <div className="plan-bar">
        <p aria-live="polite">
          {selected.length ? copy.selected(selected.length) : copy.empty}
        </p>
        <a className="button" href={whatsappHref(text)}>
          {copy.action} <span aria-hidden="true">→</span>
        </a>
      </div>
    </>
  );
}

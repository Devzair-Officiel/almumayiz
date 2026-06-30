"use client";
import { useState, useEffect } from "react";

type Locale = "fr" | "en" | "ar";

const STORAGE_KEY = "almumayiz_cookie_consent";

const T = {
  fr: {
    body: "Nous utilisons des cookies pour assurer le bon fonctionnement du site et mesurer son audience.",
    settings: "Paramètres",
    reject: "Tout refuser",
    accept: "OK",
    necessaryLabel: "Nécessaires",
    necessaryDesc: "Requis pour le fonctionnement du site — toujours actifs.",
    analyticsLabel: "Analytiques",
    analyticsDesc: "Mesure d'audience anonyme pour améliorer le site.",
    marketingLabel: "Marketing",
    marketingDesc: "Contenus personnalisés selon votre navigation.",
    save: "Enregistrer",
  },
  en: {
    body: "We use cookies to ensure the site works correctly and to measure audience.",
    settings: "Settings",
    reject: "Reject all",
    accept: "OK",
    necessaryLabel: "Necessary",
    necessaryDesc: "Required for the site to work — always active.",
    analyticsLabel: "Analytics",
    analyticsDesc: "Anonymous audience measurement to improve the site.",
    marketingLabel: "Marketing",
    marketingDesc: "Personalized content based on your browsing.",
    save: "Save",
  },
  ar: {
    body: "نستخدم ملفات تعريف الارتباط لضمان عمل الموقع وقياس الجمهور.",
    settings: "الإعدادات",
    reject: "رفض الكل",
    accept: "موافق",
    necessaryLabel: "ضرورية",
    necessaryDesc: "مطلوبة لعمل الموقع — دائماً نشطة.",
    analyticsLabel: "تحليلية",
    analyticsDesc: "قياس مجهول للجمهور لتحسين الموقع.",
    marketingLabel: "تسويقية",
    marketingDesc: "محتوى مخصص بناءً على تصفحك.",
    save: "حفظ",
  },
};

export function CookieBanner({ locale }: { locale: Locale }) {
  const t = T[locale] ?? T.fr;
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  function save(a: boolean, m: boolean) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ necessary: true, analytics: a, marketing: m }));
    setVisible(false);
  }

  return (
    <div className="cookie-banner" role="dialog" aria-modal="false" aria-label="Gestion des cookies">
      <div className="cookie-inner">
        <p className="cookie-body">{t.body}</p>

        {showSettings && (
          <div className="cookie-settings">
            <label className="cookie-row">
              <div>
                <strong>{t.necessaryLabel}</strong>
                <span>{t.necessaryDesc}</span>
              </div>
              <input type="checkbox" checked disabled readOnly />
            </label>
            <label className="cookie-row">
              <div>
                <strong>{t.analyticsLabel}</strong>
                <span>{t.analyticsDesc}</span>
              </div>
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            </label>
            <label className="cookie-row">
              <div>
                <strong>{t.marketingLabel}</strong>
                <span>{t.marketingDesc}</span>
              </div>
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            </label>
          </div>
        )}

        <div className="cookie-actions">
          <button className="cookie-btn-text" onClick={() => setShowSettings((s) => !s)}>
            {t.settings}
          </button>
          <button className="cookie-btn-outline" onClick={() => save(false, false)}>
            {t.reject}
          </button>
          {showSettings ? (
            <button className="cookie-btn-primary" onClick={() => save(analytics, marketing)}>
              {t.save}
            </button>
          ) : (
            <button className="cookie-btn-primary" onClick={() => save(true, true)}>
              {t.accept}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

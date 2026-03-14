import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  pathnames: {
    "/": "/",
    "/equipe": {
      fr: "/equipe",
      en: "/team",
    },
    "/evenements": {
      fr: "/evenements",
      en: "/events",
    },
    "/evenements/[slug]": {
      fr: "/evenements/[slug]",
      en: "/events/[slug]",
    },
    "/partenaires": {
      fr: "/partenaires",
      en: "/partners",
    },
    "/contact": "/contact",
  },
});

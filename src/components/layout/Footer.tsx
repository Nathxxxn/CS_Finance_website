import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold text-text">
              CentraleSupélec Finance
            </span>
            <p className="text-xs italic text-text-muted">{t("tagline")}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-faint">
              {t("links")}
            </span>
            <ul className="flex flex-col gap-3">
              {(
                [
                  { key: "team", href: "/equipe" },
                  { key: "events", href: "/evenements" },
                  { key: "partners", href: "/partenaires" },
                  { key: "contact", href: "/contact" },
                ] as const
              ).map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-text-muted transition-colors duration-200 hover:text-text"
                  >
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-faint">
              {t("follow")}
            </span>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/centralesupelec-finance"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted transition-colors duration-200 hover:text-text"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/csfinance_officiel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted transition-colors duration-200 hover:text-text"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p className="text-xs text-text-faint">
            © {year} CentraleSupélec Finance. {t("rights")}
          </p>
          <p className="text-xs text-text-faint">contact@csfinance.fr</p>
        </div>
      </div>
    </footer>
  );
}

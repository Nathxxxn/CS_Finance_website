"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { key: "team", href: "/equipe" as const },
  { key: "events", href: "/evenements" as const },
  { key: "partners", href: "/partenaires" as const },
  { key: "contact", href: "/contact" as const },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function toggleLocale() {
    const next = locale === "fr" ? "en" : "fr";
    // Dynamic routes (e.g. /evenements/[slug]) can't be passed directly —
    // redirect to parent listing page instead.
    if (pathname.includes("[")) {
      const parent = pathname.split("/[")[0] as "/" | "/equipe" | "/evenements" | "/partenaires" | "/contact";
      router.push(parent, { locale: next });
    } else {
      router.replace(
        pathname as "/" | "/equipe" | "/evenements" | "/partenaires" | "/contact",
        { locale: next }
      );
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <LogoIcon className="h-7 w-7 text-text transition-opacity duration-200 group-hover:opacity-70" />
          <span className="text-sm font-semibold tracking-wide text-text">
            CentraleSupélec Finance
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ key, href }) => {
            const isActive = pathname.includes(href);
            return (
              <li key={key}>
                <Link
                  href={href}
                  className={`text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-text"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={toggleLocale}
            className="text-xs font-medium text-text-muted transition-colors duration-200 hover:text-text"
            aria-label="Switch language"
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <Link
            href="/contact"
            className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-text transition-colors duration-200 hover:bg-surface"
          >
            {t("contact")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col items-end gap-1.5 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-px bg-text transition-all duration-300 ${menuOpen ? "w-5 translate-y-[5px] rotate-45" : "w-5"}`}
          />
          <span
            className={`block h-px bg-text transition-all duration-300 ${menuOpen ? "w-5 opacity-0" : "w-3"}`}
          />
          <span
            className={`block h-px bg-text transition-all duration-300 ${menuOpen ? "w-5 -translate-y-[5px] -rotate-45" : "w-5"}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-96 border-t border-border" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col bg-bg px-6 py-4 gap-4">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="block text-sm text-text-muted transition-colors hover:text-text py-1"
              >
                {t(key)}
              </Link>
            </li>
          ))}
          <li className="pt-2 border-t border-border">
            <button
              onClick={toggleLocale}
              className="text-xs font-medium text-text-muted hover:text-text transition-colors"
            >
              {locale === "fr" ? "Switch to English" : "Passer en français"}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 5L85 25V45L65 56V76L50 85L35 76V56L15 45V25L50 5Z
           M50 5L65 25M50 5L35 25M65 25V45M35 25V45M65 25L50 35L35 25
           M65 45L50 55M35 45L50 55M50 55V35
           M65 56L50 66M35 56L50 66M50 66V76"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

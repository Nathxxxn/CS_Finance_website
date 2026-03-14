"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

export default function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-[at_50%_40%] from-white/5 to-transparent" />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl">
        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-block rounded-full border border-border px-4 py-1.5 text-xs font-medium italic text-text-muted">
            {t("tagline")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl font-bold leading-tight tracking-tight text-text sm:text-5xl lg:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t("title")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/equipe"
            className="rounded-full bg-text px-7 py-3 text-sm font-semibold text-bg transition-opacity duration-200 hover:opacity-80"
          >
            {t("cta_primary")}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border px-7 py-3 text-sm font-medium text-text-muted transition-colors duration-200 hover:border-text/50 hover:text-text"
          >
            {t("cta_secondary")}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-transparent to-border"
          animate={{ scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

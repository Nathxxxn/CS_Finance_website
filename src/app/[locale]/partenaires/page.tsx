import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import PageHeader from "@/components/sections/PageHeader";
import { Link } from "@/i18n/navigation";
import { sanityClient, safeFetch } from "@/lib/sanity/client";
import { partnersQuery } from "@/lib/sanity/queries";
import { createImageUrlBuilder as imageUrlBuilder } from "@sanity/image-url";
import type { Partner, SanityImage } from "@/types/sanity";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "fr" ? "Partenaires" : "Partners" };
}

const builder = imageUrlBuilder(sanityClient);
function imageUrl(source: SanityImage) {
  return builder.image(source).auto("format");
}

type Tier = "gold" | "silver" | "bronze";

const TIER_CONFIG: Record<Tier, { label: string; logoHeight: number; cols: string }> = {
  gold: { label: "Gold", logoHeight: 64, cols: "grid-cols-2 sm:grid-cols-3" },
  silver: { label: "Silver", logoHeight: 48, cols: "grid-cols-3 sm:grid-cols-4" },
  bronze: { label: "Bronze", logoHeight: 32, cols: "grid-cols-4 sm:grid-cols-6" },
};

function PartnerCard({ partner, logoHeight }: { partner: Partner; logoHeight: number }) {
  return (
    <a
      href={partner.url ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center rounded-[var(--radius-card)] border border-border bg-surface px-6 py-8 transition-all duration-300 hover:border-border/70 hover:bg-surface-raised"
    >
      <Image
        src={imageUrl(partner.logo).height(logoHeight * 2).url()}
        alt={partner.name}
        width={200}
        height={logoHeight}
        className="h-auto object-contain opacity-70 transition-opacity duration-200 group-hover:opacity-100"
        style={{ maxHeight: logoHeight }}
      />
    </a>
  );
}

export default async function PartnersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const partners: Partner[] = await safeFetch<Partner>(partnersQuery);
  const byTier = (tier: Tier) => partners.filter((p) => p.tier === tier);

  return (
    <div className="pt-24">
      <PageHeader titleKey="partners.title" subtitleKey="partners.subtitle" />

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {(["gold", "silver", "bronze"] as Tier[]).map((tier, tierIndex) => {
          const tierPartners = byTier(tier);
          const config = TIER_CONFIG[tier];
          if (tierPartners.length === 0) return null;

          return (
            <div key={tier} className="mb-20">
              <FadeIn delay={tierIndex * 0.1}>
                <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-text-faint">
                  {config.label}
                </p>
              </FadeIn>
              <div className={`grid ${config.cols} gap-4`}>
                {tierPartners.map((partner, i) => (
                  <FadeIn key={partner._id} delay={tierIndex * 0.1 + i * 0.06}>
                    <PartnerCard partner={partner} logoHeight={config.logoHeight} />
                  </FadeIn>
                ))}
              </div>
            </div>
          );
        })}

        <FadeIn delay={0.3}>
          <div className="mt-8 rounded-[var(--radius-card)] border border-border bg-surface p-12 text-center">
            <h2 className="text-2xl font-bold text-text sm:text-3xl">
              {locale === "fr" ? "Devenir partenaire" : "Become a partner"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-muted">
              {locale === "fr"
                ? "Vous souhaitez soutenir CentraleSupélec Finance et accéder à un vivier de talents de l'une des meilleures écoles d'ingénieurs de France ?"
                : "Want to support CentraleSupélec Finance and access a talent pool from one of France's top engineering schools?"}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-text px-7 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-80"
            >
              {locale === "fr" ? "Nous contacter" : "Contact us"}
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

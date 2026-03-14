import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { Link } from "@/i18n/navigation";
import { sanityClient, safeFetch, safeFetchOne } from "@/lib/sanity/client";
import { eventBySlugQuery, eventsQuery } from "@/lib/sanity/queries";
import { createImageUrlBuilder as imageUrlBuilder } from "@sanity/image-url";
import type { Event, SanityImage } from "@/types/sanity";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const builder = imageUrlBuilder(sanityClient);
function imageUrl(source: SanityImage) {
  return builder.image(source).auto("format").fit("crop");
}

const CATEGORY_LABELS: Record<string, string> = {
  conference: "Conférence",
  formation: "Formation",
  networking: "Networking",
  autre: "Autre",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const event: Event | null = await safeFetchOne<Event>(eventBySlugQuery, { slug });
  if (!event) return { title: "Événement introuvable" };
  return { title: event.title[locale as "fr" | "en"] ?? event.title.fr };
}

export async function generateStaticParams() {
  const events: Event[] = await safeFetch<Event>(eventsQuery);
  return events.flatMap((e) => [
    { locale: "fr", slug: e.slug.current },
    { locale: "en", slug: e.slug.current },
  ]);
}

export default async function EventDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const event: Event | null = await safeFetchOne<Event>(eventBySlugQuery, { slug });

  if (!event) notFound();

  const title = event.title[locale as "fr" | "en"] ?? event.title.fr;
  const description = event.description[locale as "fr" | "en"] ?? event.description.fr;
  const date = new Date(event.date).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-GB",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <div className="pt-24">
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <FadeIn>
          <Link
            href="/evenements"
            className="mb-12 inline-flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-text"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {locale === "fr" ? "Retour aux événements" : "Back to events"}
          </Link>
        </FadeIn>

        {event.image && (
          <FadeIn>
            <div className="mb-10 aspect-video overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src={imageUrl(event.image).width(900).height(506).url()}
                alt={title}
                width={900}
                height={506}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.05}>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-text-muted">
            {CATEGORY_LABELS[event.category] ?? event.category}
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            {title}
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-3 text-sm capitalize text-text-muted">{date}</p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 border-t border-border pt-10">
            <p className="whitespace-pre-line text-base leading-relaxed text-text-muted">
              {description}
            </p>
          </div>
        </FadeIn>

        {event.registerUrl && (
          <FadeIn delay={0.25}>
            <div className="mt-12">
              <a
                href={event.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-text px-7 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-80"
              >
                {locale === "fr" ? "S'inscrire" : "Register"}
              </a>
            </div>
          </FadeIn>
        )}
      </section>
    </div>
  );
}

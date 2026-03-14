import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import PageHeader from "@/components/sections/PageHeader";
import { Link } from "@/i18n/navigation";
import { safeFetch } from "@/lib/sanity/client";
import { eventsQuery } from "@/lib/sanity/queries";
import type { Event } from "@/types/sanity";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "fr" ? "Événements" : "Events" };
}

const CATEGORY_LABELS: Record<string, string> = {
  conference: "Conférence",
  formation: "Formation",
  networking: "Networking",
  autre: "Autre",
};

function EventCard({ event, locale }: { event: Event; locale: string }) {
  const date = new Date(event.date);
  const day = date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", { day: "2-digit" });
  const month = date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", { month: "short" });
  const title = event.title[locale as "fr" | "en"] ?? event.title.fr;
  const description = event.description[locale as "fr" | "en"] ?? event.description.fr;

  return (
    <Link href={{ pathname: "/evenements/[slug]", params: { slug: event.slug.current } }}>
      <article className="group flex gap-6 border-b border-border py-8 transition-colors duration-200 hover:border-border/70">
        <div className="flex w-14 shrink-0 flex-col items-center pt-1">
          <span className="text-2xl font-bold leading-none text-text">{day}</span>
          <span className="text-xs uppercase tracking-wide text-text-muted">{month}</span>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-xs text-text-muted">
            {CATEGORY_LABELS[event.category] ?? event.category}
          </span>
          <h3 className="text-base font-semibold text-text transition-colors group-hover:text-text/80">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm text-text-muted">{description}</p>
        </div>
        <div className="flex items-center text-text-faint transition-all duration-200 group-hover:translate-x-1 group-hover:text-text-muted">
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </article>
    </Link>
  );
}

export default async function EventsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("events");

  const events: Event[] = await safeFetch<Event>(eventsQuery);
  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  return (
    <div className="pt-24">
      <PageHeader titleKey="events.title" subtitleKey="events.subtitle" />

      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <FadeIn>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-faint">
            {t("upcoming")}
          </h2>
        </FadeIn>
        {upcoming.length > 0 ? (
          upcoming.map((event, i) => (
            <FadeIn key={event._id} delay={i * 0.08}>
              <EventCard event={event} locale={locale} />
            </FadeIn>
          ))
        ) : (
          <FadeIn>
            <p className="py-8 text-sm text-text-muted">{t("no_events")}</p>
          </FadeIn>
        )}

        {past.length > 0 && (
          <div className="mt-20">
            <FadeIn>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-faint">
                {t("past")}
              </h2>
            </FadeIn>
            {past.map((event, i) => (
              <FadeIn key={event._id} delay={i * 0.08}>
                <div className="opacity-50">
                  <EventCard event={event} locale={locale} />
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

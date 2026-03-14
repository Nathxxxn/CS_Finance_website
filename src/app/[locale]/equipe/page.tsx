import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import PageHeader from "@/components/sections/PageHeader";
import { sanityClient, safeFetch } from "@/lib/sanity/client";
import { teamMembersQuery } from "@/lib/sanity/queries";
import { createImageUrlBuilder as imageUrlBuilder } from "@sanity/image-url";
import type { TeamMember, SanityImage } from "@/types/sanity";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "fr" ? "L'Équipe" : "The Team" };
}

const builder = imageUrlBuilder(sanityClient);
function imageUrl(source: SanityImage) {
  return builder.image(source).auto("format").fit("crop");
}

function TeamCard({ member, locale }: { member: TeamMember; locale: string }) {
  const role = member.role[locale as "fr" | "en"] ?? member.role.fr;

  return (
    <div className="group flex flex-col gap-5">
      <div className="aspect-square overflow-hidden rounded-[var(--radius-card)] bg-surface transition-colors duration-300 group-hover:bg-surface-raised">
        {member.photo ? (
          <Image
            src={imageUrl(member.photo).width(400).height(400).url()}
            alt={member.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-2xl font-bold text-text-faint">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-text">{member.name}</p>
        <p className="text-xs text-text-muted">{role}</p>
      </div>
    </div>
  );
}

export default async function TeamPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const members: TeamMember[] = await safeFetch<TeamMember>(teamMembersQuery);

  return (
    <div className="pt-24">
      <PageHeader titleKey="team.title" subtitleKey="team.subtitle" />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        {members.length === 0 ? (
          <p className="text-sm text-text-muted">
            {locale === "fr" ? "L'équipe arrive bientôt." : "Team coming soon."}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {members.map((member, i) => (
              <FadeIn key={member._id} delay={i * 0.07}>
                <TeamCard member={member} locale={locale} />
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

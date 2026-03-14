import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import PageHeader from "@/components/sections/PageHeader";
import ContactForm from "@/components/sections/ContactForm";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Contact" : "Contact",
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-24">
      <PageHeader titleKey="contact.title" subtitleKey="contact.subtitle" />

      <section className="mx-auto max-w-2xl px-6 py-12 lg:px-8">
        <FadeIn delay={0.15}>
          <ContactForm />
        </FadeIn>
      </section>
    </div>
  );
}

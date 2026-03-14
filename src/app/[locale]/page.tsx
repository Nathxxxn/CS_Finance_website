import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import HeroSection from "@/components/sections/HeroSection";
import PillarsSection from "@/components/sections/PillarsSection";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "fr"
        ? "CentraleSupélec Finance — Built for Finance, shaped by CS"
        : "CentraleSupélec Finance — Built for Finance, shaped by CS",
    description:
      locale === "fr"
        ? "L'association qui connecte les étudiants de CentraleSupélec au monde de la finance."
        : "The association connecting CentraleSupélec students to the world of finance.",
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <PillarsSection />
    </>
  );
}

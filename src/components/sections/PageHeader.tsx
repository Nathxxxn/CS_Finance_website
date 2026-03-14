import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/FadeIn";

type PageHeaderProps = {
  titleKey: string;
  subtitleKey: string;
};

export default function PageHeader({ titleKey, subtitleKey }: PageHeaderProps) {
  const t = useTranslations();

  return (
    <section className="mx-auto max-w-7xl px-6 pt-20 pb-12 lg:px-8">
      <div className="flex flex-col gap-4 max-w-2xl">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl">
            {t(titleKey)}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-base leading-relaxed text-text-muted sm:text-lg">
            {t(subtitleKey)}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ProblemGrid } from "@/components/sections/ProblemGrid";
import { ScrollShowcase } from "@/components/sections/ScrollShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ROIAssessment } from "@/components/sections/ROIAssessment";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return { title: t("meta.title"), description: t("meta.description") };
}

// Hero y ScrollShowcase quedan sin wrapper — tienen sus propias animaciones de entrada.
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AnimateOnScroll><ProblemGrid /></AnimateOnScroll>
      <ScrollShowcase />
      <AnimateOnScroll><Testimonials /></AnimateOnScroll>
      <AnimateOnScroll><Process /></AnimateOnScroll>
      <AnimateOnScroll><AboutPreview /></AnimateOnScroll>
      <AnimateOnScroll><ROIAssessment /></AnimateOnScroll>
      <AnimateOnScroll><FinalCTA /></AnimateOnScroll>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/case-studies/CaseStudyView";
import { agentrail } from "@/components/case-studies/agentrail";
import { atoz } from "@/components/case-studies/atoz";
import { aurelia } from "@/components/case-studies/aurelia";
import { chainhound } from "@/components/case-studies/chainhound";
import { karishava } from "@/components/case-studies/karishava";
import type { CaseStudy } from "@/components/case-studies/types";
import { wiredesk } from "@/components/case-studies/wiredesk";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { projects } from "@/components/projects";
import RevealObserver from "@/components/RevealObserver";

const caseStudies: CaseStudy[] = [chainhound, agentrail, wiredesk, aurelia, karishava, atoz];

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title} case study`, description: p.desc };
}

export default async function CaseStudyPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  const study = caseStudies.find((s) => s.slug === slug);
  if (i < 0 || !study) notFound();

  const next = projects.length > 1 ? projects[(i + 1) % projects.length] : undefined;

  return (
    <>
      <Nav />
      <main>
        <CaseStudyView project={projects[i]} study={study} next={next} />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}

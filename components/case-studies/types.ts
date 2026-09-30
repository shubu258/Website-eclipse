import type { StaticImageData } from "next/image";

export type Shot = {
  src: StaticImageData;
  alt: string;
  caption?: string;
  /** Tall, narrow captures (side panels, mobile) render at a readable width. */
  narrow?: boolean;
};

export type Section = {
  label: string;
  title: string;
  body?: string[];
  /** Short titled points, shown as a grid. */
  items?: { t: string; d: string }[];
  /** Numbered process steps. */
  steps?: string[];
  quote?: string;
  stack?: [string, string][];
  shots?: Shot[];
};

export type CaseStudy = {
  slug: string;
  /** The client's brand colour, used sparingly for accents. */
  accent: string;
  tagline: string;
  summary: string;
  facts: { k: string; v: string }[];
  hero: Shot;
  sections: Section[];
};

import categories from "@/public/work/aurelia/categories.png";
import hero from "@/public/work/aurelia/hero.png";
import studio from "@/public/work/aurelia/studio.png";
import type { CaseStudy } from "./types";

export const aurelia: CaseStudy = {
  slug: "aurelia",
  accent: "#a8834f",
  tagline: "A fine jewellery store where every piece can be turned in 3D, and every ring can be designed before it's made.",
  summary:
    "Aurelia is an e-commerce storefront for a made-to-order jewellery studio. Shoppers can rotate each piece in real-time 3D, change its metal and stone, and design their own ring step by step while the price updates with every choice. It is a design demo: the catalogue and live metal rates are sample data, and no real orders are placed.",
  facts: [
    { k: "Industry", v: "Fine jewellery & e-commerce" },
    { k: "What we did", v: "Brand & UI design, 3D product viewer, ring configurator, storefront build" },
    { k: "Stack", v: "Next.js, React Three Fiber, Three.js, Zustand" },
    { k: "Year", v: "2026" },
  ],
  hero: {
    src: hero,
    alt: "Aurelia home page: the headline \"Jewellery that holds the light\" next to a 3D solitaire ring with metal and stone swatches",
  },
  sections: [
    {
      label: "The challenge",
      title: "Buying a ₹1 lakh ring from a photo is hard.",
      body: [
        "Fine jewellery is expensive and personal, and most online stores sell it with a few flat photos taken from fixed angles. A shopper can't see how the stone catches the light, or what the same ring looks like in rose gold or with a sapphire.",
        "For a studio that makes each piece to order, that's a bigger problem. There is often no finished piece to photograph, so the site has to show a ring that doesn't exist yet and still make the buyer confident enough to order it.",
      ],
    },
    {
      label: "Our solution",
      title: "Let people hold the piece before it's made.",
      body: [
        "We built the store around a real-time 3D viewer. Every product can be dragged, rotated and zoomed, and the metal and stone swatches change the model straight away. There are no pre-rendered images to swap between.",
        "Around it, we designed a warm, quiet storefront with a serif display face, soft ivory surfaces and gold accents, so the pieces stay the focus.",
      ],
      quote: "I turned the ring round in 3D for a week before I proposed. The real one is even better.",
    },
    {
      label: "The storefront",
      title: "A full shop, not just a viewer.",
      body: [
        "Shoppers browse by piece (rings, necklaces, earrings and bracelets) or by collection, and can open any product in a 3D quick view from the grid. The site also has search, a wishlist, a cart and a live ticker for gold, platinum and silver rates.",
        "Trust details that matter in this category sit close to the price: BIS hallmarking, IGI certification, recycled 18K gold, traceable stones, insured shipping and 30-day returns.",
      ],
      shots: [
        {
          src: categories,
          alt: "Shop by piece section with rendered cards for rings, necklaces, earrings and bracelets",
          caption: "Each category card uses its own illustrated piece and colour, so the grid reads at a glance.",
        },
      ],
    },
    {
      label: "The Ring Studio",
      title: "Design a ring in five steps, with the price always in view.",
      steps: [
        "Setting: solitaire, halo, three-stone or pavé shoulders",
        "Metal: yellow, rose or white gold, or platinum",
        "Stone: diamond, sapphire, emerald or ruby",
        "Cut & carat: the model and price update together",
        "Size: pick one, or order a free ring sizer",
      ],
      body: [
        "The 3D ring rebuilds with each choice, and a running summary breaks the total into setting, metal and stone. Shoppers can hit \"Surprise me\" for a random combination, and each design can be shared as a link that opens the same ring.",
      ],
      shots: [
        {
          src: studio,
          alt: "Ring Studio: a 3D solitaire ring on the left, setting options and a price summary totalling ₹1,30,000 on the right",
          caption: "The setting step, with the live model on the left and the running price summary below.",
        },
      ],
    },
    {
      label: "Making it look real",
      title: "Stones that behave like stones.",
      items: [
        {
          t: "Physically based stones",
          d: "Diamonds use a refractive index of 2.42 with light dispersion, which gives the coloured fire you see in the facets. Coloured stones use a lower index and tinted light absorption.",
        },
        {
          t: "Metals that reflect",
          d: "Gold and platinum use metallic materials lit by an environment map, so the band picks up soft highlights as it turns.",
        },
        {
          t: "Modelled in code",
          d: "The rings are assembled from simple 3D shapes in code, so each setting, stone and carat is generated on the fly. No separate model file is needed for each combination.",
        },
        {
          t: "Kind to devices",
          d: "The 3D scenes load only when they're needed, and the site respects the reduced-motion setting.",
        },
      ],
    },
    {
      label: "Key features",
      title: "What we delivered",
      items: [
        { t: "3D product viewer", d: "Drag, rotate and zoom any piece, with instant metal and stone swaps." },
        { t: "Ring configurator", d: "Five guided steps with a live model and an itemised price." },
        { t: "Shareable designs", d: "Every custom ring can be shared as a link that reopens it exactly." },
        { t: "Complete shop flow", d: "Categories, collections, 3D quick view, search, wishlist and cart." },
        { t: "Live metal rates", d: "A ticker for gold, platinum and silver prices per gram." },
        { t: "Services", d: "Video consultations, a free ring sizer, engraving and lifetime care." },
      ],
    },
    {
      label: "Tech stack",
      title: "Built with",
      stack: [
        ["Framework", "Next.js, React, TypeScript"],
        ["3D", "Three.js, React Three Fiber, Drei"],
        ["State", "Zustand"],
        ["Hosting", "Vercel"],
      ],
    },
    {
      label: "Impact",
      title: "A made-to-order studio that can sell pieces it hasn't made yet.",
      body: [
        "Aurelia shows how a small jewellery brand can sell high-value, custom pieces online without a studio full of stock to photograph. The buyer sees the ring they will get from every angle, in the metal and stone they choose, at a price that is clear before they check out.",
        "The same viewer and configurator can take a brand's own catalogue, pricing and checkout.",
      ],
    },
  ],
};

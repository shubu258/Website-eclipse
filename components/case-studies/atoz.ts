import analytics from "@/public/work/atoz/analytics.png";
import hero from "@/public/work/atoz/hero.png";
import howItWorks from "@/public/work/atoz/how-it-works.png";
import rentAndSale from "@/public/work/atoz/rent-and-sale.png";
import type { CaseStudy } from "./types";

export const atoz: CaseStudy = {
  slug: "atoz",
  // AtoZ's brand green, deepened so it stays readable on white
  accent: "#178a5a",
  tagline: "A property platform where owners list and manage rentals and sales in one place.",
  summary:
    "AtoZ is a two-sided property listing platform. Owners publish and update their own rentals and sale listings, visitors search and explore them, and admins keep the whole marketplace in order. Built-in analytics show how each side of the business is performing.",
  facts: [
    { k: "Industry", v: "Real estate · PropTech" },
    { k: "What we did", v: "Product design, web apps, backend" },
    { k: "Apps", v: "Marketplace, owner dashboard, admin" },
    { k: "Year", v: "2026" },
  ],
  hero: { src: hero, alt: "AtoZ home page: Manage every property you own or sell, in one place" },
  sections: [
    {
      label: "The challenge",
      title: "Listings go stale when owners can't update them.",
      body: [
        "Property businesses often collect listing details by hand, which makes them hard to keep current, and admins can't see what's happening across the platform. Owners and visitors also need very different things: owners need tools to manage their listings, and visitors need a fast way to find the right property.",
      ],
      items: [
        { t: "Outdated listings", d: "Owners had no direct way to keep price and availability current." },
        { t: "Little admin control", d: "Managing users and listings got harder as the inventory grew." },
        { t: "Scattered details", d: "Photos, prices, specs and locations needed to live on one listing." },
        { t: "Two kinds of users", d: "Owners need management tools, while visitors need quick discovery." },
      ],
    },
    {
      label: "Our solution",
      title: "Three experiences on one shared backend.",
      body: [
        "We built a public marketplace for browsing, a dashboard where owners manage their own properties, and an admin app for running the platform. All three read from the same data, so an owner's update appears everywhere at once, and admins stay in control without approving every change themselves.",
      ],
      quote: "Owners manage their own inventory, visitors get a clean search, and admins keep control without becoming a bottleneck.",
    },
    {
      label: "How it works",
      title: "From sign-up to live listing in three steps.",
      steps: [
        "Create an account. Every listing is tied to its owner",
        "Add the details once (address, price, specs and photos) and publish as a rental or a sale",
        "Track performance with live listing counts, average price and status breakdowns",
      ],
      shots: [{ src: howItWorks, alt: "How it works: create your account, list a rental or a sale, track performance", caption: "The owner journey as shown on the platform." }],
    },
    {
      label: "Rentals & sales",
      title: "Built for both sides of the business.",
      items: [
        { t: "Rental management", d: "Publish units, track occupancy and update rent, deposit and availability." },
        { t: "Sale listings", d: "List with pricing, specs and photos, then move from available to under offer to sold." },
        { t: "Search & filters", d: "Visitors narrow down properties by location, price and features." },
        { t: "Detail pages", d: "Each property gets a full page with images, pricing, location and description." },
      ],
      shots: [{ src: rentAndSale, alt: "Rental management and sale listings panels", caption: "Rentals and sales managed side by side." }],
    },
    {
      label: "Analytics",
      title: "See the portfolio the way an owner does.",
      body: [
        "Once signed in, owners see every property they've listed alongside rent-vs-sale analytics: total listings, average price and status breakdowns, updated as they go.",
      ],
      shots: [{ src: analytics, alt: "Monthly bar chart comparing rentals and sales", caption: "Rent-vs-sale analytics in the owner portal (sample data)." }],
    },
    {
      label: "Admin & access",
      title: "Central control over the whole marketplace.",
      items: [
        { t: "Admin dashboard", d: "One place to manage users, listings and platform activity." },
        { t: "Listing moderation", d: "Review, update or remove listings to keep quality high." },
        { t: "User management", d: "Accounts and property ownership kept clearly linked." },
        { t: "Role-based access", d: "Admin powers stay separate from owner and visitor features." },
      ],
    },
    {
      label: "Impact",
      title: "From a listing website to a scalable marketplace.",
      body: [
        "Owners now keep their own listings current instead of relying on an internal team, admins keep oversight without slowing anyone down, and visitors get organised, searchable listings. The shared data layer is ready for what comes next: inquiries, saved properties, agent accounts, featured listings and verification.",
      ],
    },
  ],
};

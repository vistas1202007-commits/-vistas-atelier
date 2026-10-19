export type MockupKind = "beauty" | "laundry" | "menu" | "dashboard";

export type Project = {
  slug: string;
  name: string;
  sector: string;
  kind: "Concept" | "Client";
  year: string;
  mockup: MockupKind;
  tagline: string;
  summary: string;
  scope: string[];
  challenge: string;
  approach: { title: string; body: string }[];
  features: string[];
  palette: { name: string; hex: string }[];
  type: string[];
  // Optional link to the deployed version of the project.
  liveUrl?: string;
};

// Concept projects are self-initiated studies and are always labelled as such.
// Add real client work with kind: "Client" when you can share it.
export const projects: Project[] = [
  {
    slug: "aaina-beauty-studio",
    name: "Aaina Beauty Studio",
    sector: "Beauty & wellness",
    kind: "Concept",
    year: "2026",
    mockup: "beauty",
    liveUrl: "https://strong-cucurucho-858239.netlify.app",
    tagline: "A salon site where booking takes under a minute.",
    summary:
      "A website for a neighbourhood salon that wants fewer back-and-forth WhatsApp messages and more confirmed appointments.",
    scope: ["Website", "Booking flow", "Brand refresh"],
    challenge:
      "Most small salons take bookings over phone and WhatsApp. Customers can't see prices or free slots, so a simple appointment can take six or seven messages, and no-shows cost real money.",
    approach: [
      {
        title: "Prices up front",
        body: "Every service shows its duration and starting price, so customers arrive knowing what to expect and staff stop answering the same question all day.",
      },
      {
        title: "Three-step booking",
        body: "Service, stylist, slot. A small deposit at checkout reduces no-shows without putting first-time customers off.",
      },
      {
        title: "Warm, not glossy",
        body: "Soft rose and clay tones with real interior photography, avoiding the stock-model look that makes salons feel interchangeable.",
      },
    ],
    features: ["Live slot picker", "Deposit payments", "Stylist profiles", "Automatic WhatsApp reminders", "Gift cards"],
    palette: [
      { name: "Blush", hex: "#F3D9D1" },
      { name: "Clay", hex: "#C9806D" },
      { name: "Cocoa", hex: "#4A2E27" },
      { name: "Cream", hex: "#FBF4EE" },
    ],
    type: ["Instrument Serif", "Inter Tight"],
  },
  {
    slug: "freshfold",
    name: "FreshFold",
    sector: "Local services",
    kind: "Concept",
    year: "2026",
    mockup: "laundry",
    liveUrl: "https://harmonious-sherbet-361c4f.netlify.app",
    tagline: "Laundry pickup scheduled in three taps.",
    summary:
      "A mobile-first ordering app for a laundry and dry-cleaning service that wants to move customers off phone calls.",
    scope: ["Mobile app", "Order tracking", "Admin dashboard"],
    challenge:
      "Customers don't know when their clothes will be picked up or returned, and the business tracks orders in a notebook. Missed pickups and lost items create most of the complaints.",
    approach: [
      {
        title: "Schedule, not call",
        body: "Customers choose a pickup window and see the expected return date straight away, based on the service and current load.",
      },
      {
        title: "Status you can trust",
        body: "Every order moves through picked up, cleaning, ready and out for delivery, with a notification at each step.",
      },
      {
        title: "Built for the counter too",
        body: "A simple admin view lets staff scan tags and update orders in seconds, so the customer view is always accurate.",
      },
    ],
    features: ["Pickup slot booking", "Live order status", "Itemised pricing", "Repeat orders", "Staff admin panel"],
    palette: [
      { name: "Mint", hex: "#DCEBE3" },
      { name: "Pine", hex: "#24564A" },
      { name: "Foam", hex: "#F7FBF9" },
      { name: "Citrus", hex: "#F2C14E" },
    ],
    type: ["Inter Tight"],
  },
  {
    slug: "gather-digital-menu",
    name: "Gather",
    sector: "Food & hospitality",
    kind: "Concept",
    year: "2026",
    mockup: "menu",
    tagline: "A QR menu that feels like the restaurant, not a PDF.",
    summary:
      "A digital menu for an all-day café, designed to load instantly on patchy mobile data and make specials easy to update.",
    scope: ["Digital menu", "CMS", "Ordering"],
    challenge:
      "PDF menus are slow to open, impossible to read on a phone and out of date the moment a dish sells out. Guests give up and wave for a waiter.",
    approach: [
      {
        title: "Phone-first layout",
        body: "Sticky category tabs, clear dietary markers and large tap targets make browsing comfortable with one hand.",
      },
      {
        title: "Kitchen-controlled",
        body: "Staff can mark a dish sold out or add the day's special from their phone in under ten seconds.",
      },
      {
        title: "Lightweight by design",
        body: "No heavy images on first load, so the menu opens in about a second, even on slow connections.",
      },
    ],
    features: ["Category tabs", "Veg / non-veg markers", "Sold-out toggles", "Order to table", "Multi-language ready"],
    palette: [
      { name: "Crust", hex: "#B98A5E" },
      { name: "Espresso", hex: "#3A2618" },
      { name: "Oat", hex: "#FFF6E9" },
      { name: "Herb", hex: "#5F7A4A" },
    ],
    type: ["Instrument Serif", "Inter Tight"],
  },
  {
    slug: "loom-ledger-dashboard",
    name: "Loom & Ledger",
    sector: "Retail · Data",
    kind: "Concept",
    year: "2026",
    mockup: "dashboard",
    tagline: "Three spreadsheets turned into one morning dashboard.",
    summary:
      "A sales and stock dashboard for a two-store textile retailer that was reconciling exports from three systems by hand.",
    scope: ["Dashboard", "Data pipeline", "Automated reports"],
    challenge:
      "The owner spent every Monday merging POS, online store and inventory spreadsheets just to see what sold. Reorders came too late and slow stock tied up cash.",
    approach: [
      {
        title: "One source of truth",
        body: "A small nightly job cleans and joins the three exports into a single table, with no manual copy-paste.",
      },
      {
        title: "Answer the real questions",
        body: "The dashboard opens on what to reorder, what isn't moving, and how this week compares with last week. Vanity charts were left out.",
      },
      {
        title: "Reports that arrive",
        body: "A one-page summary is emailed every Monday at 8 a.m., so the numbers reach people who never open dashboards.",
      },
    ],
    features: ["Revenue & margin trends", "Reorder alerts", "Store comparison", "Weekly email digest", "CSV export"],
    palette: [
      { name: "Ink", hex: "#1F2A2E" },
      { name: "Indigo", hex: "#3E5C76" },
      { name: "Saffron", hex: "#E0A43A" },
      { name: "Paper", hex: "#F6F4EF" },
    ],
    type: ["Inter Tight", "JetBrains Mono"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

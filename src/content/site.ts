// Studio-wide settings. Change these in one place and the whole site updates.
export const site = {
  name: "Vistas Atelier",
  url: "https://vistasatelier.com",
  // TODO: replace with the real business inbox before publishing.
  email: "REPLACE_WITH_REAL_EMAIL",
  whatsapp: "918791272440",
  founder: "Shivani Sharma",
  location: "India",
  timezone: "IST · UTC+5:30",
  availability: "Taking on new projects",
  // Paste a Calendly or Cal.com link here to let visitors book calls directly.
  // While empty, "Book a call" buttons scroll to the contact form instead.
  bookingUrl: "",
  description:
    "Vistas Atelier is an independent digital studio in India designing and building websites, web apps and data tools for businesses in India and abroad.",
  social: {
    linkedin: "https://www.linkedin.com/in/shivani-sharma-167239341/",
    github: "https://github.com/vistas1202007-commits",
  },
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Studio", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export const capabilities = [
  "Marketing websites",
  "Booking flows",
  "Web applications",
  "Mobile apps",
  "E-commerce",
  "UI/UX design",
  "Dashboards",
  "Automation",
];

export const services = [
  {
    title: "Websites",
    body: "Marketing sites that explain what you do in five seconds and make the next step obvious, whether that's a call, a booking or a quote.",
    tags: ["Strategy", "Copy structure", "Design", "Next.js build", "CMS"],
  },
  {
    title: "Web applications",
    body: "Portals, booking systems and internal tools built around the task your team or customers actually repeat every day.",
    tags: ["Product scoping", "Auth & roles", "Databases", "Integrations"],
  },
  {
    title: "Mobile applications",
    body: "Focused mobile experiences for ordering, scheduling and tracking. We start with the smallest app that is genuinely useful.",
    tags: ["Flows", "Prototypes", "React Native", "Store release"],
  },
  {
    title: "E-commerce",
    body: "Storefronts that make choosing easy: clear product pages, honest delivery information and a checkout that doesn't get in the way.",
    tags: ["Catalogue", "Payments", "Shipping", "Analytics"],
  },
  {
    title: "UI/UX design",
    body: "Audits, user journeys and interface design for products that work but feel harder to use than they should.",
    tags: ["UX audit", "Wireframes", "Design systems", "Usability tests"],
  },
  {
    title: "Data & business tools",
    body: "Dashboards and automations that turn spreadsheets and exports into answers you can act on, without a data team.",
    tags: ["Dashboards", "Reporting", "Automation", "Data cleaning"],
  },
];

export const industries = [
  {
    name: "Beauty & wellness",
    builds: ["Online booking with deposits", "Service menus with real prices", "Gift cards & memberships"],
  },
  {
    name: "Food & hospitality",
    builds: ["QR menus that load on 3G", "Table & event reservations", "Direct ordering without commission"],
  },
  {
    name: "Retail & e-commerce",
    builds: ["Product catalogues", "WhatsApp-assisted checkout", "Stock & sales dashboards"],
  },
  {
    name: "Property & interiors",
    builds: ["Project portfolios", "Listing pages with enquiry routing", "Before/after galleries"],
  },
  {
    name: "Fitness & lifestyle",
    builds: ["Class schedules & passes", "Member portals", "Coach profiles"],
  },
  {
    name: "Professional services & startups",
    builds: ["Credibility-first websites", "Client portals", "MVPs to test an idea"],
  },
];

export const process = [
  {
    title: "Discover",
    body: "A 20-minute call, then a short questionnaire about your customers, competitors and what success looks like.",
    output: "Written brief",
    time: "Week 1",
  },
  {
    title: "Define",
    body: "We agree the pages or features, the order they ship in, and a fixed quote. No vague hourly estimates.",
    output: "Scope & quote",
    time: "Week 1",
  },
  {
    title: "Design",
    body: "Wireframes first, then full designs for mobile and desktop. You review in the browser, not in static PDFs.",
    output: "Clickable prototype",
    time: "Weeks 2–3",
  },
  {
    title: "Develop",
    body: "We build on a live preview link you can open anytime, with weekly check-ins and a shared task list.",
    output: "Preview site",
    time: "Weeks 3–5",
  },
  {
    title: "Launch",
    body: "Domain, analytics, speed and SEO checks, a walkthrough video, and 30 days of fixes after go-live.",
    output: "Live site + handover",
    time: "Week 6",
  },
];

// Set real prices here when ready; until then the card shows "Fixed quote after a call".
export const engagements = [
  {
    name: "Launch",
    price: null as string | null,
    time: "2–3 weeks",
    for: "A first proper website for a new or small business.",
    includes: ["Up to 5 pages", "Mobile-first design", "Contact & WhatsApp enquiries", "Basic SEO & analytics"],
  },
  {
    name: "Grow",
    price: null as string | null,
    time: "4–6 weeks",
    for: "Businesses replacing an outdated site or adding bookings or sales.",
    includes: ["Up to 12 pages + CMS", "Booking or store integration", "Copy structure support", "Speed & SEO pass"],
    featured: true,
  },
  {
    name: "Build",
    price: null as string | null,
    time: "Scoped together",
    for: "Web apps, portals, dashboards and custom tools.",
    includes: ["Discovery workshop", "Clickable prototype", "Phased delivery", "Ongoing support options"],
  },
];

export const faqs = [
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We work remotely with clients in any time zone, keep at least two hours of overlap for calls, and invoice in INR or USD. Everything is agreed in a written proposal before work starts.",
  },
  {
    q: "How long does a website take?",
    a: "A small business site usually takes 2–3 weeks, and a larger site with bookings or a store 4–6 weeks. The biggest factor is how quickly content and feedback come in.",
  },
  {
    q: "What do I need to get started?",
    a: "Just a clear idea of what your business does and who it's for. We'll help you structure the content, and we can recommend photographers or copywriters if you need them.",
  },
  {
    q: "Who owns the website and the code?",
    a: "You do. Once the final invoice is paid, the domain, hosting accounts, design files and code are all in your name.",
  },
  {
    q: "Can you improve my existing website instead of rebuilding it?",
    a: "Often, yes. We start with a short audit and tell you honestly whether a redesign or a few targeted fixes will make the bigger difference.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes 30 days of fixes. After that you can choose a monthly care plan for updates and monitoring, or simply contact us when you need something.",
  },
];

export const contactOptions = {
  services: [
    "Website",
    "Web application",
    "Mobile application",
    "E-commerce",
    "UI/UX design",
    "Data & business tools",
    "Not sure yet",
  ],
  budgets: [
    "Not sure yet",
    "Under ₹1L / US$1,200",
    "₹1L–3L / US$1,200–3,500",
    "₹3L–8L / US$3,500–9,500",
    "₹8L+ / US$9,500+",
  ],
  timelines: ["As soon as possible", "Within 1–2 months", "In 3+ months", "Just exploring"],
};

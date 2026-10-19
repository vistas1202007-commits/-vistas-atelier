export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: { heading?: string; text: string }[];
};

export const articles: Article[] = [
  {
    slug: "what-makes-a-business-website-trustworthy",
    title: "What makes a small-business website feel trustworthy?",
    category: "Design",
    date: "2026-10-01",
    readTime: "4 min read",
    excerpt:
      "Visitors decide in seconds whether to trust a business online. These are the signals that matter most, and none of them need a big budget.",
    body: [
      {
        text: "Before anyone reads your About page, they've already made a judgement. Research on first impressions keeps finding the same thing: people decide within a few seconds whether a site feels credible, and design quality is the biggest factor. The good news is that trust comes mostly from clarity, not expensive visuals.",
      },
      {
        heading: "1. Say exactly what you do, for whom",
        text: "“Premium solutions for modern needs” tells a visitor nothing. “Bridal makeup and hair in South Delhi, booked online” tells them whether they're in the right place. Specific beats impressive every time.",
      },
      {
        heading: "2. Show real people and real work",
        text: "Stock photos are easy to spot and quietly signal that there's nothing real to show. A slightly imperfect photo of your actual team or workspace builds more trust than a polished image of strangers.",
      },
      {
        heading: "3. Make contact effortless and visible",
        text: "A phone number, WhatsApp link, email address and physical area of service should be one tap away on mobile. If people have to hunt for a way to reach you, they assume you're hard to reach.",
      },
      {
        heading: "4. Be upfront about price and process",
        text: "You don't have to publish a full rate card, but “starting from” prices and a simple explanation of what happens after someone gets in touch remove the biggest reasons people hesitate.",
      },
      {
        heading: "5. Sweat the small technical details",
        text: "A secure (https) connection, fast loading on mobile data, no broken links and an up-to-date copyright year all seem minor. Together, they tell visitors that the business is active and cared for.",
      },
      {
        text: "None of this needs a large budget. It needs someone to look at your site the way a first-time customer would and fix what makes them hesitate.",
      },
    ],
  },
  {
    slug: "website-web-app-or-mobile-app",
    title: "Website, web app or mobile app? How to choose",
    category: "Digital growth",
    date: "2026-09-15",
    readTime: "5 min read",
    excerpt:
      "Many businesses ask for an app when a well-built website would do the job faster and for less. Here's a practical way to decide.",
    body: [
      {
        text: "“We need an app” is one of the most common things we hear at the start of a project. Sometimes it's true. Often, though, the real need is better served by something simpler, and a simpler build means launching sooner and spending less.",
      },
      {
        heading: "Choose a website when people need to find and trust you",
        text: "If your goal is to be found on Google, explain your services and get enquiries or bookings, a fast, well-structured website is the right tool. It works on every device, needs no download and is the cheapest to keep up.",
      },
      {
        heading: "Choose a web app when people need to do something repeatedly",
        text: "Client portals, booking systems, internal tools and dashboards are web apps. They run in the browser, support logins and data, and can be updated instantly for everyone. For most business tools this is the sweet spot.",
      },
      {
        heading: "Choose a mobile app when the phone itself matters",
        text: "Native apps make sense when customers use the product often (weekly or more) and need phone features such as push notifications, the camera, location or offline access. Otherwise, asking people to download something is a big barrier.",
      },
      {
        heading: "A useful middle ground",
        text: "Progressive web apps can be added to a home screen and send some notifications without an app store. They're a good way to test demand before committing to a full mobile build.",
      },
      {
        heading: "Three questions to ask",
        text: "How often will someone use this? Does it need phone hardware? Will people search for it on Google? Your answers usually point clearly to one option, and you can always grow into the next one later.",
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);

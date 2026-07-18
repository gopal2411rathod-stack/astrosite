export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  keywords: string;
  heroLabel: string;
  sections: {
    heading: string;
    paragraphs: string[];
    points?: string[];
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "plan-scalable-b2b-commerce-platform",
    title: "How to Plan a Scalable B2B Commerce Platform",
    excerpt: "A practical guide to pricing, catalogs, approvals, integrations and customer experience before development starts.",
    category: "Commerce",
    date: "2026-07-10",
    readTime: "6 min read",
    author: "Hegrix Strategy Team",
    keywords: "B2B commerce platform, scalable ecommerce, B2B portal development",
    heroLabel: "B2B",
    sections: [
      {
        heading: "Start with buyer workflows",
        paragraphs: [
          "A strong B2B commerce platform starts with how business buyers actually purchase. Many buyers need account pricing, saved carts, quote requests, approvals, bulk ordering and repeat order tools.",
          "Before development begins, map the full journey from product discovery to invoice, fulfillment and support. This reduces rework and makes the platform easier for sales, operations and customers to adopt.",
        ],
      },
      {
        heading: "Plan the core platform modules",
        paragraphs: ["The platform should be structured around the workflows that create revenue and reduce manual work."],
        points: ["Account-based pricing and customer groups", "Product catalog, variants and availability", "Quote request and approval workflows", "ERP, inventory, payment and shipping integrations", "Order tracking, invoices and customer dashboards"],
      },
      {
        heading: "Build for scale from the first release",
        paragraphs: [
          "Scalability is not only about traffic. It also means clean data structures, role-based permissions, reliable integrations and a content model that marketing and operations teams can manage.",
          "A focused first release should prove the buying workflow, then expand into deeper automation, analytics and personalization.",
        ],
      },
    ],
  },
  {
    slug: "erp-integration-mistakes-growing-teams",
    title: "ERP Integration Mistakes That Slow Growing Teams",
    excerpt: "Avoid common data ownership, workflow and adoption problems that make ERP integrations harder than they need to be.",
    category: "ERP",
    date: "2026-07-08",
    readTime: "5 min read",
    author: "Hegrix Engineering Team",
    keywords: "ERP integration mistakes, ERP implementation, business system integration",
    heroLabel: "ERP",
    sections: [
      {
        heading: "Disconnected data creates hidden cost",
        paragraphs: [
          "ERP integration should create one reliable operating view. When teams connect systems without defining data ownership, duplicate records and reporting conflicts appear quickly.",
          "The safest approach is to decide which system owns customers, products, inventory, orders, invoices and payments before integration work begins.",
        ],
      },
      {
        heading: "Common mistakes to avoid",
        paragraphs: ["Most ERP integration issues come from unclear process design rather than code alone."],
        points: ["Syncing too much data instead of the right data", "Ignoring exception handling and failed sync recovery", "Skipping user permissions and approval workflows", "Treating reports as an afterthought", "Launching without training and adoption support"],
      },
      {
        heading: "Integration should support decisions",
        paragraphs: [
          "A useful ERP integration helps leaders see what is happening across sales, inventory, finance and operations. Dashboards, alerts and clean audit trails turn connected systems into better decisions.",
        ],
      },
    ],
  },
  {
    slug: "where-ai-automation-creates-business-value",
    title: "Where AI Automation Creates Business Value",
    excerpt: "Identify practical AI use cases across support, finance, operations, sales and internal knowledge workflows.",
    category: "AI Automation",
    date: "2026-07-05",
    readTime: "6 min read",
    author: "Hegrix Automation Team",
    keywords: "AI automation, business automation, AI workflow automation",
    heroLabel: "AI",
    sections: [
      {
        heading: "Focus on repeatable work first",
        paragraphs: [
          "AI automation works best when it starts with repeatable, high-volume workflows. Document review, support triage, knowledge search, lead qualification and approval routing are often strong starting points.",
          "The goal is not to replace every decision. It is to reduce repetitive effort, improve consistency and help teams move faster with better context.",
        ],
      },
      {
        heading: "High-value AI automation areas",
        paragraphs: ["Look for workflows where speed, accuracy and structured output matter."],
        points: ["Customer support classification and draft replies", "Invoice and document data extraction", "Internal knowledge search assistants", "Lead scoring and sales follow-up suggestions", "Operations alerts and workflow routing"],
      },
      {
        heading: "Measure the business outcome",
        paragraphs: [
          "AI projects should be measured by reduced handling time, fewer manual errors, faster response times and better process visibility. Clear metrics keep automation practical and commercially useful.",
        ],
      },
    ],
  },
  {
    slug: "core-web-vitals-for-b2b-websites",
    title: "Core Web Vitals for B2B Websites",
    excerpt: "Understand how speed, stability and interaction quality affect search performance, user trust and lead conversion.",
    category: "SEO",
    date: "2026-07-02",
    readTime: "4 min read",
    author: "Hegrix Web Team",
    keywords: "Core Web Vitals, B2B website performance, technical SEO",
    heroLabel: "SEO",
    sections: [
      {
        heading: "Performance affects trust",
        paragraphs: [
          "A B2B website often supports high-value decisions. Slow pages, layout jumps and delayed interactions make the experience feel less reliable before a buyer even reads the offer.",
          "Core Web Vitals help measure whether the page loads quickly, remains stable and responds smoothly.",
        ],
      },
      {
        heading: "What to improve first",
        paragraphs: ["The most common improvements are simple but important."],
        points: ["Optimize images and critical assets", "Reduce unused JavaScript", "Reserve space for media and embeds", "Improve server response time", "Test important pages on mobile devices"],
      },
      {
        heading: "Connect performance with conversion",
        paragraphs: [
          "Performance work is not only technical SEO. It supports paid campaigns, organic search, landing pages and lead forms by helping visitors move through the site without friction.",
        ],
      },
    ],
  },
  {
    slug: "marketplace-features-buyers-expect",
    title: "Marketplace Features Buyers Expect",
    excerpt: "Plan vendor onboarding, payments, moderation, reviews and trust-building features for a stronger marketplace launch.",
    category: "Marketplace",
    date: "2026-06-28",
    readTime: "5 min read",
    author: "Hegrix Product Team",
    keywords: "marketplace development, multi vendor marketplace features, marketplace platform",
    heroLabel: "MKT",
    sections: [
      {
        heading: "Trust is the marketplace product",
        paragraphs: [
          "A marketplace is more than a catalog with multiple sellers. Buyers need confidence in product quality, delivery, pricing, support and dispute handling.",
          "That trust is created through clear vendor onboarding, catalog moderation, reviews, secure payments and transparent order updates.",
        ],
      },
      {
        heading: "Features to plan early",
        paragraphs: ["Some marketplace features are difficult to add late because they affect data models and workflows."],
        points: ["Vendor registration and verification", "Product approval and moderation", "Commission and payout management", "Reviews, ratings and dispute workflows", "Seller dashboards and performance reporting"],
      },
      {
        heading: "Launch with operational clarity",
        paragraphs: [
          "The first release should make buyer, seller and admin workflows clear. Once the operating model works, the platform can expand into promotions, subscriptions, analytics and automation.",
        ],
      },
    ],
  },
  {
    slug: "choose-software-development-partner",
    title: "How to Choose a Software Development Partner",
    excerpt: "Questions to ask before investing in custom software, ecommerce, ERP, AI automation or a platform rebuild.",
    category: "Strategy",
    date: "2026-06-24",
    readTime: "5 min read",
    author: "Hegrix Leadership Team",
    keywords: "software development partner, custom software company, hire software development company",
    heroLabel: "DEV",
    sections: [
      {
        heading: "Look for business understanding",
        paragraphs: [
          "A good software partner should understand the commercial goal, not only the feature list. The right team asks about users, workflows, risks, integrations, launch plans and long-term ownership.",
          "This is especially important for ERP, portals, marketplaces and automation projects where software touches daily operations.",
        ],
      },
      {
        heading: "Questions worth asking",
        paragraphs: ["Use discovery conversations to test clarity and delivery maturity."],
        points: ["How will you validate requirements before development?", "How do you handle scope changes and priorities?", "What does the release and QA process look like?", "How will the system be maintained after launch?", "Can the architecture support future integrations?"],
      },
      {
        heading: "Choose for the full lifecycle",
        paragraphs: [
          "The best partner helps you plan, build, launch and improve. That includes UX, engineering, SEO foundations, analytics, training and support after the first version is live.",
        ],
      },
    ],
  },
];

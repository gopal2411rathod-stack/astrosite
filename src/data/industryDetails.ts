export interface IndustryDetail {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  primaryCta: string;
  secondaryCta: string;
  heroTag: string;
  metrics: { value: string; label: string }[];
  challenges: string[];
  capabilities: { title: string; text: string }[];
  outcomes: string[];
  services: string[];
  relatedLinks: { label: string; href: string }[];
  faq: { title: string; text: string }[];
}

export const industryDetailPages: Record<string, IndustryDetail> = {
  automobile: {
    slug: "automobile",
    eyebrow: "Automobile Software Solutions",
    title: "Digital platforms for automobile dealers, service centers and sales teams.",
    subtitle:
      "Hegrix builds automobile software that connects vehicle inventory, leads, test drives, service bookings, customer communication and reporting in one modern operating system.",
    metaTitle: "Automobile Software Solutions | Dealer, CRM & Service Platforms | Hegrix",
    metaDescription:
      "Automobile software solutions for dealers, showrooms and service centers, including CRM, inventory, booking, customer portals and reporting dashboards.",
    keywords: "automobile software solutions, automobile CRM, dealer management software, vehicle inventory software",
    primaryCta: "Plan automobile software",
    secondaryCta: "Explore automotive ERP",
    heroTag: "AUTO",
    metrics: [
      { value: "360", label: "Customer and vehicle view" },
      { value: "CRM", label: "Lead to delivery tracking" },
      { value: "24/7", label: "Service booking access" },
    ],
    challenges: [
      "Leads spread across phone, website and walk-ins",
      "Manual vehicle inventory updates",
      "Slow test drive and booking coordination",
      "Disconnected sales and service records",
      "Limited visibility into team performance",
      "Poor customer follow-up consistency",
    ],
    capabilities: [
      { title: "Dealer CRM", text: "Track inquiries, follow-ups, test drives, quotations and deal stages from one sales dashboard." },
      { title: "Vehicle Inventory", text: "Manage new, used and demo vehicle listings with pricing, availability, media and specifications." },
      { title: "Service Booking", text: "Let customers request appointments, service history, estimates and status updates online." },
      { title: "Customer Portal", text: "Give buyers a secure place to view documents, invoices, bookings and communication." },
      { title: "Sales Reporting", text: "Monitor lead sources, conversion rates, salesperson performance and revenue trends." },
      { title: "Integrations", text: "Connect accounting, payment, marketing, WhatsApp, inventory and website systems." },
    ],
    outcomes: ["Improve lead response speed", "Increase sales pipeline visibility", "Reduce manual coordination", "Improve customer retention", "Create cleaner sales reports", "Support multi-location operations"],
    services: ["CRM design", "Dealer portal development", "Inventory migration", "Booking workflow setup", "Third-party integrations", "Analytics dashboards"],
    relatedLinks: [
      { label: "Automotive ERP", href: "/industries/automotive/" },
      { label: "Customer Portal", href: "/solutions/customer-portal/" },
      { label: "ERP Integration", href: "/solutions/erp-integration/" },
    ],
    faq: [
      { title: "Can automobile software support multiple branches?", text: "Yes. Hegrix can build role-based branch, showroom and service center access with centralized reporting." },
      { title: "Can it connect with my existing website?", text: "Yes. Vehicle inventory, lead forms, booking workflows and CRM data can be connected to your current website." },
    ],
  },
  automotive: {
    slug: "automotive",
    eyebrow: "Automotive ERP Software Solutions",
    title: "Connected ERP systems for automotive manufacturing and distribution.",
    subtitle:
      "Hegrix helps automotive manufacturers, component suppliers, distributors and service networks centralize production, procurement, inventory, quality, finance and analytics.",
    metaTitle: "Automotive ERP Software Solutions | Manufacturing & Parts ERP | Hegrix",
    metaDescription:
      "Automotive ERP software for manufacturers, auto parts suppliers, distributors and service centers, covering inventory, production, procurement, quality and finance.",
    keywords: "automotive ERP software solutions, automotive ERP, auto parts ERP, automotive manufacturing ERP",
    primaryCta: "Book ERP consultation",
    secondaryCta: "View ERP integration",
    heroTag: "ERP",
    metrics: [
      { value: "ERP", label: "One operating platform" },
      { value: "BOM", label: "Production and routing control" },
      { value: "BI", label: "Real-time performance data" },
    ],
    challenges: [
      "Complex supplier and parts networks",
      "Production planning delays",
      "Inventory shortages or excess stock",
      "Quality inspection gaps",
      "Manual procurement approvals",
      "Disconnected finance and operations",
    ],
    capabilities: [
      { title: "Production Planning", text: "Manage work orders, BOMs, routings, capacity, scheduling and production progress." },
      { title: "Inventory Management", text: "Track raw materials, spare parts, finished goods, warehouses, transfers and batches." },
      { title: "Procurement Automation", text: "Control purchase requests, vendor quotations, approvals, POs and delivery tracking." },
      { title: "Quality Control", text: "Build inspection checkpoints, compliance records and non-conformance workflows." },
      { title: "Finance Integration", text: "Connect purchasing, inventory valuation, invoices, receivables and financial reporting." },
      { title: "Executive Dashboards", text: "Give leaders visibility into cost, stock, production, margins and supplier performance." },
    ],
    outcomes: ["Increase production efficiency", "Improve inventory accuracy", "Reduce procurement delays", "Strengthen quality control", "Improve supplier accountability", "Make faster operational decisions"],
    services: ["ERP consulting", "Process mapping", "Module customization", "Data migration", "User training", "Ongoing support"],
    relatedLinks: [
      { label: "ERP Integration", href: "/solutions/erp-integration/" },
      { label: "Manufacturing", href: "/industries/manufacturing/" },
      { label: "AI Automation", href: "/solutions/ai-business-automation/" },
    ],
    faq: [
      { title: "Can automotive ERP be customized?", text: "Yes. Workflows, approvals, dashboards, roles and integrations can be tailored around your automotive operation." },
      { title: "Does it support warehouses and suppliers?", text: "Yes. It can support multiple warehouses, stock transfers, supplier management and procurement workflows." },
    ],
  },
  "real-estate": {
    slug: "real-estate",
    eyebrow: "Real Estate Software Solutions",
    title: "Real estate platforms that turn property interest into qualified leads.",
    subtitle:
      "Hegrix designs real estate websites, CRM systems, booking workflows and client portals that help agencies, developers and property teams manage listings and inquiries.",
    metaTitle: "Real Estate Software Solutions | Property Portals & CRM | Hegrix",
    metaDescription:
      "Real estate software solutions for property portals, lead management, booking workflows, CRM, document portals and sales dashboards.",
    keywords: "real estate software solutions, property portal development, real estate CRM, real estate website development",
    primaryCta: "Build a property platform",
    secondaryCta: "View customer portals",
    heroTag: "PROP",
    metrics: [
      { value: "CRM", label: "Lead and inquiry tracking" },
      { value: "MLS", label: "Property listing workflows" },
      { value: "360", label: "Client communication view" },
    ],
    challenges: ["Manual listing updates", "Lost inquiries from multiple channels", "Slow site visit scheduling", "Disconnected agent follow-up", "Limited campaign attribution", "Document sharing friction"],
    capabilities: [
      { title: "Property Portal", text: "Build searchable listing portals with filters, media, maps, availability and inquiry flows." },
      { title: "Lead Management", text: "Route inquiries, track follow-ups, manage pipeline stages and measure source performance." },
      { title: "Booking Workflows", text: "Manage site visits, callbacks, agent availability and automated reminders." },
      { title: "Client Portal", text: "Share documents, updates, invoices, appointments and support communication securely." },
      { title: "Marketing Landing Pages", text: "Launch SEO-friendly project pages and campaign landing pages for property launches." },
      { title: "Analytics Dashboards", text: "Track leads, listings, conversion, agent activity and campaign ROI." },
    ],
    outcomes: ["Improve inquiry conversion", "Reduce missed follow-ups", "Speed up property discovery", "Improve agent productivity", "Centralize documents", "Make marketing measurable"],
    services: ["Property portal development", "Real estate CRM", "Listing migration", "Booking automation", "SEO landing pages", "Dashboard setup"],
    relatedLinks: [
      { label: "Customer Portal", href: "/solutions/customer-portal/" },
      { label: "Custom Software", href: "/services/custom-software-development/" },
      { label: "Digital Marketing", href: "/contact-us/?service=Digital%20Marketing" },
    ],
    faq: [
      { title: "Can you build a custom property listing website?", text: "Yes. Hegrix can build listing portals with filters, inquiry forms, maps, media galleries and CRM workflows." },
      { title: "Can real estate leads connect to CRM?", text: "Yes. Leads can be captured from forms, ads and portals, then routed into CRM pipelines and dashboards." },
    ],
  },
  "diamond-jewelry": {
    slug: "diamond-jewelry",
    eyebrow: "Diamond & Jewelry Software Solutions",
    title: "Secure inventory, ecommerce and CRM systems for jewelry businesses.",
    subtitle:
      "Hegrix builds software for diamond traders, jewelry retailers, manufacturers and wholesalers that need precise inventory, certification, order and customer management.",
    metaTitle: "Diamond & Jewelry Software Solutions | Inventory, CRM & eCommerce | Hegrix",
    metaDescription:
      "Diamond and jewelry software for inventory, certification, ecommerce, CRM, order management, pricing, catalogs and business reporting.",
    keywords: "diamond jewelry software solutions, jewelry inventory software, diamond inventory system, jewelry ecommerce development",
    primaryCta: "Plan jewelry software",
    secondaryCta: "Explore ecommerce",
    heroTag: "GEM",
    metrics: [
      { value: "SKU", label: "Precise stock tracking" },
      { value: "CERT", label: "Certificate management" },
      { value: "CRM", label: "Customer and order history" },
    ],
    challenges: ["Complex product attributes", "Certificate and grading records", "Stock movement accuracy", "Custom order tracking", "Pricing and margin control", "Online catalog management"],
    capabilities: [
      { title: "Inventory Management", text: "Track diamonds, jewelry items, variants, certificates, images, locations and stock movement." },
      { title: "B2B Catalog", text: "Create secure catalogs for dealers, wholesalers and selected buyers with controlled pricing." },
      { title: "eCommerce Storefront", text: "Launch fast, SEO-friendly storefronts with product filters, wishlists and inquiry flows." },
      { title: "Order Management", text: "Manage custom orders, resizing, repairs, invoices, delivery and customer communication." },
      { title: "CRM", text: "Track buyer preferences, purchase history, follow-ups and high-value customer relationships." },
      { title: "Reporting", text: "Monitor inventory value, sales, margins, fast-moving products and team activity." },
    ],
    outcomes: ["Improve stock accuracy", "Reduce manual catalog work", "Protect pricing control", "Improve customer experience", "Speed up order handling", "Gain clearer margin visibility"],
    services: ["Jewelry inventory system", "B2B catalog development", "eCommerce development", "CRM implementation", "Data migration", "Reporting dashboards"],
    relatedLinks: [
      { label: "eCommerce Development", href: "/services/ecommerce-development/" },
      { label: "B2B Commerce Platform", href: "/solutions/b2b-commerce-platform/" },
      { label: "Inventory & POS", href: "/solutions/inventory-pos-system/" },
    ],
    faq: [
      { title: "Can jewelry software manage certificates?", text: "Yes. Certificate numbers, grading details, images and documents can be stored and connected with inventory records." },
      { title: "Can it support B2B and retail customers?", text: "Yes. Hegrix can build customer groups, controlled pricing, dealer catalogs and retail ecommerce workflows." },
    ],
  },
  "media-entertainment": {
    slug: "media-entertainment",
    eyebrow: "Media & Entertainment Software Solutions",
    title: "Content, booking and audience platforms for modern media teams.",
    subtitle:
      "Hegrix builds software for media companies, creators, production teams and entertainment businesses that need content workflows, audience engagement and digital revenue tools.",
    metaTitle: "Media & Entertainment Software Solutions | Content & Audience Platforms | Hegrix",
    metaDescription:
      "Media and entertainment software for content portals, streaming workflows, booking systems, campaign tools, subscriptions and audience dashboards.",
    keywords: "media entertainment software solutions, content platform development, entertainment booking software, audience engagement platform",
    primaryCta: "Build a media platform",
    secondaryCta: "Explore AI automation",
    heroTag: "MEDIA",
    metrics: [
      { value: "CMS", label: "Content workflow control" },
      { value: "SUB", label: "Audience and subscription tools" },
      { value: "BI", label: "Engagement analytics" },
    ],
    challenges: ["Scattered content approvals", "Manual booking workflows", "Limited audience data", "Slow campaign reporting", "Content monetization gaps", "Poor creator or partner portals"],
    capabilities: [
      { title: "Content Portal", text: "Build editorial, video, audio or resource portals with structured publishing workflows." },
      { title: "Booking Platform", text: "Manage events, talent, venues, schedules, availability and customer inquiries." },
      { title: "Audience Dashboards", text: "Track engagement, subscriptions, campaign performance and content trends." },
      { title: "Partner Portals", text: "Give creators, advertisers or partners a secure dashboard for assets and reporting." },
      { title: "Marketing Automation", text: "Automate campaigns, notifications, newsletters and audience segmentation." },
      { title: "AI Workflows", text: "Use AI for tagging, summaries, content search, moderation and support workflows." },
    ],
    outcomes: ["Publish content faster", "Improve audience engagement", "Reduce manual coordination", "Create better partner visibility", "Support paid digital products", "Measure campaign performance"],
    services: ["Content platform development", "Booking workflow design", "Subscription systems", "Partner portals", "AI automation", "Analytics dashboards"],
    relatedLinks: [
      { label: "AI Business Automation", href: "/solutions/ai-business-automation/" },
      { label: "Customer Portal", href: "/solutions/customer-portal/" },
      { label: "Custom Software", href: "/services/custom-software-development/" },
    ],
    faq: [
      { title: "Can you build a content management platform?", text: "Yes. Hegrix can build structured CMS workflows, approval stages, media libraries and publishing interfaces." },
      { title: "Can media platforms include subscriptions?", text: "Yes. Subscription, membership, gated content and payment workflows can be added based on the business model." },
    ],
  },
  logistics: {
    slug: "logistics",
    eyebrow: "Logistics Software Solutions",
    title: "Logistics platforms for shipment visibility, routing and partner coordination.",
    subtitle:
      "Hegrix builds logistics software that helps transporters, warehouses, distributors and delivery teams track shipments, automate workflows and improve customer visibility.",
    metaTitle: "Logistics Software Solutions | Shipment, Route & Partner Portals | Hegrix",
    metaDescription:
      "Logistics software solutions for shipment tracking, route visibility, warehouse workflows, partner portals, delivery dashboards and automation.",
    keywords: "logistics software solutions, shipment tracking software, logistics portal development, route tracking software",
    primaryCta: "Plan logistics software",
    secondaryCta: "View ERP integration",
    heroTag: "SHIP",
    metrics: [
      { value: "GPS", label: "Route and shipment visibility" },
      { value: "SLA", label: "Delivery performance tracking" },
      { value: "API", label: "Carrier and ERP integrations" },
    ],
    challenges: ["Manual shipment status updates", "Limited route visibility", "Partner coordination delays", "Warehouse handoff issues", "Customer support pressure", "Disconnected billing and delivery data"],
    capabilities: [
      { title: "Shipment Dashboard", text: "Track shipment status, milestones, exceptions, documents and customer updates." },
      { title: "Route Visibility", text: "Monitor routes, drivers, delivery windows and service performance." },
      { title: "Partner Portal", text: "Give carriers, vendors and customers role-based access to operational updates." },
      { title: "Warehouse Workflows", text: "Improve receiving, dispatch, transfers, barcode scanning and stock handoffs." },
      { title: "Customer Notifications", text: "Automate SMS, email or WhatsApp updates for shipment and delivery events." },
      { title: "Reporting", text: "Measure delivery performance, exceptions, costs, utilization and customer satisfaction." },
    ],
    outcomes: ["Improve shipment visibility", "Reduce support calls", "Speed up partner coordination", "Improve delivery performance", "Connect billing and operations", "Create reliable operational reports"],
    services: ["Shipment portal development", "Route tracking dashboards", "Warehouse workflow design", "API integrations", "Customer notification setup", "Analytics dashboards"],
    relatedLinks: [
      { label: "ERP Integration", href: "/solutions/erp-integration/" },
      { label: "Customer Portal", href: "/solutions/customer-portal/" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops/" },
    ],
    faq: [
      { title: "Can logistics software integrate with carriers?", text: "Yes. Hegrix can connect carrier APIs, ERP systems, warehouse tools and notification services." },
      { title: "Can customers track shipments online?", text: "Yes. A customer portal can show status, milestones, documents, delivery updates and support communication." },
    ],
  },
  advertising: {
    slug: "advertising",
    eyebrow: "Advertising Software Solutions",
    title: "Campaign, client portal and reporting systems for advertising teams.",
    subtitle:
      "Hegrix helps advertising agencies and marketing teams organize campaigns, creative workflows, approvals, client communication and performance reporting.",
    metaTitle: "Advertising Software Solutions | Campaign, Client Portal & Reporting | Hegrix",
    metaDescription:
      "Advertising software solutions for campaign management, creative workflows, client portals, approvals, reporting dashboards and marketing automation.",
    keywords: "advertising software solutions, campaign management software, agency client portal, marketing reporting dashboard",
    primaryCta: "Build advertising software",
    secondaryCta: "Explore client portals",
    heroTag: "ADS",
    metrics: [
      { value: "ROI", label: "Campaign performance view" },
      { value: "CRM", label: "Client and approval tracking" },
      { value: "AUTO", label: "Reporting automation" },
    ],
    challenges: ["Campaign data spread across tools", "Manual client reporting", "Slow creative approvals", "Unclear project ownership", "Repeated status meetings", "Limited workflow visibility"],
    capabilities: [
      { title: "Campaign Management", text: "Plan campaigns, tasks, budgets, channels, assets, deadlines and ownership in one place." },
      { title: "Client Portal", text: "Share campaign status, approvals, reports, documents and communication with clients securely." },
      { title: "Creative Workflow", text: "Manage briefs, assets, feedback, revisions, approvals and final deliverables." },
      { title: "Reporting Dashboard", text: "Unify campaign data and generate performance views for internal and client teams." },
      { title: "Marketing Automation", text: "Automate follow-ups, notifications, report delivery and workflow reminders." },
      { title: "Integrations", text: "Connect analytics, CRM, ad platforms, email tools and project management systems." },
    ],
    outcomes: ["Reduce manual reporting", "Improve client transparency", "Speed up approvals", "Centralize campaign work", "Measure performance clearly", "Improve team accountability"],
    services: ["Campaign platform development", "Agency client portals", "Dashboard automation", "Workflow design", "Ad platform integrations", "Reporting setup"],
    relatedLinks: [
      { label: "Customer Portal", href: "/solutions/customer-portal/" },
      { label: "AI Business Automation", href: "/solutions/ai-business-automation/" },
      { label: "Custom Software", href: "/services/custom-software-development/" },
    ],
    faq: [
      { title: "Can advertising reports be automated?", text: "Yes. Campaign data can be pulled into dashboards and scheduled reports for clients or internal teams." },
      { title: "Can clients approve creative assets online?", text: "Yes. A client portal can include comments, approvals, version history and final asset delivery." },
    ],
  },
};

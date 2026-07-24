import { industryPages, servicePages, solutionPages } from "../data/catalog";
import { blogPosts } from "../data/blog";

const pages = [
  "/",
  "/about-us/",
  "/services/",
  ...servicePages.map((page) => `/services/${page.slug}/`),
  "/solutions/",
  ...solutionPages.map((page) => `/solutions/${page.slug}/`),
  "/industries/",
  ...industryPages.map((page) => `/industries/${page.slug}/`),
  "/portfolio/",
  "/case-studies/",
  "/blog/",
  ...blogPosts.map((post) => `/blog/${post.slug}/`),
  "/careers/",
  "/contact-us/",
  "/faq/",
  "/privacy-policy/",
  "/terms-and-conditions/",
];

export async function GET() {
  const site = "https://hegrix.com";
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${site}${page}</loc>
    <changefreq>${page === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${page === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

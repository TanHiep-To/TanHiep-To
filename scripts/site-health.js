const fs = require("fs");
const path = require("path");

const requiredFiles = [
  "index.html",
  "about.html",
  "projects.html",
  "research.html",
  "blog.html",
  "contact.html",
  "feed.xml",
  "sitemap.xml",
  "robots.txt",
];

const requiredPostSnippets = [
  "posts/rag-in-production.html",
  "posts/learning-journey.html",
  "posts/first-ai-recsys-notes.html",
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(__dirname, "..", file)));

if (missing.length) {
  console.error("Missing required files:", missing.join(", "));
  process.exit(1);
}

const sitemapPath = path.join(__dirname, "..", "sitemap.xml");
const sitemap = fs.readFileSync(sitemapPath, "utf8");

const missingInSitemap = requiredPostSnippets.filter((snippet) => !sitemap.includes(snippet));
if (missingInSitemap.length) {
  console.error("Missing posts in sitemap:", missingInSitemap.join(", "));
  process.exit(1);
}

const feedPath = path.join(__dirname, "..", "feed.xml");
const feed = fs.readFileSync(feedPath, "utf8");

if (!feed.includes("<item>")) {
  console.error("RSS feed has no items.");
  process.exit(1);
}

console.log("Site health check passed.");

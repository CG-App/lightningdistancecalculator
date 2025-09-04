/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://lightningdistancecalculator.com", // 👈 always apex
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/_not-found"], // app router default
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://lightningdistancecalculator.com/sitemap-0.xml",
    ],
  },
};

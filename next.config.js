module.exports = {
  pageExtensions: ["*.page.js","*.page.jsx"],
  reactStrictMode: true,
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
    });
    return cfg;
  }
};

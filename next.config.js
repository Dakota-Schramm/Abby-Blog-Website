module.exports = {
  pageExtensions: ['page.jsx', 'page.js'],
  reactStrictMode: true,
  pageExtensions: ['page.js', 'page.jsx'],
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
    });
    return cfg;
  }
};

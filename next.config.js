module.exports = {
  reactStrictMode: true,
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
    });
    return cfg;
  },
  images: {
    loader: "imgix",
    path: "http://localhost:3000",
  },
};

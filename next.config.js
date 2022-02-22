const fetchURL =
  "https://github.com/Dakota-Schramm/nextjs-netlify-blog-template/tree/main/public/img";

module.exports = {
  reactStrictMode: true,
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
    });
    return cfg;
  },
  target: "serverless",
  images: {
    loader: "cloudinary",
    path: `https://res.cloudinary.com/deohelidx/image/fetch/${fetchURL}`,
  },
};

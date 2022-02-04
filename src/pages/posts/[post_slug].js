import Link from "next/link";

import Layout from "../../components/Layout";

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>;

  return (
    <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
      <Link href="/posts/">
        <a>Back to post list</a>
      </Link>
      <article>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: markdownBody }}></div>
      </article>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const { post_slug } = ctx.params;

  const config = await import("../../../siteconfig.json");
  const { attributes, html } = await import(
    `../../../public/blog-posts/${post_slug}.md`
  );

  return {
    props: {
      siteTitle: config.title,
      frontmatter: attributes,
      markdownBody: html,
    },
  };
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys?.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
      const { attributes, html } = values[index];

      return {
        frontmatter: attributes,
        markdownBody: html,
        slug,
      };
    });
    return data;
  })(require.context("../../../public/blog-posts", true, /\.md$/));

  const paths = blogSlugs.map((post) => {
    return {
      params: { post_slug: post.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

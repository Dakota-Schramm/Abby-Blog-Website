import Link from "next/link";
import Image from "next/image";

import optimizeTitleForSEO from "../../scripts/RoutingParams";
import formatDateToCustomString from "../../scripts/formatDate";

import Layout from "../../components/Layout";

const deftaultCoverImage = "/img/30c79efa5819b7987bde857f620e6c3e.jpg";

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>;

  const formattedDate = formatDateToCustomString(frontmatter.date);

  return (
    <Layout
      pageTitle={`${siteTitle} | ${frontmatter.title}`}
      pageStyle="content-section"
    >
      <Link href="/posts/">
        <a>Back to post list</a>
      </Link>
      <article className="blogpost-article">
        <h1 className="blogpost-title">
          <em>{frontmatter.title}</em>
        </h1>
        <h2 className="blogpost-subtitle">{`Posted on ${formattedDate}`}</h2>
        <Image
          src={`/${frontmatter.image || deftaultCoverImage}`}
          alt="A cover banner for the blog post."
          height="20vh"
          width="100vw"
          className="blogpost-cover-image"
        />
        <div
          className="blogpost-markdown"
          dangerouslySetInnerHTML={{ __html: markdownBody }}
        ></div>
      </article>
    </Layout>
  );
}

// Find and load the correct blog post for a given route
export async function getStaticProps(ctx) {
  const { post_slug } = ctx.params;

  const config = await import("../../../siteconfig.json");

  // Find blogPost with given title.
  const blogPost = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    let slugToFind;
    // Find file that has our post_slug included in the fileName
    console.log("looking for ", post_slug);
    keys.forEach((key, index) => {
      console.log("current key is: ", key);
      const titleFormatted = optimizeTitleForSEO(key);
      if (titleFormatted.includes(post_slug)) {
        console.log(post_slug, " included in ", key);
        slugToFind = values[index];
      }
    });

    return {
      frontmatter: slugToFind.attributes,
      markdownBody: slugToFind.html,
    };
  })(require.context("../../../public/blog-posts", true, /\.md$/));

  return {
    props: {
      siteTitle: config.title,
      frontmatter: blogPost.frontmatter,
      markdownBody: blogPost.markdownBody,
    },
  };
}

// Build out all posts from blog-post folder
export async function getStaticPaths() {
  // Get all blog posts and load their content
  const blogSlugs = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys?.map((key, index) => {
      const { attributes, html } = values[index];

      return {
        frontmatter: attributes,
        markdownBody: html,
      };
    });
    return data;
  })(require.context("../../../public/blog-posts", true, /\.md$/));

  // Build out paths based on blog post titles
  const paths = blogSlugs.map((post) => {
    const builtPostSlug = optimizeTitleForSEO(post.frontmatter.title);
    return {
      params: { post_slug: builtPostSlug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

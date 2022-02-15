import Link from "next/link";
import Image from "next/image";

import Layout from "../../components/Layout";

const deftaultCoverImage = "/img/30c79efa5819b7987bde857f620e6c3e.jpg";

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>;

  return (
    <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
      <Link href="/posts/">
        <a>Back to post list</a>
      </Link>
      <article>
        <h1>{frontmatter.title}</h1>
        <Image
          src={`/${frontmatter.image || deftaultCoverImage}`}
          alt="A cover banner for the blog post."
          height="20vh"
          width="100vw"
          className="cover-image"
        />
        <div dangerouslySetInnerHTML={{ __html: markdownBody }}></div>
      </article>
    </Layout>
  );
}

export async function getStaticProps(ctx) {
  const { post_slug } = ctx.params;

  const config = await import("../../../siteconfig.json");

  const blogPost = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    let data;
    keys.forEach((key, index) => {
      if (key.includes(post_slug)) {
        console.log(values[index]);
        data = values[index];
      }
    });

    return {
      frontmatter: data.attributes,
      markdownBody: data.html,
    };
  })(require.context("../../../public/blog-posts", true, /\.md$/));

  console.log(blogPost);

  return {
    props: {
      siteTitle: config.title,
      frontmatter: blogPost.frontmatter,
      markdownBody: blogPost.markdownBody,
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
      params: { post_slug: post.frontmatter.title },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

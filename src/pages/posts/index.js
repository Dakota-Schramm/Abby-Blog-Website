import Link from "next/link";

import optimizeTitleForSEO from "../../scripts/RoutingParams";

import Layout from "../../components/Layout";
import PostList from "../../components/PostList";

export default function Blog({ posts, title, description, ...props }) {
  const mostRecent = posts.slice(0, 5);

  return (
    <Layout pageTitle={`${title} | Blog`}>
      <h1 className="title">Welcome to my blog!</h1>
      <div className="subtitle">
        <p className="description">{description}</p>
        <h2 className="most-recent-title">Most Recent:</h2>
        <ul className="most-recent">
          {mostRecent.map((post) => {
            const postTitleFormatted = optimizeTitleForSEO(
              post.frontmatter.title
            );
            return (
              <li className="most-recent-item" key={post.frontmatter.title}>
                <Link href={`/posts/${encodeURIComponent(postTitleFormatted)}`}>
                  <a className="post-title">{post.frontmatter.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <h2 className="posts-section-title">Posts:</h2>
      <main>
        <PostList posts={posts} />
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const config = await import("../../../siteconfig.json");

  // Get posts so we can render the most recent at top of page and pass to PostList.
  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    // Map each post from blog-posts to an object.
    const data = keys?.map((key, index) => {
      const { attributes, html } = values[index];

      return {
        frontmatter: attributes,
        markdownBody: html,
      };
    });

    data.reverse(); // Most recent first
    return data;
  })(require.context("../../../public/blog-posts/", true, /\.md$/));

  return {
    props: {
      posts,
      title: config.default.title,
      description: config.default.description,
    },
  };
}

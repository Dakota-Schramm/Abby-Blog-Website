import Link from "next/link";

import Layout from "../../components/Layout";
import PostList from "../../components/PostList";

export default function Blog({ posts, title, description, ...props }) {
  const mostRecent = posts.slice(0, 5);

  return (
    <Layout pageTitle={`${title} | Blog`}>
      <h1 className="title">Welcome to my blog!</h1>
      <div className="subtitle">
        <p className="description">{description}</p>
        <ul className="most-recent">
          {mostRecent.map((post) => {
            return (
              <li className="most-recent-item" key={post.slug}>
                <Link href={`/posts/${encodeURIComponent(post.slug)}`}>
                  <a className="post-title">{post.frontmatter.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <main>
        <PostList posts={posts} />
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const config = await import("../../../siteconfig.json");

  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys?.map((key, index) => {
      const { attributes, html } = values[index];
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
      // This passes file name directly to post_slug -- clean it first for better url
      const arr = slug.split("_");
      const blogTitle = arr[1];

      return {
        frontmatter: attributes,
        markdownBody: html,
        blogTitle,
      };
    });
    // Sort the posts -- Newest first ??
    // At least need this ordering for the blog section above.:w

    data.reverse();
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

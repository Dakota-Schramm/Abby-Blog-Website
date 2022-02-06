import Layout from "../../components/Layout";
import PostList from "../../components/PostList";

export default function Blog({ posts, title, description, ...props }) {
  return (
    <Layout pageTitle={`${title} | Blog`}>
      <h1 className="title">Welcome to my blog!</h1>
      <p className="description">{description}</p>
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
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
      const { attributes, html } = values[index];

      return {
        frontmatter: attributes,
        markdownBody: html,
        slug,
      };
    });
    return data;
  })(require.context("../../../public/blog-posts/", true, /\.md$/));

  console.log(posts);

  return {
    props: {
      posts,
      title: config.default.title,
      description: config.default.description,
    },
  };
}

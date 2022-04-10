import Link from "next/link";
import { useState , useEffect } from 'react'

import optimizeTitleForSEO from "../../scripts/RoutingParams";

import Layout from "../../components/Layout";
import PostList from "../../components/post-list";

export default function Blog({ posts, title, description, ...props }) {
  const mostRecent = posts.slice(0, 5);
  
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPosts, setCurrentPosts] = useState(posts.slice(0, 8));
  const MAX_PAGE = Math.floor(posts.length / 8);

  useEffect(() => {
    setCurrentPosts(posts.slice((8 * currentPage), (8 * (currentPage + 1))))
  }, [currentPage])

  return (
    <Layout pageTitle={`${title} | Blog`}>
      <h1 className="title">Welcome to my blog!</h1>
      <div className="subtitle">
        <p className="description">{description}</p>
      </div>
      <h2 className="most-recent-title">Most Recent:</h2>
      <div className="content-section">
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
        <PostList posts={currentPosts} />
          <div className="blog-index"> 
            <button className="blog-index-btn" onClick={() => setCurrentPage(1)}>
                {`<<`}
              </button>
            <button className="blog-index-btn" onClick={() => setCurrentPage(currentPage >= 1 ? currentPage - 1 : 1)}>
              {`<`}
            </button>
            <div className="blog-index-btn blog-index-num">{currentPage}</div>
            <button className="blog-index-btn" onClick={() => setCurrentPage(currentPage < MAX_PAGE ? currentPage + 1 : MAX_PAGE ) }>
              {`>`}
            </button>
            <button className="blog-index-btn" onClick={() => setCurrentPage(MAX_PAGE)} >
              {`>>`}
            </button>
          </div>
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

import Link from "next/link";
import { useState , useEffect } from 'react'

import optimizeTitleForSEO from "../../scripts/RoutingParams";

import Layout from "../../components/Layout";
import PostList from "../../components/post-list";

/* 
  TODO 
  Fix jump to top of page to go to Posts section instead?
  if on first or last page, don't jump to top of page.

  Use jQuery for 
*/

export default function Blog({ posts, title, description, ...props }) {
  const mostRecent = posts.slice(0, 5);
  
  const [currentPage, setCurrentPage] = useState(0)
  const [currentPosts, setCurrentPosts] = useState(posts.slice(0, 8));
  const MAX_PAGE = Math.floor(posts.length / 8);

  useEffect(() => {
    setCurrentPosts(posts.slice((8 * currentPage), (8 * (currentPage + 1))))
  }, [currentPage])

  function PageIndexer () {
    function FirstButton () {
      const INACTIVE = currentPage === 0 
      let buttonStyle = "blog-index-btn";
      if (INACTIVE) buttonStyle += " blog-index-not-active" 

      return (
        <button href={!INACTIVE ? "#" : null} className={buttonStyle} 
          onClick={() => {
            setCurrentPage(0)
            if (!INACTIVE) window.scrollTo(0, 0) 
          }} 
        >
            {`<<`}
        </button>
      )
    }


    function LeftButton () {
      const INACTIVE = currentPage === 0 

      let buttonStyle = "blog-index-btn";
      if (INACTIVE) buttonStyle += " blog-index-not-active" 

      return (
        <button href={!INACTIVE ? "#" : null}
          className={buttonStyle} 
          onClick={() => {
            setCurrentPage(currentPage > 0 
              ? currentPage - 1 
              : 0
            )
            if (!INACTIVE) window.scrollTo(0, 0) 
          }}
        >
          {`<`}
        </button>
      )
    }

    function RightButton () {
      const INACTIVE = currentPage === MAX_PAGE;

      let buttonStyle = "blog-index-btn";
      if (INACTIVE) buttonStyle += " blog-index-not-active" 

      return (
        <button href={!INACTIVE ? "#" : null} className={buttonStyle} 
          onClick={() => {
            setCurrentPage(currentPage < MAX_PAGE 
              ? currentPage + 1 
              : MAX_PAGE 
            ) 
            if (!INACTIVE) window.scrollTo(0, 0) 
          } 
            
          }
        >
          {`>`}
        </button>
      )
    }

    function LastButton () {
      const INACTIVE = currentPage === MAX_PAGE;

      let buttonStyle = "blog-index-btn";
      if (INACTIVE) buttonStyle += " blog-index-not-active" 

      return (
        <button href={!INACTIVE ? "#" : null} 
          className={buttonStyle} 
          onClick={() => {
            setCurrentPage(MAX_PAGE)
            if (!INACTIVE) window.scrollTo(0, 0) 
          }}
        >
          {`>>`}
        </button>
      )
    }

    return (
      <section className="blog-index"> 
        <FirstButton />
        <LeftButton />
        <div className="blog-index-btn blog-index-num">{currentPage + 1}</div>
        <RightButton />
        <LastButton />
      </section>
    )

  }


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
          <PageIndexer />
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

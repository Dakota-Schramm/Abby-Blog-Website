import Link from "next/link";

import optimizeTitleForSEO from "../scripts/RoutingParams";
import formatDateToCustomString from "../scripts/formatDate";

export default function PostList({ posts }) {
  if (posts === "undefined") return null;

  return (
    <div className="post-list">
      {posts ? (
        posts.map((post) => {
          const formattedDate = formatDateToCustomString(post.frontmatter.date);

          const builtURL = optimizeTitleForSEO(post.frontmatter.title);
          const firstParagraph = post.markdownBody.split("\n")[0];

          return (
            <div className="post-entry" key={post.slug}>
              <Link href={`/posts/${encodeURIComponent(builtURL)}`}>
                <a className="post-title">{post.frontmatter.title}</a>
              </Link>
              <div className="post-sub-title">
                {`Posted on ${formattedDate}`}
              </div>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: firstParagraph }}
              ></div>
              <Link href={`/posts/${encodeURIComponent(builtURL)}`}>
                <a>Read more...</a>
              </Link>
            </div>
          );
        })
      ) : (
        <div>No posts!</div>
      )}
    </div>
  );
}

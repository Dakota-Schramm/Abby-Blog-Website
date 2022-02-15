import Link from "next/link";

export default function PostList({ posts }) {
  if (posts === "undefined") return null;

  return (
    <div className="post-list">
      {!posts && <div>No posts!</div>}
      {posts &&
        posts.map((post) => {
          /* Need to update so that
              date string is formatted
              frontmatter.title is properly formatted for route
          */

          const d = new Date(post.frontmatter.date);
          const firstParagraph = post.markdownBody.split("\n")[0];

          return (
            <div className="post-entry" key={post.slug}>
              <Link
                href={`/posts/${encodeURIComponent(post.frontmatter.title)}`}
              >
                <a className="post-title">{post.frontmatter.title}</a>
              </Link>
              <div className="post-sub-title">
                {`Posted on ${d.toDateString()}`}
              </div>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: firstParagraph }}
              ></div>
              <Link href={`/posts/${encodeURIComponent(post.slug)}`}>
                <a>Read more...</a>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

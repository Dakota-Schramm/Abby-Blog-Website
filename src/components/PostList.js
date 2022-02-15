import Link from "next/link";

export default function PostList({ posts }) {
  if (posts === "undefined") return null;

  return (
    <div>
      {!posts && <div>No posts!</div>}
      {posts &&
        posts.map((post) => {
          const d = new Date(post.frontmatter.date);

          return (
            <div className="post-entry" key={post.slug}>
              <Link href={`/posts/${encodeURIComponent(post.slug)}`}>
                <a className="post-title">{post.frontmatter.title}</a>
              </Link>
              <div className="post-sub-title">
                {`Posted on ${d.toDateString()}`}
              </div>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.markdownBody }}
              ></div>
            </div>
          );
        })}
    </div>
  );
}

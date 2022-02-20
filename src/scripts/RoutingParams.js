export default function optimizeTitleForSEO(blogTitle) {
  const lowercaseSlug = blogTitle.toLowerCase();
  const slugArr = lowercaseSlug.split(" ");
  return slugArr.join("-");
}

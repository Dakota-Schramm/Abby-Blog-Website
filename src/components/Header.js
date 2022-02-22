import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link href="/">
          <a className="nav-logo nav-logo-desktop">Abby Hickman</a>
        </Link>
        <nav className="nav">
          <Link href="/">
            <a className="nav-item">Home</a>
          </Link>
          <Link href="/posts">
            <a className="nav-item nav-item-desktop">Blog Posts</a>
          </Link>
          <Link href="/posts">
            <a className="nav-item nav-item-phone">Blog</a>
          </Link>
          <Link href="/contact">
            <a className="nav-item nav-item-desktop">Contact Me</a>
          </Link>
          <Link href="/contact">
            <a className="nav-item nav-item-phone">Contact</a>
          </Link>
        </nav>
      </header>
    </>
  );
}

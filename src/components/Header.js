import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="header">
        <Link href="/">
          <a className="nav-logo nav-logo-desktop">Abby Hickman</a>
        </Link>
        <Link href="/">
          <a className="nav-logo nav-logo-phone">A H</a>
        </Link>
        <nav className="nav">
          <Link href="/">
            <a className="nav-item">Home</a>
          </Link>
          <Link href="/posts">
            <a className="nav-item">Blog Posts</a>
          </Link>
          <Link href="/contact">
            <a className="nav-item">Contact Me</a>
          </Link>
        </nav>
      </header>
    </>
  );
}

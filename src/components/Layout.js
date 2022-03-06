import Head from "next/head";
import Header from "./Header";

export default function Layout({
  children,
  pageTitle,
  pageDescription,
  scripts,
  pageStyle,
  ...props
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {scripts?.map((val, index) => (
          <script key={index} src={val} />
        ))}
      </Head>
      <section className="layout">
        <Header />
        <div className={`content ${pageStyle}`}>{children}</div>
      </section>
      <footer className="footer">Built by me!</footer>
    </>
  );
}

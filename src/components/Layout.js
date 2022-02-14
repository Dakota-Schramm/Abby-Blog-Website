import Head from "next/head";
import Header from "./Header";

export default function Layout({
  children,
  pageTitle,
  pageDescription,
  scripts,
  ...props
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription}></meta>
        {scripts?.map((val, index) => (
          <script key={index} src={val}></script>
        ))}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=optional"
        ></link>
      </Head>
      <section className="layout">
        <Header />
        <div className="content">{children}</div>
      </section>
      <footer className="footer">Built by me!</footer>
    </>
  );
}

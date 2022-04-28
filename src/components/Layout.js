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
        <link 
          href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=block" 
          rel="stylesheet"
        />
        {scripts?.map((val, index) => (
          <script key={index} src={val} />
        ))}
      </Head>
      <Header />
      <main className="layout">
        <div className={`content ${pageStyle}`}>
          {children}
        </div>
      </main>
      <footer className="footer">
        Schramm Solutions, LLC © {new Date().getFullYear()}
      </footer>
    </>
  );
}

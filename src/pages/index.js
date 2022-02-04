import Layout from "../components/Layout";
// import { attributes, react as HomeContent } from "../content/home.md";

export default function Home({ title, description, ...props }) {
  // let { title, cats } = attributes;
  const scripts = [
    "https://identity.netlify.com/v1/netlify-identity-widget.js",
  ];
  return (
    <>
      <Layout
        scripts={scripts}
        pageTitle={`${title} | About`}
        pageDescription={description}
      >
        <div className="home-layout">
          <div className="biography">{/* Put biography here */}</div>
          <div className="headshot">{/* put headshot here*/}</div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const configData = await import(`../../siteconfig.json`);

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description,
    },
  };
}
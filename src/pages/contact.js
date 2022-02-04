import Layout from "../components/Layout";

export default function Contact({ title, description, ...props }) {
  return (
    <>
      <Layout pageTitle={`${title} | Contact Me`} pageDescription={description}>
        <div className="contact-layout">
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

import Layout from "../components/Layout";

const headshotImage = "./img/abby-hickman.jpeg";

export default function Home({ title, description, ...props }) {
  const scripts = [
    "https://identity.netlify.com/v1/netlify-identity-widget.js",
  ];
  return (
    <>
      <Layout
        scripts={scripts}
        pageTitle={`${title} | About`}
        pageDescription={description}
        pageStyle="home-layout"
      >
        <div className="content-section">
          <div className="home-container">
            <img
              src={headshotImage}
              alt="Headshot picture of Abby Hickman."
              className="headshot"
            />
            <div className="biography">
              <p>
                {
                  "Hey! My name is Abby Hickman, a student of literature \
                  from Norman, Oklahoma. I earned my bachelor's in \
                  anthropology from Columbia University, and recently \
                  finished coursework for my master's in English at \
                  the University of Limerick. My interests include \
                  Indigenous futurisms and speculative fiction broadly. \
                  Contained within the walls of this blog are my thoughts, \
                  social media channels, and my resume. I hope you enjoy \
                  your tour!"
                }
              </p>
            </div>
          </div>
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

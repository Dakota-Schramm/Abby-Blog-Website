import Layout from "../components/Layout";

const headshotImage = "./img/30c79efa5819b7987bde857f620e6c3e.jpg";

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
                  "I can haz meow meow you are my owner so here is a dead rat. Catch \
              small lizards, bring them into house, then unable to find them on \
              carpet. Scratch at the door then walk away scratch the furniture \
              pet me pet me pet me pet me, bite, scratch, why are you petting me \
              please stop looking at your phone and pet me i like frogs and 0 \
              gravity. Naughty running cat stare out cat door then go back \
              inside cats are a queer kind of folk. "
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

import Layout from "../components/Layout";

import EmailIcon from "../components/svg/Email";
import BxlTwitterIcon from "../components/svg/Twitter";

export default function Contact({ title, description, ...props }) {
  return (
    <>
      <Layout
        pageTitle={`${title} | Contact Me`}
        pageDescription={description}
        pageStyle="contact-layout"
      >
        <div className="content-section">
          <div className="contacts">
            <div className="contact-item">
              <BxlTwitterIcon width="5rem" height="5rem" />
              @TheYoungAbraxan
            </div>
            <div className="contact-item">
              <EmailIcon width="5rem" height="5rem" />
              abbyhickman98@gmail.com
            </div>
          </div>
          <div className="contact-cv">
            <a href="/Abigail_Hickman_Resume_Winter_2022.pdf">
              Here&apos;s my resume.
            </a>
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

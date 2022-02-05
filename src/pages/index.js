import Layout from "../components/Layout";

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
      >
        <div className="home-layout">
          <div className="headshot">{/* put headshot here*/}</div>
          <div className="biography">
            <p>
              I can haz meow meow you are my owner so here is a dead rat. Catch
              small lizards, bring them into house, then unable to find them on
              carpet. Scratch at the door then walk away scratch the furniture
              pet me pet me pet me pet me, bite, scratch, why are you petting me
              please stop looking at your phone and pet me i like frogs and 0
              gravity. Naughty running cat stare out cat door then go back
              inside cats are a queer kind of folk. Love and coo around
              boyfriend who purrs and makes the perfect moonlight eyes so i can
              purr and swat the glittery gleaming yarn to him (the yarn is from
              a $125 sweater) chase dog then run away walk on keyboard, catto
              munch salmono. I will ruin the couch with my claws attack dog, run
              away and pretend to be victim love you, then bite you so please
              let me outside pouty face yay! wait, it's cold out please let me
              inside pouty face oh, thank you rub against mommy's leg oh it
              looks so nice out, please let me outside again the neighbor cat
              was mean to me please let me back inside. If human is on laptop
              sit on the keyboard damn that dog sit in window and stare oooh, a
              bird, yum freak human out make funny noise mow mow mow mow mow mow
              success now attack human stare at wall turn and meow stare at wall
              some more meow again continue staring yet small kitty warm kitty
              little balls of fur need to check on human, have not seen in an
              hour might be dead oh look, human is alive, hiss at human, feed
              me. Eat a plant, kill a hand haha you hold me hooman i scratch and
              throw down all the stuff in the kitchen. Oooo! dangly balls! jump
              swat swing flies so sweetly to the floor crash move on wash belly
              nap plan your travel, and groom forever, stretch tongue and leave
              it slightly out, blep, or see owner, run in terror, hiiiiiiiiii
              feed me now.
              Ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss
              stretch human give me attention meow so pushes butt to face. Do i
              like standing on litter cuz i sits when i have spaces, my cat
              buddies have no litter i live in luxury cat life purr purr purr
              until owner pets why owner not pet me hiss scratch meow chase
              laser hiiiiiiiiii feed me now or ooh, are those your $250 dollar
              sandals? lemme use that as my litter box cat walks in keyboard .
              Stretch out on bed loves cheeseburgers. Bite nose of your human
              jump around on couch, meow constantly until given food, . Who's
              the baby hate dog while happily ignoring when being called so run
              outside as soon as door open.
            </p>
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

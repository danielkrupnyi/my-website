import { motion } from "framer-motion";
import { exit } from "../animations";
import Layout from "../components/Layout";
import Logo from "../components/Logo";

const IndexPage = () => (
  <Layout
    title="danielkrupnyy"
    description="This is Daniel Krupnyy's personal site/blog."
    isHome={true}
  >
    <motion.section
      exit={exit}
      initial="initial"
      animate="animate"
      className="home-section flex justify-between items-center"
    >
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="lg:w-5/6 xl:w-3/6 2xl:w-2/6"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Hello, I'm Daniel 👋
        </h1>
        <h2 className="mt-3 text-xl leading-10 text-text-light font-paragraph">
          A self-taught <span className="span">web developer</span> that loves
          to <span className="span">build websites</span> primarily using{" "}
          <span className="span">React</span>.
        </h2>
      </motion.div>
      <Logo />
    </motion.section>
  </Layout>
);

export default IndexPage;

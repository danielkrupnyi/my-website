import { useEffect, useState } from "react";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import Footer from "../components/Footer";

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  isHome?: boolean;
}

const Layout = ({
  children,
  title = "danielkrupnyy",
  description,
  isHome = false,
}: LayoutProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const switchScroll = (isMobile: boolean) => {
    const root = document.body! as HTMLBodyElement;

    isMobile
      ? (root.style.overflowY = "hidden")
      : (root.style.overflowY = "scroll");
  };

  useEffect(() => {
    switchScroll(isMobile);
  }, [isMobile]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="container mx-auto px-4 min-h-screen relative">
        <div className="fixed top-0 container mx-auto bg-brand-bg h-88 sm:h-80 z-30" />
        <Header isMobile={isMobile} setIsMobile={setIsMobile} />
        <AnimatePresence exitBeforeEnter>
          {isMobile && <MobileMenu setIsMobile={setIsMobile} />}
        </AnimatePresence>
        {children}
        <Footer clazz={isHome ? "sticky bottom-0 left-0" : undefined} />
      </div>
    </>
  );
};

export default Layout;

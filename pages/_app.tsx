import { AppProps } from "next/app";
import Router from "next/router";
import { ApolloProvider } from "@apollo/client/react";
import client from "../apollo-client";
import NProgress from "nprogress";
import { AnimatePresence } from "framer-motion";
import "../styles/tailwind.css";
import "../styles/logo.css";
import "../styles/nprogress.css";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps, router }: AppProps) => (
  <ApolloProvider client={client}>
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  </ApolloProvider>
);

export default MyApp;

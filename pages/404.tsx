import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { fadeInUp, stagger } from "../animations";
import Layout from "../components/Layout";

export default function ErrorPage() {
  return (
    <Layout title="404" description="This is error page.">
      <motion.section
        exit={{ opacity: 0 }}
        initial="initial"
        animate="animate"
        variants={stagger}
        className="section flex-grow flex flex-col justify-center items-center"
      >
        <motion.img
          variants={fadeInUp}
          src="/404.svg"
          alt="Page not found"
          className="w-2/4 sm:w-1/4"
        />
        <motion.h1 variants={fadeInUp} className="text-2xl mt-5">
          Page not found
        </motion.h1>
        <Link href="/">
          <motion.button
            variants={fadeInUp}
            className="bg-brand px-4 py-2 mt-7 hover:opacity-50 transition"
          >
            Go to home page
          </motion.button>
        </Link>
      </motion.section>
    </Layout>
  );
}

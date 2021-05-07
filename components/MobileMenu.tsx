import { motion } from "framer-motion";
import { SetStateAction, Dispatch } from "react";
import { easing } from "../animations";
import Nav from "./Nav";

interface MobileMenuProps {
  setIsMobile: Dispatch<SetStateAction<boolean>>;
}

const MobileMenu = ({ setIsMobile }: MobileMenuProps) => {
  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{
        duration: 0.8,
        ease: easing,
      }}
      exit={{ x: "100vw" }}
      className="flex flex-col justify-center z-40 lg:hidden items-center fixed left-0 top-0 w-screen h-screen bg-brand-light text-text"
    >
      <Nav isMobile={true} setIsMobile={setIsMobile} />
    </motion.div>
  );
};

export default MobileMenu;

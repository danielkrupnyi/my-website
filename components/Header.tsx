import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { HiOutlineX, HiMenuAlt4 } from "react-icons/hi";
import Nav from "../components/Nav";

interface HeaderProps {
  isMobile: boolean;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ isMobile, setIsMobile }: HeaderProps) => (
  <header className="sticky left-0 w-full top-0 py-6 flex justify-between items-center z-50">
    <div className="text-2xl">
      <Link href="/">
        <a>danielkrupnyy</a>
      </Link>
    </div>
    <div className="hidden lg:block">
      <Nav />
    </div>
    <div
      className="burger block lg:hidden"
      onClick={() => setIsMobile(!isMobile)}
    >
      {isMobile ? (
        <HiOutlineX className="h-10 w-10 text-text" aria-hidden="true" />
      ) : (
        <HiMenuAlt4 className="h-10 w-10 text-text" aria-hidden="true" />
      )}
    </div>
  </header>
);

export default Header;

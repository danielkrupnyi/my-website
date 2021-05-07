import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { links } from "../constants";

interface NavProps {
  isMobile?: boolean;
  setIsMobile?: Dispatch<SetStateAction<boolean>>;
}

const Nav = ({ isMobile = false, setIsMobile }: NavProps) => {
  const router = useRouter();
  return (
    <nav className={`flex ${isMobile ? "flex-col" : undefined}`}>
      {links.map((link) => (
        <div
          key={link.id}
          className={`flex items-center text-2xl sm:text-xl hover:bg-brand uppercase transition ${
            isMobile ? "my-5 justify-center" : "ml-5"
          } ${router.asPath.includes(link.title) && "bg-brand"}`}
          onClick={() => setIsMobile && setIsMobile(false)}
        >
          <Link href={link.route}>
            <a>{link.title}</a>
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Nav;

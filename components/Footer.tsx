import { SiTwitter } from "react-icons/si";
import { FaDev } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SocialLink from "../components/SocialLink";

interface FooterProps {
  clazz?: string;
}

const Footer = ({ clazz }: FooterProps) => (
  <footer className={`${clazz} py-6 grid grid-flow-col grid-rows-1`}>
    <SocialLink title="dev.to" href="https://dev.to/danielkrupnyy">
      <FaDev className="text-2xl text-text" />
    </SocialLink>
    <SocialLink title="twitter" href="https://twitter.com/danielkrupnyy">
      <SiTwitter className="text-2xl text-text" />
    </SocialLink>
    <SocialLink title="email" href="mailto:danielkrupnyy@gmail.com">
      <MdEmail className="text-2xl text-text" />
    </SocialLink>
  </footer>
);

export default Footer;

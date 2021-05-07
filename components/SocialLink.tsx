interface SocialLinkProps {
  title?: string | never;
  href?: string | never;
  children?: React.ReactChild | never[];
}

const SocialLink = ({ title, href, children }: SocialLinkProps) => {
  if (!title || !href || !children) return null;
  return (
    <a
      href={href}
      className="bg-brand p-2 flex justify-center sm:justify-between hover:bg-brand-light transition"
    >
      {children}
      <span className="hidden sm:block">{title}</span>
      <span className="hidden sm:block" />
    </a>
  );
};

export default SocialLink;

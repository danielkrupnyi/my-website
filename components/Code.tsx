import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/palenight";
import React from "react";

type PreType = {
  children: React.PropsWithChildren<any>;
};

const Pre = ({ children }: PreType) => {
  const lang = !children.props.className
    ? null
    : children.props.className.slice(9);

  return (
    <Highlight
      {...defaultProps}
      code={children.props.children.trim()}
      language={lang}
      theme={dracula}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className}`} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const MDXComponents = {
  pre: (props: any) => <Pre {...props} />,
};

export default MDXComponents;

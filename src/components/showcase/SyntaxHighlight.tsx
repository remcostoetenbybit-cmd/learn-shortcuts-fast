import { Highlight, themes } from "prism-react-renderer";

interface SyntaxHighlightProps {
  code: string;
  language?: string;
}

/**
 * Custom theme based on the site's design tokens (dark, orange primary).
 * Uses prism-react-renderer's theming API for proper token differentiation.
 */
const customTheme = {
  ...themes.nightOwl,
  plain: {
    color: "hsl(0 0% 70%)",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "hsl(0 0% 35%)", fontStyle: "italic" as const },
    },
    {
      types: ["punctuation"],
      style: { color: "hsl(0 0% 45%)" },
    },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol", "deleted"],
      style: { color: "hsl(18 100% 60%)" }, // primary / orange
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: { color: "hsl(152 60% 54%)" }, // emerald-ish green
    },
    {
      types: ["operator", "entity", "url"],
      style: { color: "hsl(0 0% 55%)" },
    },
    {
      types: ["atrule", "attr-value", "keyword"],
      style: { color: "hsl(200 80% 65%)" }, // sky blue
    },
    {
      types: ["function", "class-name"],
      style: { color: "hsl(40 90% 64%)" }, // amber / gold
    },
    {
      types: ["regex", "important", "variable"],
      style: { color: "hsl(18 80% 65%)" },
    },
    {
      types: ["plain"],
      style: { color: "hsl(0 0% 70%)" },
    },
  ],
};

export function SyntaxHighlight({ code, language = "tsx" }: SyntaxHighlightProps) {
  return (
    <Highlight theme={customTheme} code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i });
            return (
              <span key={i} {...lineProps} style={undefined}>
                {line.map((token, key) => {
                  const tokenProps = getTokenProps({ token, key });
                  return <span key={key} {...tokenProps} />;
                })}
                {i < tokens.length - 1 ? "\n" : null}
              </span>
            );
          })}
        </>
      )}
    </Highlight>
  );
}

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  title?: string;
  code: string;
  language?: string;
}

/**
 * Custom theme matching the site's design tokens.
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
      style: { color: "hsl(18 100% 60%)" },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: { color: "hsl(152 60% 54%)" },
    },
    {
      types: ["operator", "entity", "url"],
      style: { color: "hsl(0 0% 55%)" },
    },
    {
      types: ["atrule", "attr-value", "keyword"],
      style: { color: "hsl(200 80% 65%)" },
    },
    {
      types: ["function", "class-name"],
      style: { color: "hsl(40 90% 64%)" },
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

export function CodeBlock({ title, code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-display text-sm font-bold lowercase tracking-tight text-foreground mb-3">
          {title}
        </h3>
      )}
      <div className="relative group border border-border overflow-hidden">
        {/* Copy button */}
        <button
          onClick={copy}
          className="absolute top-2.5 right-2.5 z-10 h-7 w-7 flex items-center justify-center bg-secondary/80 border border-border text-muted-foreground transition-all hover:text-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Copy code"
        >
          <Copy
            className={`h-3 w-3 absolute transition-all duration-300 ${
              copied
                ? "opacity-0 scale-50 rotate-12"
                : "opacity-100 scale-100 rotate-0"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          />
          <Check
            className={`h-3 w-3 absolute text-primary transition-all duration-300 ${
              copied
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-50 -rotate-12"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          />
        </button>

        {/* Code area with line numbers -- uses prism-react-renderer */}
        <Highlight theme={customTheme} code={code} language={language}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <div className="overflow-x-auto bg-background">
              <pre className="py-3">
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i });
                  return (
                    <div
                      key={i}
                      {...lineProps}
                      style={undefined}
                      className="flex hover:bg-card/30 transition-colors"
                    >
                      <span className="select-none w-10 shrink-0 text-right pr-4 font-mono text-[11px] leading-relaxed text-muted-foreground/25">
                        {i + 1}
                      </span>
                      <span className="pl-4 border-l border-border/30 font-mono text-[11px] leading-relaxed flex-1 pr-4">
                        {line.map((token, key) => {
                          const tokenProps = getTokenProps({ token, key });
                          return <span key={key} {...tokenProps} />;
                        })}
                        {line.length === 1 && line[0].content === "" && "\u00A0"}
                      </span>
                    </div>
                  );
                })}
              </pre>
            </div>
          )}
        </Highlight>
      </div>
    </div>
  );
}

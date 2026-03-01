import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { SyntaxHighlight } from "./SyntaxHighlight";

interface CodeBlockProps {
  title?: string;
  code: string;
  language?: string;
}

export function CodeBlock({ title, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

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
        {/* Copy button — floating inside code area */}
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
        {/* Code area with line numbers */}
        <div className="overflow-x-auto bg-background">
          <pre className="py-3">
            {lines.map((line, i) => (
              <div key={i} className="flex hover:bg-card/30 transition-colors">
                <span className="select-none w-10 shrink-0 text-right pr-4 font-mono text-[11px] leading-relaxed text-muted-foreground/25">
                  {i + 1}
                </span>
                <span className="pl-4 border-l border-border/30 font-mono text-[11px] leading-relaxed flex-1 pr-4">
                  {line ? (
                    <SyntaxHighlight code={line} />
                  ) : (
                    "\u00A0"
                  )}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

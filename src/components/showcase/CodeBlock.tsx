import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  title?: string;
  code: string;
  language?: string;
}

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
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs lowercase text-muted-foreground">{title}</span>
          <button onClick={copy} className="text-muted-foreground transition-colors hover:text-foreground">
            {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      )}
      <div className="overflow-x-auto rounded-md border border-border bg-card p-4">
        <pre>
          <code className="font-mono text-sm leading-relaxed text-foreground/80">{code}</code>
        </pre>
      </div>
    </div>
  );
}

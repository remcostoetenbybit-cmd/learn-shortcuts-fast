import { useState, useRef, useEffect } from "react";
import { Check, Copy } from "lucide-react";

interface InstallCommandProps {
  packageName?: string;
}

const managers = [
  { id: "npm", label: "npm", cmd: (pkg: string) => `npm i ${pkg}` },
  { id: "bun", label: "bun", cmd: (pkg: string) => `bun add ${pkg}` },
  { id: "pnpm", label: "pnpm", cmd: (pkg: string) => `pnpm add ${pkg}` },
  { id: "yarn", label: "yarn", cmd: (pkg: string) => `yarn add ${pkg}` },
];

export function InstallCommand({ packageName = "package-name" }: InstallCommandProps) {
  const [active, setActive] = useState("npm");
  const [copied, setCopied] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const command = managers.find((m) => m.id === active)!.cmd(packageName);

  useEffect(() => {
    const btn = buttonRefs.current[active];
    if (btn && tabsRef.current) {
      const containerRect = tabsRef.current.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [active]);

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div ref={tabsRef} className="relative flex items-center gap-1 mb-0">
        {/* Sliding indicator */}
        <div
          className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        {managers.map((m) => (
          <button
            key={m.id}
            ref={(el) => { buttonRefs.current[m.id] = el; }}
            onClick={() => setActive(m.id)}
            className={`px-2.5 py-1.5 font-mono text-xs lowercase transition-colors duration-300 rounded-sm ${
              active === m.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            [{m.label}]
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 mt-1 overflow-hidden">
        <code className="font-mono text-sm text-muted-foreground transition-opacity duration-200" style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}>
          <span className="text-primary">$</span> {command}
        </code>
        <button onClick={copy} className="text-muted-foreground transition-colors hover:text-foreground ml-4 shrink-0">
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

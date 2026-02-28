import { useState } from "react";
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

  const command = managers.find((m) => m.id === active)!.cmd(packageName);

  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-1 mb-0">
        {managers.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`px-2.5 py-1 font-mono text-xs lowercase transition-colors rounded-sm ${
              active === m.id
                ? "text-foreground bg-secondary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            [{m.label}]
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 mt-1">
        <code className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">$</span> {command}
        </code>
        <button onClick={copy} className="text-muted-foreground transition-colors hover:text-foreground ml-4">
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

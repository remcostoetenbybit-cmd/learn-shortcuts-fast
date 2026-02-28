import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface InstallCommandProps {
  packageName?: string;
}

const managers = [
  { id: "npm", label: "npm", cmd: (pkg: string) => `npm install ${pkg}` },
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
    <div className="inline-flex flex-col gap-0 rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex border-b border-border">
        {managers.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`px-4 py-2 text-xs font-mono lowercase transition-colors ${
              active === m.id
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 px-4 py-3">
        <code className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">$</span> {command}
        </code>
        <button onClick={copy} className="ml-auto text-muted-foreground transition-colors hover:text-foreground">
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

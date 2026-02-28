import { ExternalLink } from "lucide-react";

interface BadgeBarProps {
  packageName?: string;
  npmUrl?: string;
  githubUrl?: string;
}

export function BadgeBar({
  packageName = "package-name",
  npmUrl = "#",
  githubUrl = "#",
}: BadgeBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* npm badge placeholder */}
      <a
        href={npmUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded border border-dashed border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
      >
        npm
        <span className="text-primary">v0.0.0</span>
      </a>

      {/* downloads badge placeholder */}
      <span className="inline-flex items-center gap-1.5 rounded border border-dashed border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
        ↓ 0/wk
      </span>

      {/* bundle size placeholder */}
      <span className="inline-flex items-center gap-1.5 rounded border border-dashed border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
        0kb
      </span>

      {/* github link */}
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded border border-dashed border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors ml-auto"
      >
        github
        <ExternalLink className="h-2.5 w-2.5" />
      </a>
    </div>
  );
}

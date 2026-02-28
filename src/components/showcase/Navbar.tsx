import { Search, Github } from "lucide-react";

interface NavbarProps {
  packageName?: string;
  links?: { label: string; href: string }[];
  githubUrl?: string;
}

const defaultLinks = [
  { label: "docs", href: "#api" },
  { label: "examples", href: "#examples" },
  { label: "changelog", href: "#" },
];

export function Navbar({ packageName = "package", links = defaultLinks, githubUrl = "#" }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#" className="font-display text-sm font-bold lowercase tracking-tight text-foreground">
          {packageName}
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm lowercase text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground sm:flex">
            <Search className="h-3.5 w-3.5" />
            <span className="text-xs">search...</span>
            <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </nav>
  );
}

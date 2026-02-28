import { Search, Github } from "lucide-react";
import type { ShowcaseNavLink } from "@/config/showcase.config";

interface NavbarProps {
  packageName: string;
  navLinks: ShowcaseNavLink[];
  githubUrl: string;
}

export function Navbar({ packageName, navLinks, githubUrl }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-2xl flex items-center justify-between px-8 h-12">
        {/* Logo / name */}
        <a href="/" className="font-display text-sm font-bold lowercase tracking-wide text-foreground hover:text-primary transition-colors">
          {packageName.toLowerCase()}
        </a>

        {/* Center nav links — bracket notation */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors px-1.5 py-1"
            >
              [{link.label}]
            </a>
          ))}
        </div>

        {/* Right side: search + github */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded border border-border bg-card/50 px-2.5 py-1">
            <Search className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono text-[10px] text-muted-foreground">search...</span>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </nav>
  );
}

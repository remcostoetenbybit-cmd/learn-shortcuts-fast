import { useState } from "react";
import { Search, Github, Menu, X } from "lucide-react";
import type { ShowcaseNavLink } from "@/config/showcase.config";

interface NavbarProps {
  packageName: string;
  navLinks: ShowcaseNavLink[];
  githubUrl: string;
}

export function Navbar({ packageName, navLinks, githubUrl }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-2xl flex items-center justify-between px-8 h-12">
        {/* Logo / name */}
        <a href="/" className="font-display text-sm font-bold lowercase tracking-wide text-foreground hover:text-primary transition-colors">
          {packageName.toLowerCase()}
        </a>

        {/* Center nav links — bracket notation (desktop) */}
        <div className="hidden md:flex items-center gap-1">
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

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded border border-border bg-card/50 px-2.5 py-1">
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center size-8 rounded border border-dashed border-border text-muted-foreground hover:text-foreground hover:bg-card/50 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="relative size-4">
              <Menu
                className="absolute inset-0 size-4 transition-all duration-300"
                style={{
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? 'rotate(90deg) scale(0.5)' : 'rotate(0) scale(1)',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              <X
                className="absolute inset-0 size-4 transition-all duration-300"
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0.5)',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? '300px' : '0',
          opacity: mobileOpen ? 1 : 0,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="border-t border-dashed border-border px-8 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              [{link.label}]
            </a>
          ))}
          <div className="flex items-center gap-2 rounded border border-border bg-card/50 px-2.5 py-2 mt-2">
            <Search className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">search...</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

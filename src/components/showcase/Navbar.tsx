import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import type { NavLink as ShowcaseNavLink } from "@/config/types";

interface NavbarProps {
  packageName: string;
  navLinks: ShowcaseNavLink[];
  githubUrl: string;
  onSearchOpen: () => void;
}

export function Navbar({ packageName, navLinks, onSearchOpen }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Global "/" shortcut to open search (skip inputs)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
      if (e.key === "/" || ((e.metaKey || e.ctrlKey) && e.key === "k")) {
        e.preventDefault();
        onSearchOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearchOpen]);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-2xl flex items-center justify-between px-8 h-12">
        {/* Logo / name */}
        <a href="/" className="font-mono text-sm font-bold lowercase tracking-wide text-foreground hover:text-primary transition-colors">
          {packageName.toLowerCase()}
        </a>

        {/* Center nav links — bracket notation (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors px-1.5 py-1"
            >
              [{link.label}]
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search trigger */}
          <button
            type="button"
            onClick={onSearchOpen}
            className="hidden md:flex items-center gap-2 border border-border bg-card/50 hover:border-primary/30 hover:bg-card/80 px-2.5 py-1 transition-colors group"
            aria-label="Open search"
          >
            <Search className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">search...</span>
            <kbd className="font-mono text-[8px] text-muted-foreground/40 px-1 border border-border/50 bg-secondary/30 ml-1">/</kbd>
          </button>

          {/* Mobile search button */}
          <button
            type="button"
            onClick={onSearchOpen}
            className="md:hidden flex items-center justify-center size-8 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
          </button>

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
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              [{link.label}]
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

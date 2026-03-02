import { useState, useEffect, useRef, useCallback } from "react";
import { Search, ArrowUp, ArrowDown, CornerDownLeft, X } from "lucide-react";
import type { PackageConfig } from "@/config/types";

// ─── Search Index ────────────────────────────────────────────────

type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  href: string;
  score?: number;
};

function buildIndex(config: PackageConfig): SearchResult[] {
  const results: SearchResult[] = [];

  // Sections / anchors
  results.push(
    { id: "sec-install", title: "Installation", subtitle: `npm i ${config.installName}`, category: "section", href: "#install" },
    { id: "sec-api", title: "API Reference", subtitle: "All hook options & their defaults", category: "section", href: "#api" },
    { id: "sec-demo", title: "Interactive Demo", subtitle: "Try the live playground", category: "section", href: "#demo" },
    { id: "sec-usecases", title: "Use Cases", subtitle: "Real-world patterns and examples", category: "section", href: "#usecases" },
  );

  // Features
  for (const f of config.features) {
    results.push({
      id: `feature-${f.label}`,
      title: f.label,
      subtitle: f.description,
      category: "feature",
      href: "#api",
    });
  }

  // API props
  for (const p of config.apiProps) {
    results.push({
      id: `api-${p.name}`,
      title: p.name,
      subtitle: `${p.type} — ${p.description}`,
      category: "api option",
      href: "#api",
    });
  }

  // Code examples
  for (const ex of config.codeExamples) {
    results.push({
      id: `example-${ex.title}`,
      title: ex.title,
      subtitle: ex.code.split("\n")[0].trim(),
      category: "example",
      href: "#demo",
    });
  }

  // Use cases
  for (const uc of config.useCases) {
    results.push({
      id: `usecase-${uc.title}`,
      title: uc.title,
      subtitle: uc.description,
      category: "use case",
      href: "#usecases",
    });
  }

  return results;
}

// ─── Scoring ─────────────────────────────────────────────────────

function scoreResult(result: SearchResult, query: string): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  const titleL = result.title.toLowerCase();
  const subtitleL = result.subtitle.toLowerCase();
  const categoryL = result.category.toLowerCase();
  const terms = q.split(/\s+/);

  let score = 0;

  for (const term of terms) {
    // Exact title match
    if (titleL === term) score += 100;
    // Title starts with
    else if (titleL.startsWith(term)) score += 60;
    // Title contains
    else if (titleL.includes(term)) score += 40;
    // Subtitle contains
    if (subtitleL.includes(term)) score += 20;
    // Category matches
    if (categoryL.includes(term)) score += 15;
    // Partial character overlap (fuzzy)
    let fi = 0;
    for (const ch of titleL) {
      if (fi < term.length && ch === term[fi]) fi++;
    }
    score += (fi / term.length) * 10;
  }

  return score;
}

function search(index: SearchResult[], query: string): SearchResult[] {
  if (!query.trim()) return index.slice(0, 8);
  return index
    .map((r) => ({ ...r, score: scoreResult(r, query) }))
    .filter((r) => (r.score ?? 0) > 5)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 10);
}

// ─── Category badge colours ───────────────────────────────────────

const categoryStyle: Record<string, string> = {
  section: "text-primary/70 border-primary/20 bg-primary/5",
  feature: "text-emerald-400/70 border-emerald-500/20 bg-emerald-500/5",
  "api option": "text-yellow-400/70 border-yellow-500/20 bg-yellow-500/5",
  example: "text-blue-400/70 border-blue-500/20 bg-blue-500/5",
  "use case": "text-violet-400/70 border-violet-500/20 bg-violet-500/5",
};

// ─── Component ───────────────────────────────────────────────────

interface SearchOverlayProps {
  config: PackageConfig;
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ config, open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const index = useRef(buildIndex(config));
  const results = search(index.current, query);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const navigate = useCallback(
    (result: SearchResult) => {
      onClose();
      setTimeout(() => {
        const el = document.querySelector(result.href);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        navigate(results[selectedIndex]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [results, selectedIndex, navigate, onClose]
  );

  if (!open) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
    >
      {/* Blur/dim layer */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg border border-border bg-background shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
          <Search className="h-4 w-4 text-muted-foreground/60 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="search docs, api, examples..."
            className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            aria-label="Close search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[360px] overflow-y-auto">
          {results.length > 0 ? (
            results.map((result, i) => (
              <button
                key={result.id}
                type="button"
                onClick={() => navigate(result)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors border-b border-border/30 last:border-b-0 ${
                  i === selectedIndex
                    ? "bg-primary/6 text-foreground"
                    : "text-muted-foreground hover:bg-card/50"
                }`}
              >
                {/* Active indicator */}
                <span
                  className={`shrink-0 w-0.5 h-5 rounded-full transition-all ${
                    i === selectedIndex ? "bg-primary" : "bg-transparent"
                  }`}
                />

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-foreground truncate">{result.title}</div>
                  <div className="font-mono text-[10px] text-muted-foreground/50 truncate mt-0.5">
                    {result.subtitle}
                  </div>
                </div>

                {/* Category */}
                <span
                  className={`shrink-0 font-mono text-[8px] px-1.5 py-0.5 border uppercase tracking-wider ${
                    categoryStyle[result.category] ?? "text-muted-foreground/40 border-border/40"
                  }`}
                >
                  {result.category}
                </span>
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center gap-1.5 px-4 py-10">
              <span className="font-mono text-[10px] text-muted-foreground/40">no results for</span>
              <span className="font-mono text-xs text-muted-foreground/60">"{query}"</span>
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border/60 bg-secondary/20">
          <div className="flex items-center gap-1">
            <ArrowUp className="h-2.5 w-2.5 text-muted-foreground/40" />
            <ArrowDown className="h-2.5 w-2.5 text-muted-foreground/40" />
            <span className="font-mono text-[8px] text-muted-foreground/40">navigate</span>
          </div>
          <div className="flex items-center gap-1">
            <CornerDownLeft className="h-2.5 w-2.5 text-muted-foreground/40" />
            <span className="font-mono text-[8px] text-muted-foreground/40">go</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="font-mono text-[8px] text-muted-foreground/40 px-1 border border-border/40">esc</kbd>
            <span className="font-mono text-[8px] text-muted-foreground/40">close</span>
          </div>
          <div className="flex-1" />
          <span className="font-mono text-[8px] text-muted-foreground/30">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

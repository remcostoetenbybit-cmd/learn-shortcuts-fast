import { useState, useCallback, useEffect, useRef } from "react";
import { Search, ArrowUp, ArrowDown, CornerDownLeft, Copy, Check } from "lucide-react";

// ─── Visibility hook: only activate keyboard shortcuts when demo is on screen ─
function useIsVisible(ref: React.RefObject<HTMLElement | null>, margin = "0px") {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: margin, threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, margin]);
  return isVisible;
}

// ─── Command Palette Mini-Demo ───────────────────────────────────
const paletteItems = [
  { label: "Save file", shortcut: "Cmd+S", category: "File", matchKey: "s", mod: true },
  { label: "Open search", shortcut: "Cmd+K", category: "Navigation", matchKey: "k", mod: true },
  { label: "Focus search bar", shortcut: "/", category: "Navigation", matchKey: "/", mod: false },
  { label: "Toggle sidebar", shortcut: "Cmd+B", category: "View", matchKey: "b", mod: true },
  { label: "Go to line", shortcut: "Ctrl+G", category: "Editor", matchKey: "g", ctrl: true },
  { label: "Format document", shortcut: "Shift+Alt+F", category: "Editor", matchKey: "f", shift: true, alt: true },
];

function CommandPaletteDemo() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);

  const filtered = paletteItems.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const triggerItem = useCallback((label: string) => {
    setFlash(label);
    setTimeout(() => setFlash(null), 900);
  }, []);

  // Global keyboard listener: capture actual shortcuts when visible
  useEffect(() => {
    if (!isVisible) return;

    const handleGlobalKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      // Don't intercept if typing in the palette input itself
      if (target === inputRef.current) return;
      // Don't intercept in other inputs
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

      const key = e.key.toLowerCase();
      const mod = e.metaKey || e.ctrlKey;

      for (const item of paletteItems) {
        const matchKey = item.matchKey.toLowerCase();

        if (item.shift && item.alt && e.shiftKey && e.altKey && key === matchKey) {
          e.preventDefault();
          triggerItem(item.label);
          return;
        }
        if (item.ctrl && e.ctrlKey && !e.metaKey && key === matchKey) {
          e.preventDefault();
          triggerItem(item.label);
          return;
        }
        if (item.mod && mod && key === matchKey) {
          e.preventDefault();
          triggerItem(item.label);
          return;
        }
        if (!item.mod && !item.ctrl && !item.shift && !item.alt && key === matchKey && !mod && !e.shiftKey && !e.altKey) {
          e.preventDefault();
          triggerItem(item.label);
          return;
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [isVisible, triggerItem]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered.length > 0) {
        e.preventDefault();
        triggerItem(filtered[selectedIndex].label);
        setQuery("");
      }
    },
    [filtered, selectedIndex, triggerItem]
  );

  return (
    <div className="w-full" ref={containerRef}>
      <div className="border border-border bg-card/80 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-border">
          <Search className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command..."
            className="flex-1 bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground/40 outline-none"
          />
          <kbd className="font-mono text-[9px] text-muted-foreground/40 px-1.5 py-0.5 border border-border/60 bg-secondary/30">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[160px] overflow-y-auto">
          {filtered.map((item, i) => {
            const isActive = flash === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  triggerItem(item.label);
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className={`flex w-full items-center justify-between px-3 py-2 transition-colors duration-150 cursor-default text-left ${
                  isActive
                    ? "bg-primary/15 text-foreground"
                    : i === selectedIndex
                    ? "bg-primary/8 text-foreground"
                    : "text-muted-foreground hover:bg-card/60"
                }`}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="flex items-center gap-2.5">
                  {(i === selectedIndex || isActive) && (
                    <span className={`w-0.5 h-3.5 rounded-full ${isActive ? "bg-primary animate-pulse" : "bg-primary"}`} />
                  )}
                  <span className="font-mono text-[11px]">{item.label}</span>
                  <span className="font-mono text-[9px] text-muted-foreground/40">
                    {item.category}
                  </span>
                </div>
                <kbd className={`font-mono text-[9px] transition-colors ${isActive ? "text-primary" : "text-muted-foreground/50"}`}>
                  {item.shortcut}
                </kbd>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-3 py-4 text-center">
              <span className="font-mono text-[10px] text-muted-foreground/40">
                no results
              </span>
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-border/60 bg-secondary/20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <ArrowUp className="h-2.5 w-2.5 text-muted-foreground/40" />
              <ArrowDown className="h-2.5 w-2.5 text-muted-foreground/40" />
              <span className="font-mono text-[8px] text-muted-foreground/40">navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <CornerDownLeft className="h-2.5 w-2.5 text-muted-foreground/40" />
              <span className="font-mono text-[8px] text-muted-foreground/40">select</span>
            </div>
          </div>
          {flash && (
            <span className="font-mono text-[9px] text-primary animate-pulse">
              triggered: {flash}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Text Editor with Undo/Redo Mini-Demo ────────────────────────
function TextEditorDemo() {
  const [content, setContent] = useState("hello world\n\ntry editing this text.\npress Cmd+Z to undo, Cmd+S to save.");
  const historyRef = useRef<string[]>(["hello world\n\ntry editing this text.\npress Cmd+Z to undo, Cmd+S to save."]);
  const indexRef = useRef(0);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const flashAction = useCallback((action: string) => {
    setLastAction(action);
    const id = setTimeout(() => setLastAction(null), 900);
    return () => clearTimeout(id);
  }, []);

  const pushHistory = useCallback((text: string) => {
    const newHistory = historyRef.current.slice(0, indexRef.current + 1);
    newHistory.push(text);
    historyRef.current = newHistory;
    indexRef.current = newHistory.length - 1;
  }, []);

  const undo = useCallback(() => {
    if (indexRef.current > 0) {
      indexRef.current -= 1;
      setContent(historyRef.current[indexRef.current]);
      flashAction("undo");
    }
  }, [flashAction]);

  const redo = useCallback(() => {
    if (indexRef.current < historyRef.current.length - 1) {
      indexRef.current += 1;
      setContent(historyRef.current[indexRef.current]);
      flashAction("redo");
    }
  }, [flashAction]);

  const save = useCallback(() => {
    flashAction("saved!");
  }, [flashAction]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (mod && e.shiftKey && e.key === "z") {
        e.preventDefault();
        redo();
      } else if (mod && e.key === "y") {
        e.preventDefault();
        redo();
      } else if (mod && e.key === "s") {
        e.preventDefault();
        save();
      }
    },
    [undo, redo, save]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value;
      setContent(text);
      pushHistory(text);
    },
    [pushHistory]
  );

  return (
    <div className="w-full">
      <div className="border border-border bg-card/80 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/20">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-primary">document.txt</span>
            {lastAction === "saved!" && (
              <span className="font-mono text-[9px] text-emerald-400 animate-pulse">saved</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={undo}
              className="px-1.5 py-0.5 font-mono text-[9px] border border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
            >
              undo
            </button>
            <button
              onClick={redo}
              className="px-1.5 py-0.5 font-mono text-[9px] border border-border/60 text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
            >
              redo
            </button>
            <button
              onClick={save}
              className="px-1.5 py-0.5 font-mono text-[9px] border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
            >
              save
            </button>
          </div>
        </div>

        {/* Editor area */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={4}
          className="w-full bg-background px-3 py-3 font-mono text-xs text-foreground resize-none outline-none leading-relaxed"
          spellCheck={false}
        />

        {/* Status bar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-border/60 bg-secondary/20">
          <span className="font-mono text-[8px] text-muted-foreground/50">
            {content.length} chars | history: {indexRef.current + 1}/{historyRef.current.length}
          </span>
          {lastAction && (
            <span
              className={`font-mono text-[9px] transition-colors ${
                lastAction === "saved!" ? "text-emerald-400" : "text-primary"
              }`}
            >
              {lastAction}
            </span>
          )}
          <div className="flex items-center gap-2">
            <kbd className="font-mono text-[8px] text-muted-foreground/40 px-1 border border-border/40">Cmd+Z</kbd>
            <kbd className="font-mono text-[8px] text-muted-foreground/40 px-1 border border-border/40">Cmd+S</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Navigation Scopes Demo ─────────────────────────────────────
function NavScopesDemo() {
  const [currentPage, setCurrentPage] = useState("home");
  const [trail, setTrail] = useState<string[]>(["home"]);
  const [pendingG, setPendingG] = useState(false);
  const [flashPage, setFlashPage] = useState<string | null>(null);
  const pendingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef);

  const pages = [
    { id: "home", label: "Home", key: "h" },
    { id: "dashboard", label: "Dashboard", key: "d" },
    { id: "settings", label: "Settings", key: "s" },
    { id: "profile", label: "Profile", key: "p" },
  ];

  const navigate = useCallback(
    (pageId: string) => {
      setCurrentPage(pageId);
      setTrail((prev) => [...prev.slice(-4), pageId]);
      setFlashPage(pageId);
      setTimeout(() => setFlashPage(null), 600);
    },
    []
  );

  // Keyboard sequence: press g, then h/d/s/p -- only when visible
  useEffect(() => {
    if (!isVisible) {
      // Reset pending state when scrolling away
      setPendingG(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

      const key = e.key.toLowerCase();

      if (pendingG) {
        if (pendingTimeout.current) clearTimeout(pendingTimeout.current);
        setPendingG(false);
        const page = pages.find((p) => p.key === key);
        if (page) {
          e.preventDefault();
          navigate(page.id);
        }
      } else if (key === "g" && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        setPendingG(true);
        pendingTimeout.current = setTimeout(() => {
          setPendingG(false);
        }, 800);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (pendingTimeout.current) clearTimeout(pendingTimeout.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingG, navigate, isVisible]);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="border border-border bg-card/80 overflow-hidden">
        {/* Address bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-secondary/20">
          <span className="font-mono text-[9px] text-muted-foreground/40">/</span>
          <span className="font-mono text-[10px] text-primary">{currentPage}</span>
          <div className="flex-1" />
          {pendingG ? (
            <span className="font-mono text-[8px] text-primary animate-pulse">{'g pressed -- now press h/d/s/p'}</span>
          ) : (
            <span className="font-mono text-[8px] text-muted-foreground/40">press g then a key, or click</span>
          )}
        </div>

        {/* Page grid */}
        <div className="grid grid-cols-2 gap-px bg-border/30">
          {pages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => navigate(page.id)}
              className={`flex items-center justify-between px-3 py-3 transition-colors ${
                flashPage === page.id
                  ? "bg-primary/15 text-foreground"
                  : currentPage === page.id
                  ? "bg-primary/8 text-foreground"
                  : "bg-background text-muted-foreground hover:bg-card/60"
              }`}
            >
              <span className="font-mono text-[11px]">{page.label}</span>
              <kbd
                className={`font-mono text-[9px] px-1.5 py-0.5 border transition-colors ${
                  pendingG
                    ? "border-primary/50 text-primary bg-primary/8"
                    : currentPage === page.id
                    ? "border-primary/30 text-primary bg-primary/5"
                    : "border-border/40 text-muted-foreground/40"
                }`}
              >
                g {page.key}
              </kbd>
            </button>
          ))}
        </div>

        {/* Navigation trail */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-t border-border/60 bg-secondary/20 overflow-x-auto">
          <span className="font-mono text-[8px] text-muted-foreground/40 shrink-0">trail:</span>
          {trail.map((page, i) => (
            <span key={`${page}-${i}`} className="flex items-center gap-1">
              {i > 0 && (
                <span className="font-mono text-[8px] text-muted-foreground/20">{">"}</span>
              )}
              <span
                className={`font-mono text-[9px] ${
                  i === trail.length - 1 ? "text-primary" : "text-muted-foreground/40"
                }`}
              >
                {page}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Convert a recorded combo like ["Cmd","Shift","F"] to "cmd+shift+f"
function toShortcutCode(parts: string[]): string {
  return parts.map((p) => p.toLowerCase()).join("+");
}

function toDisplayCombo(parts: string[]): string {
  return parts.join("+");
}

// ─── Recording Mode Demo ────────────────────────────────────────
function RecordingDemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState<{ display: string; code: string }[]>([]);
  const [currentKeys, setCurrentKeys] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisible = useIsVisible(containerRef);

  const handleCopy = useCallback((code: string, idx: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(null), 1500);
    });
  }, []);

  const stopRecording = useCallback(
    (parts: string[]) => {
      if (parts.length > 0) {
        const display = toDisplayCombo(parts);
        const code = `$.key("${toShortcutCode(parts)}").on(() => handler())`;
        setRecorded((prev) => [...prev.slice(-4), { display, code }]);
      }
      setIsRecording(false);
      setCurrentKeys([]);
    },
    []
  );

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setCurrentKeys([]);
    setTimeout(() => containerRef.current?.focus(), 0);
  }, []);

  // Global keydown listener when recording -- only when visible
  useEffect(() => {
    if (!isRecording || !isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const parts: string[] = [];
      if (e.metaKey) parts.push("Cmd");
      else if (e.ctrlKey) parts.push("Ctrl");
      if (e.shiftKey) parts.push("Shift");
      if (e.altKey) parts.push("Alt");

      const key = e.key;
      if (!["Meta", "Control", "Shift", "Alt"].includes(key)) {
        parts.push(key.length === 1 ? key.toUpperCase() : key);
      }

      if (parts.length > 0) {
        setCurrentKeys([...parts]);
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        stopRecording(parts);
      }, 800);
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isRecording, isVisible, stopRecording]);

  // Stop recording if demo scrolls out of view
  useEffect(() => {
    if (!isVisible && isRecording) {
      stopRecording(currentKeys);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div className="w-full" ref={containerRef}>
      <div
        className={`border bg-card/80 overflow-hidden transition-colors ${
          isRecording ? "border-red-500/50" : "border-border"
        }`}
        tabIndex={0}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/20">
          <div className="flex items-center gap-2">
            {isRecording && (
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            )}
            <span className="font-mono text-[10px] text-muted-foreground">
              {isRecording ? "listening... press any key combo" : "keybind recorder"}
            </span>
          </div>
          <button
            type="button"
            onClick={isRecording ? () => stopRecording(currentKeys) : startRecording}
            className={`px-2 py-0.5 font-mono text-[9px] border transition-colors ${
              isRecording
                ? "border-red-500/40 text-red-400 bg-red-500/5 hover:bg-red-500/10"
                : "border-primary/40 text-primary hover:bg-primary/10"
            }`}
          >
            {isRecording ? "stop" : "record"}
          </button>
        </div>

        {/* Current recording display */}
        <div className="flex items-center justify-center px-3 py-5 min-h-[64px]">
          {isRecording && currentKeys.length > 0 ? (
            <div className="flex items-center gap-1.5">
              {currentKeys.map((key, i) => (
                <span key={`${key}-${i}`} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-muted-foreground/30 text-xs">+</span>}
                  <kbd className="font-mono text-sm text-primary px-2.5 py-1 border border-primary/30 bg-primary/5 shadow-sm shadow-primary/10">
                    {key}
                  </kbd>
                </span>
              ))}
            </div>
          ) : isRecording ? (
            <div className="flex flex-col items-center gap-1.5">
              <span className="font-mono text-[10px] text-muted-foreground/40 animate-pulse">
                press a key combination...
              </span>
              <span className="font-mono text-[8px] text-muted-foreground/25">
                (captures globally -- no need to focus)
              </span>
            </div>
          ) : (
            <span className="font-mono text-[10px] text-muted-foreground/30">
              click record, then press any key combo
            </span>
          )}
        </div>

        {/* Recorded history */}
        {recorded.length > 0 && (
          <div className="flex flex-col border-t border-border/60 bg-secondary/10">
            <div className="px-3 pt-2 pb-1">
              <span className="font-mono text-[8px] text-muted-foreground/40 uppercase tracking-wider">recorded combos</span>
            </div>
            {recorded.map((entry, i) => (
              <div
                key={`${entry.display}-${i}`}
                className="flex items-center justify-between gap-2 px-3 py-2 border-t border-border/30 first:border-t-0"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <kbd className="font-mono text-[10px] text-primary">{entry.display}</kbd>
                  <span className="font-mono text-[9px] text-muted-foreground/50 truncate">{entry.code}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(entry.code, i)}
                  className="shrink-0 flex items-center gap-1 px-2 py-1 border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                  title="Copy code"
                >
                  {copied === i ? (
                    <Check className="h-3 w-3 text-primary" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span className="font-mono text-[8px]">{copied === i ? "copied" : "copy"}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Demo Resolver ───────────────────────────────────────────────
interface MiniDemoProps {
  demoId: "command-palette" | "text-editor" | "nav-scopes" | "recording";
}

export function MiniDemo({ demoId }: MiniDemoProps) {
  switch (demoId) {
    case "command-palette":
      return <CommandPaletteDemo />;
    case "text-editor":
      return <TextEditorDemo />;
    case "nav-scopes":
      return <NavScopesDemo />;
    case "recording":
      return <RecordingDemo />;
    default:
      return null;
  }
}

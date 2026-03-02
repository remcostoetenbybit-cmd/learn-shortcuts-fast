import { useState, useCallback, useEffect, useRef } from "react";
import { Search, ArrowUp, ArrowDown, CornerDownLeft } from "lucide-react";

// ─── Command Palette Mini-Demo ───────────────────────────────────
const paletteItems = [
  { label: "Save file", shortcut: "Cmd+S", category: "File" },
  { label: "Open search", shortcut: "Cmd+K", category: "Navigation" },
  { label: "Focus search bar", shortcut: "/", category: "Navigation" },
  { label: "Toggle sidebar", shortcut: "Cmd+B", category: "View" },
  { label: "Go to line", shortcut: "Ctrl+G", category: "Editor" },
  { label: "Format document", shortcut: "Shift+Alt+F", category: "Editor" },
];

function CommandPaletteDemo() {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = paletteItems.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

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
        const selected = filtered[selectedIndex];
        setFlash(selected.label);
        setTimeout(() => setFlash(null), 700);
        setQuery("");
      }
    },
    [filtered, selectedIndex]
  );

  return (
    <div className="w-full">
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
          {filtered.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setFlash(item.label);
                setTimeout(() => setFlash(null), 700);
                setQuery("");
                inputRef.current?.focus();
              }}
              className={`flex w-full items-center justify-between px-3 py-2 transition-colors duration-150 cursor-default text-left ${
                i === selectedIndex
                  ? "bg-primary/8 text-foreground"
                  : "text-muted-foreground hover:bg-card/60"
              }`}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <div className="flex items-center gap-2.5">
                {i === selectedIndex && (
                  <span className="w-0.5 h-3.5 bg-primary rounded-full" />
                )}
                <span className="font-mono text-[11px]">{item.label}</span>
                <span className="font-mono text-[9px] text-muted-foreground/40">
                  {item.category}
                </span>
              </div>
              <kbd className="font-mono text-[9px] text-muted-foreground/50">
                {item.shortcut}
              </kbd>
            </button>
          ))}
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
              ran: {flash}
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

  const pages = [
    { id: "home", label: "Home", key: "H" },
    { id: "dashboard", label: "Dashboard", key: "D" },
    { id: "settings", label: "Settings", key: "S" },
    { id: "profile", label: "Profile", key: "P" },
  ];

  const navigate = useCallback(
    (pageId: string) => {
      if (pageId !== currentPage) {
        setCurrentPage(pageId);
        setTrail((prev) => [...prev.slice(-4), pageId]);
      }
    },
    [currentPage]
  );

  return (
    <div className="w-full">
      <div className="border border-border bg-card/80 overflow-hidden">
        {/* Address bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-secondary/20">
          <span className="font-mono text-[9px] text-muted-foreground/40">/</span>
          <span className="font-mono text-[10px] text-primary">{currentPage}</span>
          <div className="flex-1" />
          <span className="font-mono text-[8px] text-muted-foreground/40">click to navigate</span>
        </div>

        {/* Page grid */}
        <div className="grid grid-cols-2 gap-px bg-border/30">
          {pages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => navigate(page.id)}
              className={`flex items-center justify-between px-3 py-3 transition-colors ${
                currentPage === page.id
                  ? "bg-primary/8 text-foreground"
                  : "bg-background text-muted-foreground hover:bg-card/60"
              }`}
            >
              <span className="font-mono text-[11px]">{page.label}</span>
              <kbd
                className={`font-mono text-[9px] px-1.5 py-0.5 border transition-colors ${
                  currentPage === page.id
                    ? "border-primary/30 text-primary bg-primary/5"
                    : "border-border/40 text-muted-foreground/40"
                }`}
              >
                g {page.key.toLowerCase()}
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

// ─── Recording Mode Demo ────────────────────────────────────────
function RecordingDemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState<string[]>([]);
  const [currentKeys, setCurrentKeys] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopRecording = useCallback(
    (parts: string[]) => {
      if (parts.length > 0) {
        const combo = parts.join("+");
        setRecorded((prev) => [...prev.slice(-4), combo]);
      }
      setIsRecording(false);
      setCurrentKeys([]);
    },
    []
  );

  const startRecording = useCallback(() => {
    setIsRecording(true);
    setCurrentKeys([]);
    // focus the container so it can capture keydown events
    setTimeout(() => containerRef.current?.focus(), 0);
  }, []);

  // Use a global keydown listener when recording to avoid focus issues
  useEffect(() => {
    if (!isRecording) return;

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
  }, [isRecording, stopRecording]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
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
          <div className="flex items-center gap-2 px-3 py-2 border-t border-border/60 bg-secondary/20 overflow-x-auto">
            <span className="font-mono text-[8px] text-muted-foreground/40 shrink-0">
              recorded:
            </span>
            {recorded.map((combo, i) => (
              <kbd
                key={`${combo}-${i}`}
                className="font-mono text-[9px] text-foreground/70 px-1.5 py-0.5 border border-border/60 bg-background shrink-0"
              >
                {combo}
              </kbd>
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

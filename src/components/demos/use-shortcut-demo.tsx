import { useState, useCallback, useRef } from "react";
import { useShortcut, formatShortcut } from "@remcostoeten/use-shortcut";
import { CodeBlock } from "@/components/showcase/CodeBlock";

interface ShortcutEvent {
  id: number;
  combo: string;
  display: string;
  label: string;
  timestamp: number;
}

const MAX_EVENTS = 12;

interface DemoShortcut {
  code: string;
  combo: string;
  display: string;
  label: string;
}

const DEMO_SHORTCUTS: DemoShortcut[] = [
  { code: '$.cmd.key("s").on(() => save())', combo: "cmd+s", display: "", label: "save" },
  { code: '$.mod.key("k").on(() => search())', combo: "mod+k", display: "", label: "search" },
  { code: '$.mod.key("z").on(() => undo())', combo: "mod+z", display: "", label: "undo" },
  { code: '$.mod.key("c").on(() => copy())', combo: "mod+c", display: "", label: "copy" },
  { code: '$.key("/").on(() => focusSearch())', combo: "/", display: "/", label: "focus search" },
  { code: '$.key("escape").on(() => dismiss())', combo: "escape", display: "Esc", label: "dismiss" },
];

export function UseShortcutDemo() {
  const [events, setEvents] = useState<ShortcutEvent[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [activeCombo, setActiveCombo] = useState<string | null>(null);
  const idRef = useRef(0);

  const pushEvent = useCallback((combo: string, display: string, label: string) => {
    const id = ++idRef.current;
    setEvents((prev) => [{ id, combo, display, label, timestamp: Date.now() }, ...prev].slice(0, MAX_EVENTS));
    setActiveCombo(combo);
    setTimeout(() => setActiveCombo(null), 400);
  }, []);

  const $ = useShortcut({ disabled: !isActive, ignoreInputs: true });

  const save = $.cmd.key("s").on(
    () => pushEvent("cmd+s", formatShortcut("cmd+s"), "save"),
    { preventDefault: true }
  );
  const search = $.mod.key("k").on(
    () => pushEvent("mod+k", formatShortcut("mod+k"), "search"),
    { preventDefault: true }
  );
  const undo = $.mod.key("z").on(
    () => pushEvent("mod+z", formatShortcut("mod+z"), "undo"),
    { preventDefault: true }
  );
  const copy = $.mod.key("c").on(
    () => pushEvent("mod+c", formatShortcut("mod+c"), "copy"),
    { preventDefault: true }
  );
  $.key("slash").on(
    () => pushEvent("/", "/", "focus search"),
  );
  $.key("escape").on(
    () => pushEvent("escape", "Esc", "dismiss"),
  );

  // Resolve display strings from the actual results
  const shortcuts = DEMO_SHORTCUTS.map((s, i) => ({
    ...s,
    display: i === 0 ? save.display
      : i === 1 ? search.display
      : i === 2 ? undo.display
      : i === 3 ? copy.display
      : s.display,
  }));

  // Build the source code shown alongside
  const sourceCode = `const $ = useShortcut()

${shortcuts.map((s) => s.code).join("\n")}`;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-muted-foreground lowercase">
          try these shortcuts — press any combo below
        </p>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`font-mono text-[10px] px-2 py-1 border border-dashed transition-colors ${
            isActive ? "border-primary/50 text-primary" : "border-border text-muted-foreground"
          }`}
        >
          [{isActive ? "active" : "paused"}]
        </button>
      </div>

      {/* Two-column: code + shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
        {/* Source code */}
        <div className="bg-card p-4 overflow-x-auto">
          <p className="font-mono text-[10px] text-muted-foreground lowercase mb-3">source</p>
          <pre className="text-[11px] leading-relaxed">
            <code className="font-mono text-muted-foreground">
              {sourceCode.split("\n").map((line, i) => {
                // Highlight the line whose shortcut was just triggered
                const isHighlighted = activeCombo && shortcuts.some(
                  (s) => s.combo === activeCombo && line.includes(s.label)
                );
                return (
                  <div
                    key={i}
                    className={`px-1 -mx-1 transition-colors duration-300 ${
                      isHighlighted ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    {line || "\u00A0"}
                  </div>
                );
              })}
            </code>
          </pre>
        </div>

        {/* Shortcut keys grid */}
        <div className="bg-background grid grid-cols-2 gap-px bg-border">
          {shortcuts.map((s) => (
            <div
              key={s.combo}
              className={`bg-background px-3 py-4 flex flex-col items-center gap-1.5 cursor-default transition-colors duration-300 ${
                activeCombo === s.combo ? "bg-primary/5" : ""
              }`}
            >
              <kbd
                className={`font-mono text-sm tracking-wider transition-colors duration-300 ${
                  activeCombo === s.combo ? "text-primary" : "text-foreground"
                }`}
              >
                {s.display}
              </kbd>
              <span className="font-mono text-[10px] text-muted-foreground lowercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Event log */}
      <div className="border border-border">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-card/50">
          <span className="font-mono text-[10px] text-muted-foreground lowercase">event log</span>
          {events.length > 0 && (
            <button
              onClick={() => setEvents([])}
              className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors"
            >
              [clear]
            </button>
          )}
        </div>
        <div className="min-h-[80px] max-h-[160px] overflow-y-auto">
          {events.length === 0 ? (
            <div className="flex items-center justify-center h-[80px]">
              <p className="font-mono text-[10px] text-muted-foreground/50 lowercase">
                press a shortcut to see it here...
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {events.map((ev, i) => (
                <div
                  key={ev.id}
                  className={`flex items-center gap-3 px-3 py-1.5 border-b border-border/50 last:border-0 ${
                    i === 0 ? "bg-primary/5" : ""
                  }`}
                  style={{ animation: i === 0 ? "slideIn 200ms ease-out" : undefined }}
                >
                  <kbd className="font-mono text-xs text-primary min-w-[60px]">{ev.display}</kbd>
                  <span className="font-mono text-[10px] text-muted-foreground lowercase flex-1">{ev.label}</span>
                  <span className="font-mono text-[10px] text-muted-foreground/40">
                    {new Date(ev.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

import { useState, useCallback, useRef, useEffect } from "react";
import { useShortcut, formatShortcut } from "@remcostoeten/use-shortcut";

interface ShortcutEvent {
  id: number;
  combo: string;
  display: string;
  label: string;
  timestamp: number;
}

const MAX_EVENTS = 12;

export function UseShortcutDemo() {
  const [events, setEvents] = useState<ShortcutEvent[]>([]);
  const [isActive, setIsActive] = useState(true);
  const idRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const pushEvent = useCallback((combo: string, display: string, label: string) => {
    const id = ++idRef.current;
    setEvents((prev) => [{ id, combo, display, label, timestamp: Date.now() }, ...prev].slice(0, MAX_EVENTS));
  }, []);

  const $ = useShortcut({ disabled: !isActive, ignoreInputs: true });

  // Register demo shortcuts
  const save = $.cmd.key("s").on(
    () => pushEvent("cmd+s", formatShortcut("cmd+s"), "save"),
    { preventDefault: true, description: "Save" }
  );

  const search = $.mod.key("k").on(
    () => pushEvent("mod+k", formatShortcut("mod+k"), "search"),
    { preventDefault: true, description: "Search" }
  );

  const undo = $.mod.key("z").on(
    () => pushEvent("mod+z", formatShortcut("mod+z"), "undo"),
    { preventDefault: true, description: "Undo" }
  );

  const copy = $.mod.key("c").on(
    () => pushEvent("mod+c", formatShortcut("mod+c"), "copy"),
    { preventDefault: true, description: "Copy" }
  );

  const slash = $.key("slash").on(
    () => pushEvent("/", "/", "focus search"),
    { description: "Focus search" }
  );

  const escape = $.key("escape").on(
    () => pushEvent("esc", "Esc", "dismiss"),
    { description: "Dismiss" }
  );

  const registeredShortcuts = [
    { display: save.display, combo: save.combo, label: "save" },
    { display: search.display, combo: search.combo, label: "search" },
    { display: undo.display, combo: undo.combo, label: "undo" },
    { display: copy.display, combo: copy.combo, label: "copy" },
    { display: "/", combo: "/", label: "focus search" },
    { display: "Esc", combo: "escape", label: "dismiss" },
  ];

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-muted-foreground lowercase">
          try these shortcuts — press any combo below
        </p>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`font-mono text-[10px] px-2 py-1 border border-dashed transition-colors ${
            isActive
              ? "border-primary/50 text-primary"
              : "border-border text-muted-foreground"
          }`}
        >
          [{isActive ? "active" : "paused"}]
        </button>
      </div>

      {/* Registered shortcuts grid */}
      <div className="grid grid-cols-3 gap-px bg-border">
        {registeredShortcuts.map((s) => (
          <div
            key={s.combo}
            className="bg-background px-3 py-3 flex flex-col items-center gap-1.5 group cursor-default"
          >
            <kbd className="font-mono text-sm text-foreground tracking-wider">
              {s.display}
            </kbd>
            <span className="font-mono text-[10px] text-muted-foreground lowercase">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Event log */}
      <div className="border border-border">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-card/50">
          <span className="font-mono text-[10px] text-muted-foreground lowercase">
            event log
          </span>
          {events.length > 0 && (
            <button
              onClick={() => setEvents([])}
              className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors"
            >
              [clear]
            </button>
          )}
        </div>

        <div className="min-h-[120px] max-h-[200px] overflow-y-auto">
          {events.length === 0 ? (
            <div className="flex items-center justify-center h-[120px]">
              <p className="font-mono text-[10px] text-muted-foreground/50 lowercase">
                press a shortcut to see it here...
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {events.map((ev, i) => (
                <div
                  key={ev.id}
                  className={`flex items-center gap-3 px-3 py-2 border-b border-border/50 last:border-0 ${
                    i === 0 ? "bg-primary/5" : ""
                  }`}
                  style={{
                    animation: i === 0 ? "slideIn 200ms ease-out" : undefined,
                  }}
                >
                  <kbd className="font-mono text-xs text-primary min-w-[60px]">
                    {ev.display}
                  </kbd>
                  <span className="font-mono text-[10px] text-muted-foreground lowercase flex-1">
                    {ev.label}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/40">
                    {new Date(ev.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
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

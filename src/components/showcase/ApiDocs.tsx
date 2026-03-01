import { CodeBlock } from "./CodeBlock";

interface ChainMethod {
  name: string;
  signature: string;
  description: string;
}

const modifierMethods: ChainMethod[] = [
  {
    name: ".ctrl",
    signature: "$.ctrl",
    description:
      "Adds the Control modifier to the shortcut chain. On all platforms this maps to the Ctrl key.",
  },
  {
    name: ".shift",
    signature: "$.shift",
    description:
      "Adds the Shift modifier. Commonly used with alpha keys for uppercase-style bindings or toolbar shortcuts.",
  },
  {
    name: ".alt",
    signature: "$.alt",
    description:
      "Adds the Alt (Option on macOS) modifier to the chain.",
  },
  {
    name: ".cmd",
    signature: "$.cmd",
    description:
      "Adds the Meta (Command) modifier. Maps to the Command key on macOS and the Windows key on Windows/Linux.",
  },
  {
    name: ".mod",
    signature: "$.mod",
    description:
      "Cross-platform modifier. Resolves to Command on macOS and Ctrl on Windows/Linux. Use this when you want your shortcut to feel native on every OS.",
  },
];

const chainMethods: ChainMethod[] = [
  {
    name: ".key(k)",
    signature: '$.key("s")',
    description:
      'Sets the action key for the shortcut. Accepts any alpha key (a-z), number (0-9), function key (f1-f12), navigation key (arrowup, home, etc.), special key (enter, escape, space, tab, backspace, delete), or symbol key (slash, comma, etc.). After calling .key() the chain is ready to receive .on(), .then(), .except() or .in().',
  },
  {
    name: ".on(handler, options?)",
    signature: '$.mod.key("s").on(() => save())',
    description:
      "Attaches the handler callback and finalizes the shortcut registration. Once .on() is called the shortcut is live and listening for key events. Returns a ShortcutResult object with controls like unbind(), enable(), disable(), trigger(), and display info. You can optionally pass HandlerOptions as the second argument to set preventDefault, delay, priority, etc.",
  },
  {
    name: ".then(k)",
    signature: '$.key("g").then("d")',
    description:
      'Adds a sequential step to create a multi-key sequence (like Vim or GitHub navigation). The user must press the keys in order within the sequenceTimeout window (default 800ms). Steps can also include modifiers as strings: .then("shift+d"). You can chain multiple .then() calls for longer sequences.',
  },
  {
    name: ".in(scopes)",
    signature: '$.in("editor").mod.key("s")',
    description:
      "Restricts the shortcut to one or more named scopes. The shortcut will only fire when at least one of the specified scopes is currently active. Accepts a single string or an array of strings. Can be placed anywhere in the chain \u2014 before modifiers, after .key(), or even after .then().",
  },
  {
    name: ".except(condition)",
    signature: '$.key("/").except("typing")',
    description:
      'Adds an exception condition. When the condition is true the shortcut is skipped even if the key combo matches. Accepts built-in presets: "input" (skip in input/textarea/select), "editable" (skip in contentEditable), "typing" (combines input + editable), "modal" (skip when a dialog is open), "disabled" (skip when element is disabled). You can also pass an array of presets or a custom predicate function (event: KeyboardEvent) => boolean.',
  },
];

const resultProperties: { name: string; type: string; description: string }[] = [
  {
    name: "unbind()",
    type: "() => void",
    description: "Removes the keyboard listener and unregisters the shortcut.",
  },
  {
    name: "display",
    type: "string",
    description:
      'Platform-aware display string. Shows symbols on macOS (e.g. "\u2318S") and text on Windows/Linux (e.g. "Ctrl+S").',
  },
  {
    name: "combo",
    type: "string",
    description:
      'Normalized combo string used internally for matching, e.g. "cmd+s" or "g d".',
  },
  {
    name: "trigger()",
    type: "() => void",
    description: "Programmatically fires the handler as if the shortcut was pressed.",
  },
  {
    name: "isEnabled",
    type: "boolean",
    description: "Read-only flag indicating whether the shortcut is currently active.",
  },
  {
    name: "enable()",
    type: "() => void",
    description: "Re-enables the shortcut after it has been disabled.",
  },
  {
    name: "disable()",
    type: "() => void",
    description: "Temporarily disables the shortcut without unbinding it.",
  },
  {
    name: "onAttempt(cb)",
    type: "(cb) => () => void",
    description:
      "Subscribe to every shortcut attempt event. The callback receives (matched: boolean, event: KeyboardEvent). Useful for visual feedback on key presses. Returns an unsubscribe function.",
  },
];

const scopeMethods: { name: string; signature: string; description: string }[] = [
  {
    name: "$.setScopes(scopes)",
    signature: '$.setScopes("editor")',
    description:
      "Replaces all active scopes at runtime. Accepts a string or string[]. Any shortcut whose .in() scope is no longer active will stop firing until the scope is restored.",
  },
  {
    name: "$.enableScope(scope)",
    signature: '$.enableScope("navigation")',
    description:
      "Adds a single scope to the active set without replacing existing ones.",
  },
  {
    name: "$.disableScope(scope)",
    signature: '$.disableScope("navigation")',
    description:
      "Removes a single scope from the active set.",
  },
  {
    name: "$.getScopes()",
    signature: "$.getScopes()",
    description:
      "Returns the current list of active scope names as string[].",
  },
  {
    name: "$.isScopeActive(scope)",
    signature: '$.isScopeActive("editor")',
    description:
      "Returns true if the given scope is currently in the active set.",
  },
];

export function ApiDocs() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Philosophy */}
      <section>
        <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-3">
          chainable syntax
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground lowercase mb-4">
          use-shortcut is built around a fluent, chainable builder pattern. instead of passing a string like{" "}
          <code className="font-mono text-primary">"ctrl+shift+s"</code> and hoping you got it right,
          you chain modifiers and actions one at a time with full typescript intellisense at every step.
          each chain method returns a new builder, so the type system can prevent you from adding the same modifier twice
          or forgetting to attach a handler.
        </p>
        <p className="text-xs leading-relaxed text-muted-foreground lowercase mb-4">
          the dollar sign convention (<code className="font-mono text-primary">$</code>) is just a shorthand &mdash;
          you can name the builder anything. the chain reads left to right: modifiers first, then the key, then
          the action. sequences use <code className="font-mono text-primary">.then()</code> to add additional steps.
        </p>
        <CodeBlock
          code={`const $ = useShortcut()

// reads as: "command + shift + key S, then save"
$.cmd.shift.key("s").on(() => save())

// reads as: "key G, then key D, then go to dashboard"
$.key("g").then("d").on(() => goToDashboard())

// reads as: "in editor scope, mod + key S, then save file"
$.in("editor").mod.key("s").on(() => saveFile())`}
        />
      </section>

      {/* Modifier methods */}
      <section>
        <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-3">
          modifier methods
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground lowercase mb-4">
          modifiers are chained before <code className="font-mono text-primary">.key()</code> and can be
          combined in any order. the type system ensures each modifier is used at most once per chain.
        </p>
        <div className="overflow-hidden border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-3 py-2.5 font-mono text-xs font-medium lowercase text-muted-foreground">method</th>
                <th className="px-3 py-2.5 font-mono text-xs font-medium lowercase text-muted-foreground">description</th>
              </tr>
            </thead>
            <tbody>
              {modifierMethods.map((m) => (
                <tr key={m.name} className="border-b border-border last:border-0">
                  <td className="px-3 py-2.5 font-mono text-xs font-semibold text-primary whitespace-nowrap align-top">
                    {m.name}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground leading-relaxed">
                    {m.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Chain methods */}
      <section>
        <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-3">
          chain methods
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground lowercase mb-4">
          these are the core building blocks of every shortcut. each method returns a new chain
          so you can keep composing until you attach a handler with{" "}
          <code className="font-mono text-primary">.on()</code>.
        </p>
        <div className="flex flex-col gap-6">
          {chainMethods.map((m) => (
            <div key={m.name} className="border border-border">
              <div className="px-4 py-3 border-b border-border bg-secondary/30">
                <code className="font-mono text-xs font-semibold text-primary">{m.name}</code>
              </div>
              <div className="px-4 py-3 flex flex-col gap-2">
                <p className="text-xs text-muted-foreground leading-relaxed">{m.description}</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">example</span>
                  <code className="font-mono text-[11px] text-foreground/70">{m.signature}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sequences deep-dive */}
      <section>
        <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-3">
          sequences
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground lowercase mb-4">
          sequences let you build multi-step shortcuts where keys are pressed in order, one after another (not
          held simultaneously). this is the same pattern used by vim (<code className="font-mono text-primary">gg</code>),
          github (<code className="font-mono text-primary">g d</code>), and vscode (<code className="font-mono text-primary">ctrl+k ctrl+s</code>).
          each <code className="font-mono text-primary">.then()</code> adds a new step. the user has{" "}
          <code className="font-mono text-primary">sequenceTimeout</code> ms (default 800) to complete the
          full sequence. if they take too long, progress resets.
        </p>
        <CodeBlock
          code={`// two-step: press G, then press D
$.key("g").then("d").on(() => goToDashboard())

// three-step sequence
$.key("g").then("i").then("p").on(() => goToInboxPrimary())

// steps can include modifiers as strings
$.key("g").then("shift+d").on(() => openDebugPanel())

// custom timeout (ms) — passed via handler options
$.key("z").then("z").on(() => toggleZen(), { sequenceTimeout: 1200 })`}
        />
        <p className="text-xs leading-relaxed text-muted-foreground lowercase mt-4">
          internally, the builder tracks progress through the sequence steps. if the user presses
          a wrong key mid-sequence the progress resets. if they press the first key of the sequence
          again, it restarts from step 1 rather than fully resetting.
        </p>
      </section>

      {/* Scopes deep-dive */}
      <section>
        <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-3">
          scopes
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground lowercase mb-4">
          scopes let you create named contexts for your shortcuts. a shortcut registered with{" "}
          <code className="font-mono text-primary">{'.in("editor")'}</code> will only fire when the{" "}
          <code className="font-mono text-primary">"editor"</code> scope is in the active set.
          shortcuts with no <code className="font-mono text-primary">.in()</code> call are global and always
          fire regardless of which scopes are active. this lets you reuse the same key combo in
          different parts of your app without conflicts.
        </p>

        <CodeBlock
          code={`const $ = useShortcut({ activeScopes: "navigation" })

// only fires when "navigation" is active
$.in("navigation").key("g").then("d").on(() => goToDashboard())

// only fires when "editor" is active
$.in("editor").mod.key("s").on(() => saveFile())

// global — fires regardless of active scopes
$.mod.key("k").on(() => openCommandPalette())`}
        />

        <h3 className="font-display text-sm font-bold lowercase tracking-tight text-foreground mt-6 mb-3">
          how scopes are determined
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground lowercase mb-4">
          the initial active scopes come from the{" "}
          <code className="font-mono text-primary">activeScopes</code> option you pass to{" "}
          <code className="font-mono text-primary">useShortcut()</code>. at runtime, you switch scopes
          imperatively using the methods on the builder object. when react re-renders and the{" "}
          <code className="font-mono text-primary">activeScopes</code> option changes, the hook automatically
          syncs the internal scope set.
        </p>

        <CodeBlock
          code={`// switch all active scopes at once
$.setScopes("editor")
$.setScopes(["editor", "sidebar"])

// add/remove individual scopes
$.enableScope("navigation")
$.disableScope("navigation")

// query scope state
$.getScopes()                  // ["editor"]
$.isScopeActive("editor")     // true
$.isScopeActive("navigation") // false`}
        />

        <div className="overflow-hidden border border-border mt-6">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-3 py-2.5 font-mono text-xs font-medium lowercase text-muted-foreground">method</th>
                <th className="px-3 py-2.5 font-mono text-xs font-medium lowercase text-muted-foreground">description</th>
              </tr>
            </thead>
            <tbody>
              {scopeMethods.map((m) => (
                <tr key={m.name} className="border-b border-border last:border-0">
                  <td className="px-3 py-2.5 font-mono text-xs font-semibold text-primary whitespace-nowrap align-top">
                    {m.name}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground leading-relaxed">
                    {m.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Except presets */}
      <section>
        <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-3">
          except presets
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground lowercase mb-4">
          exception presets let you skip shortcuts in certain conditions without writing custom logic.
          the library ships with five built-in presets.
        </p>
        <div className="overflow-hidden border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-3 py-2.5 font-mono text-xs font-medium lowercase text-muted-foreground">preset</th>
                <th className="px-3 py-2.5 font-mono text-xs font-medium lowercase text-muted-foreground">skips when</th>
              </tr>
            </thead>
            <tbody>
              {[
                { preset: '"input"', when: "Focus is on an <input>, <textarea>, or <select> element." },
                { preset: '"editable"', when: "Focus is on a contentEditable element." },
                { preset: '"typing"', when: "Combines input + editable \u2014 skip in any text entry context." },
                { preset: '"modal"', when: 'A modal or dialog is open (checks [data-modal="true"] or [role="dialog"]).' },
                { preset: '"disabled"', when: "The focused element has the disabled attribute or aria-disabled=\"true\"." },
              ].map((row) => (
                <tr key={row.preset} className="border-b border-border last:border-0">
                  <td className="px-3 py-2.5 font-mono text-xs font-semibold text-primary whitespace-nowrap align-top">
                    {row.preset}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground leading-relaxed">
                    {row.when}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock
          code={`// single preset
$.key("/").except("typing").on(() => focusSearch())

// multiple presets
$.key("escape").except(["modal", "input"]).on(() => closePanel())

// custom predicate function
$.mod.key("s").except((e) => {
  return (e.target as HTMLElement).closest(".readonly") !== null
}).on(() => save())`}
        />
      </section>

      {/* ShortcutResult */}
      <section>
        <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-3">
          shortcut result
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground lowercase mb-4">
          every <code className="font-mono text-primary">.on()</code> call returns a{" "}
          <code className="font-mono text-primary">ShortcutResult</code> object that gives you
          full control over the registered shortcut.
        </p>
        <div className="overflow-hidden border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-3 py-2.5 font-mono text-xs font-medium lowercase text-muted-foreground">property</th>
                <th className="px-3 py-2.5 font-mono text-xs font-medium lowercase text-muted-foreground">type</th>
                <th className="px-3 py-2.5 font-mono text-xs font-medium lowercase text-muted-foreground">description</th>
              </tr>
            </thead>
            <tbody>
              {resultProperties.map((p) => (
                <tr key={p.name} className="border-b border-border last:border-0">
                  <td className="px-3 py-2.5 font-mono text-xs font-semibold text-primary whitespace-nowrap align-top">
                    {p.name}
                  </td>
                  <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground whitespace-nowrap align-top">
                    {p.type}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-muted-foreground leading-relaxed">
                    {p.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock
          code={`const result = $.mod.key("s").on(() => save())

// use the display string in your UI
<kbd>{result.display}</kbd>  // "⌘S" on mac, "Ctrl+S" on windows

// toggle the shortcut at runtime
result.disable()
result.enable()

// visual feedback on every key attempt
result.onAttempt?.((matched, event) => {
  if (matched) flashIndicator()
})`}
        />
      </section>

      {/* Additional exports */}
      <section>
        <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-3">
          additional exports
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground lowercase mb-4">
          beyond the core <code className="font-mono text-primary">useShortcut</code> hook, the library
          exports several helpers for bulk registration, non-react usage, recording, and grouping.
        </p>
        <div className="flex flex-col gap-6">
          {/* useShortcutMap */}
          <div className="border border-border">
            <div className="px-4 py-3 border-b border-border bg-secondary/30">
              <code className="font-mono text-xs font-semibold text-primary">useShortcutMap(map, options?)</code>
            </div>
            <div className="px-4 py-3 flex flex-col gap-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                bulk-register shortcuts from a declarative object. each entry specifies keys (string or array for
                sequences), a handler, and optional handler options. returns a typed record of ShortcutResult objects
                keyed by the same names you used in the map.
              </p>
            </div>
          </div>

          {/* createShortcut */}
          <div className="border border-border">
            <div className="px-4 py-3 border-b border-border bg-secondary/30">
              <code className="font-mono text-xs font-semibold text-primary">createShortcut(options?)</code>
            </div>
            <div className="px-4 py-3 flex flex-col gap-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                creates a shortcut builder for non-react usage (vanilla JS, node scripts, etc). unlike useShortcut
                this does not auto-cleanup on unmount &mdash; you must call .unbind() on each result manually.
              </p>
            </div>
          </div>

          {/* record */}
          <div className="border border-border">
            <div className="px-4 py-3 border-b border-border bg-secondary/30">
              <code className="font-mono text-xs font-semibold text-primary">$.record(options?)</code>
            </div>
            <div className="px-4 py-3 flex flex-col gap-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                enters recording mode and returns a promise that resolves to the next key combo the user presses (e.g.
                "ctrl+k" or "cmd+shift+p"). useful for building custom keybind UIs where users can set their own
                shortcuts. accepts an optional timeoutMs to auto-reject if no key is pressed.
              </p>
            </div>
          </div>

          {/* groups */}
          <div className="border border-border">
            <div className="px-4 py-3 border-b border-border bg-secondary/30">
              <code className="font-mono text-xs font-semibold text-primary">createShortcutGroup() / useShortcutGroup()</code>
            </div>
            <div className="px-4 py-3 flex flex-col gap-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                groups let you batch-manage multiple shortcut results. add results with .add() or .addMany(),
                then call .unbindAll() to remove every shortcut in the group at once. the react variant
                (useShortcutGroup) uses a ref internally so the group persists across renders.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

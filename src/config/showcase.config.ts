import type { ReactNode } from "react";

/**
 * Central configuration for the package showcase template.
 * Edit this file to customize all content, links, and theming.
 */

export interface ShowcaseNavLink {
  label: string;
  url: string;
}

export interface ShowcaseFeature {
  value?: string;
  label: string;
  description: string;
}

export interface ShowcaseApiProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ShowcaseCodeExample {
  title: string;
  code: string;
  language?: string;
}

export interface ShowcaseCta {
  label: string;
  url: string;
  primary?: boolean;
}

export interface ShowcaseWorksWithItem {
  label: string;
  url: string;
}

export interface ShowcaseConfig {
  /** Package display name (uppercase in hero) */
  packageName: string;

  /** Tagline shown above the title in mono brackets, e.g. "[lightweight react utility]" */
  tagline?: string;

  /** One-liner description shown below the title */
  description: string;

  /** Author / org info */
  author: {
    name: string;
    handle: string;
    url: string;
  };

  /** Navigation links shown in navbar with bracket notation */
  navLinks: ShowcaseNavLink[];

  /** External links */
  links: {
    npm: string;
    github: string;
  };

  /** Call-to-action buttons below hero */
  ctas?: ShowcaseCta[];

  /** "Works well with" framework badges */
  worksWith?: ShowcaseWorksWithItem[];

  /** Badge metadata */
  badges: {
    version: string;
    downloads: string;
    bundleSize: string;
  };

  /** Primary accent color as HSL values (e.g. "18 100% 50%") */
  primaryColor?: string;

  /** "Why" section content */
  why: {
    paragraphs: string[];
  };

  /** Feature grid items */
  features: ShowcaseFeature[];

  /** API props table */
  apiProps: ShowcaseApiProp[];

  /** Code examples */
  codeExamples: ShowcaseCodeExample[];

  /** Use cases text */
  useCases: string;
}

// ─── Default config: @remcostoeten/use-shortcut v1.3.0 ──────────────────────

const showcaseConfig: ShowcaseConfig = {
  packageName: "use-shortcut",

  tagline: "chainable keyboard shortcuts for react",

  description:
    "beautiful, typesafe keyboard shortcuts with chainable syntax, sequences, scopes & recording. zero dependencies.",

  author: {
    name: "Remco Stoeten",
    handle: "@remcostoeten",
    url: "https://github.com/remcostoeten",
  },

  navLinks: [
    { label: "docs", url: "#" },
    { label: "playground", url: "https://use-shortcuts.vercel.app" },
    { label: "changelog", url: "https://github.com/remcostoeten/use-shortcut/releases" },
  ],

  links: {
    npm: "https://www.npmjs.com/package/@remcostoeten/use-shortcut",
    github: "https://github.com/remcostoeten/use-shortcut",
  },

  ctas: [
    { label: "get started", url: "#install", primary: true },
    { label: "explore the docs", url: "https://use-shortcuts.vercel.app" },
  ],

  worksWith: [
    { label: "react", url: "https://react.dev/" },
    { label: "next.js", url: "https://nextjs.org/" },
    { label: "vite", url: "https://vitejs.dev/" },
    { label: "remix", url: "https://remix.run/" },
  ],

  badges: {
    version: "v1.3.0",
    downloads: "—",
    bundleSize: "~3kb",
  },

  primaryColor: undefined,

  why: {
    paragraphs: [
      "every app needs keyboard shortcuts. most solutions are either too heavy, poorly typed, or have stale closure bugs. use-shortcut solves all of it with a chainable api, perfect typescript intellisense, and zero dependencies.",
      "same input = same output. no api calls, no storage, no randomness. just deterministic, reliable behavior that works offline. mod resolves to ⌘ on mac and ctrl on windows — automatically.",
    ],
  },

  features: [
    { value: "~3kb", label: "tiny & tree-shakeable", description: "zero runtime overhead. only react as peer dependency." },
    { value: "$.then()", label: "sequences & chords", description: "multi-step bindings like g → d. github-style navigation shortcuts." },
    { value: "scopes", label: "named scopes", description: "activate/deactivate shortcut contexts like editor, navigation, modal." },
    { value: "ts", label: "perfect typescript", description: "complete type inference at every chain step. no @types needed." },
    { value: "cli", label: "scaffold & init", description: "shadcn-style init or full architecture scaffold with provider, registry & scopes." },
    { value: "⏺", label: "recording mode", description: "capture the next key combo for custom keybind UIs." },
  ],

  apiProps: [
    { name: "debug", type: "boolean", default: "false", description: "log all shortcuts and key presses to console." },
    { name: "delay", type: "number", default: "0", description: "global debounce delay in ms before triggering handler." },
    { name: "ignoreInputs", type: "boolean", default: "true", description: "skip shortcuts when focus is in input/textarea/select." },
    { name: "disabled", type: "boolean", default: "false", description: "disable all shortcuts registered by this hook." },
    { name: "eventType", type: '"keydown" | "keyup"', default: '"keydown"', description: "which keyboard event to listen for." },
    { name: "target", type: "EventTarget", default: "window", description: "dom element or window to attach the listener to." },
    { name: "activeScopes", type: "string | string[]", default: "—", description: "named scopes that are initially active." },
    { name: "sequenceTimeout", type: "number", default: "800", description: "ms allowed between sequence steps before reset." },
    { name: "conflictWarnings", type: "boolean", default: "false", description: "warn when two shortcuts have overlapping bindings." },
    { name: "onConflict", type: "(conflict) => void", default: "—", description: "callback when a shortcut conflict is detected." },
    { name: "eventFilter", type: "(event) => boolean", default: "—", description: "global filter to block events (e.g. composing)." },
  ],

  codeExamples: [
    {
      title: "basic usage",
      code: `import { useShortcut } from "@remcostoeten/use-shortcut"

function App() {
  const $ = useShortcut()

  $.cmd.key("s").on(() => save())
  $.mod.key("k").on(() => search())
  $.key("/").except("typing").on(() => focusSearch())

  return <div>press ⌘+S to save</div>
}`,
      language: "tsx",
    },
    {
      title: "sequences & scopes",
      code: `const $ = useShortcut({ activeScopes: "navigation" })

// github-style: press g, then d
$.key("g").then("d").on(() => goToDashboard())

// scoped shortcuts
$.in("editor").mod.key("s").on(() => saveFile())
$.in("navigation").key("g").then("p").on(() => goToProfile())

// switch scopes
$.setScopes("editor")
$.enableScope("navigation")`,
      language: "tsx",
    },
    {
      title: "recording & maps",
      code: `import { useShortcut, useShortcutMap } from "@remcostoeten/use-shortcut"

// record next key combo for custom keybind UI
const combo = await $.record({ timeoutMs: 5000 })

// register many shortcuts at once
useShortcutMap({
  save: { keys: "mod+s", handler: () => save() },
  undo: { keys: "mod+z", handler: () => undo() },
  dashboard: { keys: ["g", "d"], handler: () => go() },
})`,
      language: "tsx",
    },
    {
      title: "cli setup",
      code: `# copy source files (shadcn-style)
npx @remcostoeten/use-shortcut init

# scaffold full architecture
npx @remcostoeten/use-shortcut scaffold

# react scaffold with custom path
npx @remcostoeten/use-shortcut scaffold --framework react --target src`,
      language: "bash",
    },
  ],

  useCases:
    "command palettes, editor shortcuts, vim-style navigation, accessibility overlays, gaming controls, dashboard hotkeys, modal management, custom keybind UIs — anywhere you need reliable, typed keyboard shortcuts.",
};

export default showcaseConfig;

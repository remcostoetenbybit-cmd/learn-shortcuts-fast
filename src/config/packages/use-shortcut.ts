import type { PackageConfig } from "../types";

const useShortcutConfig: PackageConfig = {
  packageName: "use-shortcut",
  installName: "@remcostoeten/use-shortcut",
  tagline: "chainable keyboard shortcuts",
  description:
    "chainable keyboard shortcuts for react with perfect typescript intellisense. zero dependencies, ~3kb gzipped.",
  heroTitle: "use-shortcut",

  author: {
    name: "Remco Stoeten",
    handle: "@remcostoeten",
    url: "https://github.com/remcostoeten",
  },

  navLinks: [
    { label: "docs", url: "#api" },
    { label: "playground", url: "#demo" },
    { label: "github", url: "https://github.com/remcostoeten/use-shortcut" },
  ],

  links: {
    npm: "https://www.npmjs.com/package/@remcostoeten/use-shortcut",
    github: "https://github.com/remcostoeten/use-shortcut",
    demo: "https://use-shortcuts.vercel.app/",
  },

  ctas: [
    { label: "get started", url: "#install", primary: true },
    { label: "live playground", url: "https://use-shortcuts.vercel.app/" },
  ],

  badges: {
    version: "v1.3.0",
    downloads: "185/wk",
    bundleSize: "~3kb",
  },

  why: {
    paragraphs: [
      "most shortcut libraries give you a hook and a string. you lose type safety, can't chain modifiers, and have zero conflict detection. use-shortcut gives you a fluent, chainable api with perfect intellisense at every step.",
      "sequences like g→d, named scopes for context switching, recording mode for custom keybind UIs, shortcut maps for bulk registration — all with zero dependencies and ~3kb gzipped.",
    ],
  },

  features: [
    { value: "~3kb", label: "zero dependencies", description: "only react as peer dep. tiny bundle." },
    { value: "chain", label: "chainable api", description: "$.cmd.shift.key('s').on(() => save())" },
    { value: "ts", label: "perfect typescript", description: "intellisense at every step of the chain." },
    { value: "seq", label: "sequences & chords", description: "multi-step bindings like $.key('g').then('d')" },
    { value: "scope", label: "named scopes", description: "activate/deactivate shortcut contexts." },
    { value: "⌘/ctrl", label: "cross-platform", description: "mod = ⌘ on mac, ctrl on windows/linux." },
  ],

  apiProps: [
    { name: "debug", type: "boolean", default: "false", description: "log all shortcuts to console." },
    { name: "delay", type: "number", default: "0", description: "global delay for all shortcuts (ms)." },
    { name: "ignoreInputs", type: "boolean", default: "true", description: "ignore shortcuts in form elements." },
    { name: "disabled", type: "boolean", default: "false", description: "disable all shortcuts." },
    { name: "eventType", type: '"keydown" | "keyup"', default: '"keydown"', description: "keyboard event type." },
    { name: "activeScopes", type: "string | string[]", default: "—", description: "active named scopes." },
    { name: "sequenceTimeout", type: "number", default: "800", description: "ms to complete a sequence." },
    { name: "conflictWarnings", type: "boolean", default: "true", description: "warn on shortcut overlaps." },
  ],

  codeExamples: [
    {
      title: "quick start",
      code: `import { useShortcut } from "@remcostoeten/use-shortcut"

function App() {
  const $ = useShortcut()

  $.cmd.key("s").on(() => save())
  $.mod.key("k").on(() => search())
  $.key("/").except("typing").on(() => focusSearch())

  return <div>Press \u2318+S or \u2318+K</div>
}`,
      language: "tsx",
      demoId: "command-palette" as const,
    },
    {
      title: "sequences & chords",
      code: `// GitHub-style: press g, then d
$.key("g").then("d").on(() => goToDashboard())

// Steps can include modifiers too
$.key("g").then("shift+d").on(() => openDebug())`,
      language: "tsx",
      demoId: "nav-scopes" as const,
    },
    {
      title: "named scopes",
      code: `const $ = useShortcut({ activeScopes: "navigation" })

$.in("navigation").key("g").then("d").on(() => goToDashboard())
$.in("editor").mod.key("s").on(() => saveFile())

$.setScopes("editor")
$.enableScope("navigation")`,
      language: "tsx",
    },
    {
      title: "shortcut map",
      code: `import { useShortcutMap } from "@remcostoeten/use-shortcut"

useShortcutMap({
  save: { keys: "mod+s", handler: () => save() },
  undo: { keys: "mod+z", handler: () => undo() },
  dashboard: { keys: ["g", "d"], handler: () => goToDashboard() },
})`,
      language: "tsx",
      demoId: "text-editor" as const,
    },
    {
      title: "recording mode",
      code: `const combo = await $.record({ timeoutMs: 5000 })
// e.g. "ctrl+k" or "cmd+k"`,
      language: "tsx",
      demoId: "recording" as const,
    },
    {
      title: "real-world: mutations",
      tabs: [
        {
          label: "external api",
          code: `// app/hooks/usePostShortcuts.ts
import { useShortcut } from "@remcostoeten/use-shortcut"

export function usePostShortcuts(post: Post) {
  const $ = useShortcut()

  // \u2318+S triggers save via external API
  $.cmd.key("s").on(async () => {
    const res = await fetch("/api/posts", {
      method: "PUT",
      body: JSON.stringify(post),
    })
    if (!res.ok) throw new Error("Save failed")
    toast.success("Post saved")
  })
}`,
        },
        {
          label: "drizzle orm",
          code: `// app/actions/posts.ts
"use server"
import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function updatePost(id: string, data: PostData) {
  // Triggered by \u2318+S from the client hook
  const [updated] = await db
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning()

  if (!updated) throw new Error("Post not found")
  revalidateTag("posts")
  return updated
}`,
        },
      ],
      language: "tsx",
    },
  ],

  useCases: [],
};

export default useShortcutConfig;

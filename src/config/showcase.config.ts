import type { ReactNode } from "react";

/**
 * Central configuration for the package showcase template.
 * Edit this file to customize all content, links, and theming.
 */

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

export interface ShowcaseConfig {
  /** Package display name (uppercase in hero) */
  packageName: string;

  /** One-liner description shown below the title */
  description: string;

  /** Author / org info */
  author: {
    name: string;
    handle: string;
    url: string;
  };

  /** External links */
  links: {
    npm: string;
    github: string;
    docs?: string;
    changelog?: string;
  };

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

// ─── Default placeholder config ──────────────────────────────────────────────

const showcaseConfig: ShowcaseConfig = {
  packageName: "PACKAGE",

  description:
    "a react utility that does something great. zero dependencies. works with next.js, vite, remix.",

  author: {
    name: "Remco Stoeten",
    handle: "@remcostoeten",
    url: "https://github.com/remcostoeten",
  },

  links: {
    npm: "https://www.npmjs.com/package/package-name",
    github: "https://github.com/remcostoeten/package-name",
    docs: "#",
    changelog: "#",
  },

  badges: {
    version: "v0.0.0",
    downloads: "0/wk",
    bundleSize: "0kb",
  },

  // Override the default orange accent — set to any HSL string
  // primaryColor: "0 84% 60%",   // red example
  // primaryColor: "142 76% 36%", // green example
  primaryColor: undefined, // uses default from CSS (orange #fe5101)

  why: {
    paragraphs: [
      "every app needs this. most solutions are either too heavy, require external services, or are poorly typed. this package solves it with zero dependencies and full type safety.",
      "same input = same output. always. no api calls, no storage, no randomness. just deterministic, reliable behavior that works offline.",
    ],
  },

  features: [
    { value: "0kb", label: "no external assets", description: "tree-shakeable with zero runtime overhead." },
    { value: "api", label: "route handler", description: "generate images on the fly with a simple endpoint." },
    { value: "a11y", label: "accessible by default", description: "follows wai-aria patterns. keyboard navigable." },
    { value: "ts", label: "fully typed", description: "complete type inference. no @types needed." },
  ],

  apiProps: [
    { name: "option", type: "string", default: '""', description: "placeholder option description." },
    { name: "enabled", type: "boolean", default: "true", description: "whether the feature is enabled." },
    { name: "delay", type: "number", default: "0", description: "delay in ms before action triggers." },
    { name: "callback", type: "(value: T) => void", default: "—", description: "callback on completion." },
    { name: "target", type: "HTMLElement | null", default: "document", description: "dom element to attach to." },
  ],

  codeExamples: [
    {
      title: "how to use with react?",
      code: `import { usePackage } from "package-name"

function App() {
  const result = usePackage({
    option: "value",
    enabled: true,
  })

  return <div>{result.output}</div>
}`,
      language: "tsx",
    },
    {
      title: "need a different setup?",
      code: `import { createInstance } from "package-name"

const instance = createInstance({
  target: document.body,
  option: "value",
})

instance.enable()`,
      language: "tsx",
    },
  ],

  useCases:
    "dashboards, developer tools, productivity apps, games, accessibility overlays, command palettes — anywhere you need reliable, typed behavior.",
};

export default showcaseConfig;

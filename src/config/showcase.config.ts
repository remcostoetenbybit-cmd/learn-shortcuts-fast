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
  packageName: "pixel-heading-word",

  tagline: "whole-word pixel-font heading",

  description:
    "pixel-font heading that swaps between two fonts or cycles through all five on hover. uses geist pixel fonts with zero animation dependencies.",

  author: {
    name: "Remco Stoeten",
    handle: "@remcostoeten",
    url: "https://github.com/remcostoeten",
  },

  navLinks: [
    { label: "docs", url: "#" },
    { label: "playground", url: "#demo" },
    { label: "changelog", url: "https://github.com/remcostoeten/pixel-heading-word/releases" },
  ],

  links: {
    npm: "https://www.npmjs.com/package/@remcostoeten/pixel-heading-word",
    github: "https://github.com/remcostoeten/pixel-heading-word",
  },

  ctas: [
    { label: "get started", url: "#install", primary: true },
    { label: "explore the docs", url: "#" },
  ],

  worksWith: [
    { label: "react", url: "https://react.dev/" },
    { label: "next.js", url: "https://nextjs.org/" },
    { label: "vite", url: "https://vitejs.dev/" },
    { label: "remix", url: "https://remix.run/" },
  ],

  badges: {
    version: "v1.0.0",
    downloads: "—",
    bundleSize: "~2kb",
  },

  primaryColor: undefined,

  why: {
    paragraphs: [
      "every app needs personality. pixel fonts add a bold, retro-futuristic edge to your headings — but managing five font variants, hover states, and accessibility is tedious. pixel-heading-word handles it all with zero animation dependencies.",
      "two interaction modes — swap between two specific fonts or cycle through all five on hover. whole-word animation, keyboard support, aria-live labels, and full composability with any heading level.",
    ],
  },

  features: [
    { value: "~2kb", label: "zero dependencies", description: "css transitions only. no motion library needed." },
    { value: "2 modes", label: "swap & cycle", description: "swap between two fonts or cycle through all five on hover." },
    { value: "a11y", label: "fully accessible", description: "keyboard support, focus management, aria-live labels." },
    { value: "h1–h6", label: "any heading level", description: "renders as any heading element with full className support." },
    { value: "5 fonts", label: "geist pixel variants", description: "square, grid, circle, triangle, and line." },
    { value: "css", label: "css transitions", description: "smooth duration-150 transitions, no js animation overhead." },
  ],

  apiProps: [
    { name: "as", type: '"h1" | "h2" | ... | "h6"', default: '"h1"', description: "html heading level to render." },
    { name: "initialFont", type: '"square" | "grid" | "circle" | "triangle" | "line"', default: '"square"', description: "the resting pixel font displayed by default." },
    { name: "hoverFont", type: '"square" | "grid" | ... | "line"', default: "—", description: "font to show on hover. when set, swaps instead of cycling." },
    { name: "cycleInterval", type: "number", default: "300", description: "interval in ms between font cycles on hover (cycle mode only)." },
    { name: "defaultFontIndex", type: "number", default: "0", description: "initial font index (0–4). ignored when initialFont is set." },
    { name: "showLabel", type: "boolean", default: "false", description: "show the active font name label beneath the heading." },
    { name: "onFontIndexChange", type: "(index: number) => void", default: "—", description: "callback fired when the active font changes." },
    { name: "className", type: "string", default: "—", description: "additional css classes applied to the heading element." },
  ],

  codeExamples: [
    {
      title: "swap mode",
      code: `import { PixelHeading } from "@/components/ui/pixel-heading-word"

<PixelHeading initialFont="square" hoverFont="circle" className="text-6xl">
  Swap on hover
</PixelHeading>`,
      language: "tsx",
    },
    {
      title: "cycle mode",
      code: `<PixelHeading initialFont="square" className="text-6xl">
  Cycle on hover
</PixelHeading>

// omit hoverFont to cycle through all 5 fonts`,
      language: "tsx",
    },
    {
      title: "with label & callback",
      code: `<PixelHeading
  initialFont="grid"
  showLabel
  onFontIndexChange={(index) => console.log("Font index:", index)}
  className="text-6xl"
>
  With label
</PixelHeading>`,
      language: "tsx",
    },
    {
      title: "cli setup",
      code: `# shadcn-style install
npx shadcn@latest add https://cult-ui.com/r/pixel-heading-word.json

# or install geist fonts manually
npm install geist`,
      language: "bash",
    },
  ],

  useCases:
    "hero text, buttons, labels, smaller headings, retro-themed UIs, landing pages, interactive portfolios, creative agencies — anywhere you want bold, pixel-font personality with zero effort.",
};

export default showcaseConfig;

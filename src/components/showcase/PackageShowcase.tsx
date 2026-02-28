import { ReactNode } from "react";
import { InstallCommand } from "./InstallCommand";
import { DemoSection } from "./DemoSection";
import { FeatureGrid } from "./FeatureGrid";
import { ApiTable } from "./ApiTable";
import { CodeExamples } from "./CodeExamples";
import { FooterSection } from "./FooterSection";

interface PackageShowcaseProps {
  packageName?: string;
  byline?: string;
  bylineUrl?: string;
  description?: string;
  author?: string;
  authorUrl?: string;
  demoContent?: ReactNode;
  children?: ReactNode;
}

export function PackageShowcase({
  packageName = "PACKAGE",
  byline = "cossistant",
  bylineUrl = "#",
  description = "a react utility that does something great. zero dependencies. works with next.js, vite, remix.",
  author,
  authorUrl,
  demoContent,
}: PackageShowcaseProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Centered paper column */}
      <div className="mx-auto max-w-2xl border-x border-border min-h-screen">
        {/* Header */}
        <header className="border-b border-border px-8 pt-16 pb-10 text-center">
          <h1 className="font-display text-5xl font-black uppercase tracking-[0.3em] text-foreground sm:text-6xl">
            {packageName}
          </h1>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            by{" "}
            <a href={bylineUrl} className="text-foreground hover:text-primary transition-colors">
              {byline}
            </a>
          </p>
        </header>

        {/* Content */}
        <div className="flex flex-col gap-12 px-8 py-10">
          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground lowercase">
            {description}
          </p>

          {/* Install */}
          <InstallCommand packageName={packageName.toLowerCase()} />

          {/* Demo */}
          <DemoSection>{demoContent}</DemoSection>

          {/* Why section */}
          <div>
            <h2 className="font-display text-xl font-bold lowercase tracking-tight text-foreground mb-4">
              why {packageName.toLowerCase()}?
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground lowercase mb-6">
              every app needs this. most solutions are either too heavy, require external services, or are poorly typed. this package solves it with zero dependencies and full type safety.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground lowercase mb-8">
              same input = same output. always. no api calls, no storage, no randomness. just deterministic, reliable behavior that works offline.
            </p>
            <FeatureGrid />
          </div>

          {/* Code examples */}
          <CodeExamples />

          {/* API reference */}
          <ApiTable />

          {/* Use cases */}
          <div>
            <h2 className="font-display text-xl font-bold lowercase tracking-tight text-foreground mb-3">
              use cases
            </h2>
            <p className="text-sm text-muted-foreground lowercase">
              dashboards, developer tools, productivity apps, games, accessibility overlays, command palettes — anywhere you need reliable, typed behavior.
            </p>
          </div>

          {/* Footer */}
          <FooterSection author={author || byline} authorUrl={authorUrl || bylineUrl} />
        </div>
      </div>
    </div>
  );
}

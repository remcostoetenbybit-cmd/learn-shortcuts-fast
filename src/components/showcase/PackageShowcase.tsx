import { ReactNode } from "react";
import { InstallCommand } from "./InstallCommand";
import { DemoSection } from "./DemoSection";
import { FeatureGrid } from "./FeatureGrid";
import { ApiTable } from "./ApiTable";
import { CodeExamples } from "./CodeExamples";
import { FooterSection } from "./FooterSection";
import { BadgeBar } from "./BadgeBar";

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
      <div className="mx-auto max-w-2xl border-x border-border min-h-screen relative">
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
        <div className="flex flex-col gap-0">
          {/* Description */}
          <div className="px-8 py-10">
            <p className="text-sm leading-relaxed text-muted-foreground lowercase">
              {description}
            </p>
          </div>

          {/* Install — dashed breakout */}
          <div className="border-y border-dashed border-border -mx-[1px] px-8 py-10 bg-card/30">
            <InstallCommand packageName={packageName.toLowerCase()} />
          </div>

          {/* Demo — dashed breakout */}
          <div className="border-b border-dashed border-border -mx-[1px] px-8 py-10 bg-card/30">
            <DemoSection>{demoContent}</DemoSection>
          </div>

          {/* Badge bar */}
          <div className="px-8 py-6">
            <BadgeBar packageName={packageName.toLowerCase()} />
          </div>

          {/* Why section */}
          <div className="px-8 py-10">
            <h2 className="font-display text-xl font-bold lowercase tracking-tight text-foreground mb-4">
              why {packageName.toLowerCase()}?
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground lowercase mb-6">
              every app needs this. most solutions are either too heavy, require external services, or are poorly typed. this package solves it with zero dependencies and full type safety.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground lowercase mb-8">
              same input = same output. always. no api calls, no storage, no randomness. just deterministic, reliable behavior that works offline.
            </p>
          </div>

          {/* Feature grid — dashed breakout */}
          <div className="border-y border-dashed border-border -mx-[1px] px-8 py-10 bg-card/30">
            <FeatureGrid />
          </div>

          {/* Code examples */}
          <div className="px-8 py-10">
            <CodeExamples />
          </div>

          {/* API reference — dashed breakout */}
          <div className="border-y border-dashed border-border -mx-[1px] px-8 py-10 bg-card/30">
            <ApiTable />
          </div>

          {/* Use cases */}
          <div className="px-8 py-10">
            <h2 className="font-display text-xl font-bold lowercase tracking-tight text-foreground mb-3">
              use cases
            </h2>
            <p className="text-sm text-muted-foreground lowercase">
              dashboards, developer tools, productivity apps, games, accessibility overlays, command palettes — anywhere you need reliable, typed behavior.
            </p>
          </div>

          {/* Footer */}
          <div className="px-8 border-t border-dashed border-border">
            <FooterSection author={author || byline} authorUrl={authorUrl || bylineUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

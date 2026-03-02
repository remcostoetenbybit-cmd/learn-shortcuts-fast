import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { InstallCommand } from "./InstallCommand";
import { DemoSection } from "./DemoSection";
import { FeatureGrid } from "./FeatureGrid";
import { ApiTable } from "./ApiTable";
import { ApiDocs } from "./ApiDocs";
import { CodeExamples } from "./CodeExamples";
import { FooterSection } from "./FooterSection";
import { BadgeBar } from "./BadgeBar";
import { WorksWith } from "./WorksWith";
import { UseCaseCards } from "./UseCaseCards";
import { PixelHeading } from "@/components/ui/pixel-heading";
import type { PackageConfig } from "@/config/types";
import { ArrowRight } from "lucide-react";

interface PackageShowcaseProps {
  config: PackageConfig;
  demoContent?: ReactNode;
}

export function PackageShowcase({ config, demoContent }: PackageShowcaseProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-x-clip">
      <Navbar
        packageName={config.packageName}
        navLinks={config.navLinks}
        githubUrl={config.links.github}
      />

      {/* Extended border lines outside column */}
      <div className="hidden lg:block pointer-events-none select-none absolute inset-0" aria-hidden="true">
        {/* Horizontal rules that bleed outside the column */}
        <div className="absolute top-[320px] left-0 right-0 h-px bg-border/40" />
        <div className="absolute top-[320px] left-0 right-0 h-px border-t border-dashed border-border/30" style={{ top: "520px" }} />
        <div className="absolute left-0 right-0 h-px border-t border-dashed border-border/20" style={{ top: "780px" }} />
      </div>

      {/* Centered paper column */}
      <main className="mx-auto max-w-2xl border-x border-border min-h-screen relative z-10">
        {/* Header */}
        <header className="border-b border-border px-8 pt-12 pb-8">
          {config.tagline && (
            <p className="font-mono text-xs text-primary mb-4">
              [{config.tagline}]
            </p>
          )}

          <PixelHeading
            as="h1"
            mode="wave"
            autoPlay
            cycleInterval={250}
            staggerDelay={60}
            initialFont="square"
            className="text-3xl font-bold lowercase tracking-tight text-foreground sm:text-4xl leading-[1.1] mb-4"
          >
            {config.heroTitle}
          </PixelHeading>

          <p className="text-sm leading-relaxed text-muted-foreground lowercase max-w-lg">
            {config.description}
          </p>

          {config.ctas && config.ctas.length > 0 && (
            <div className="flex items-center gap-4 mt-6">
              {config.ctas.map((cta) =>
                cta.primary ? (
                  <a
                    key={cta.label}
                    href={cta.url}
                    className="inline-flex items-center gap-2 bg-foreground px-3.5 py-2 font-mono text-xs font-medium text-background hover:bg-foreground/90 transition-colors"
                  >
                    {cta.label}
                  </a>
                ) : (
                  <a
                    key={cta.label}
                    href={cta.url}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cta.label}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                )
              )}
            </div>
          )}
        </header>

        <div className="flex flex-col gap-0">
          {/* 1. Install — first for immediate action */}
          <div id="install" className="border-b border-dashed border-border -mx-[1px] px-8 py-8 bg-card/30">
            <InstallCommand
              packageName={config.installName}
              bundleSize={config.badges.bundleSize}
              version={config.badges.version}
            />
          </div>

          {/* 2. Works with + Badge bar */}
          <div className="px-8 py-6 flex flex-col gap-4">
            {config.worksWith && config.worksWith.length > 0 && (
              <WorksWith items={config.worksWith} />
            )}
            <BadgeBar
              packageName={config.packageName}
              npmUrl={config.links.npm}
              githubUrl={config.links.github}
              version={config.badges.version}
              downloads={config.badges.downloads}
              bundleSize={config.badges.bundleSize}
            />
          </div>

          {/* 3. Why section */}
          <div className="px-8 py-8 border-t border-border">
            <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-3">
              why {config.packageName}?
            </h2>
            {config.why.paragraphs.map((p, i) => (
              <p key={i} className="text-xs leading-relaxed text-muted-foreground lowercase mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>

          {/* 4. Feature grid */}
          <div className="border-y border-dashed border-border -mx-[1px] px-8 py-8 bg-card/30">
            <FeatureGrid features={config.features} />
          </div>

          {/* 5. Interactive playground */}
          <div id="demo" className="border-b border-dashed border-border -mx-[1px] px-8 py-8 bg-card/30">
            <DemoSection>{demoContent}</DemoSection>
          </div>

          {/* 6. Real-world examples with interactive mini-demos */}
          <div className="px-8 py-8">
            <CodeExamples examples={config.codeExamples} />
          </div>

          {/* 7. Use case cards (replaces the old paragraph) */}
          <div className="border-y border-dashed border-border -mx-[1px] px-8 py-8 bg-card/30">
            <UseCaseCards useCases={config.useCases} />
          </div>

          {/* 8. API deep dive */}
          <div id="api-docs" className="px-8 py-8">
            <ApiDocs />
          </div>

          {/* 9. API reference */}
          <div id="api" className="border-y border-dashed border-border -mx-[1px] px-8 py-8 bg-card/30">
            <ApiTable props={config.apiProps} />
          </div>

          {/* Footer */}
          <div className="px-8 border-t border-dashed border-border">
            <FooterSection
              author={config.author.name}
              authorUrl={config.author.url}
              version={config.badges.version}
              sourceUrl={config.links.github}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

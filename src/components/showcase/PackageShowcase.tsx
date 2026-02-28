import { ReactNode, useEffect } from "react";
import { InstallCommand } from "./InstallCommand";
import { DemoSection } from "./DemoSection";
import { FeatureGrid } from "./FeatureGrid";
import { ApiTable } from "./ApiTable";
import { CodeExamples } from "./CodeExamples";
import { FooterSection } from "./FooterSection";
import { BadgeBar } from "./BadgeBar";
import type { ShowcaseConfig } from "@/config/showcase.config";
import defaultConfig from "@/config/showcase.config";

interface PackageShowcaseProps {
  config?: Partial<ShowcaseConfig>;
  demoContent?: ReactNode;
}

export function PackageShowcase({
  config: overrides,
  demoContent,
}: PackageShowcaseProps) {
  const config = { ...defaultConfig, ...overrides };

  // Apply dynamic primary color if configured
  useEffect(() => {
    if (config.primaryColor) {
      document.documentElement.style.setProperty("--primary", config.primaryColor);
      document.documentElement.style.setProperty("--accent", config.primaryColor);
      document.documentElement.style.setProperty("--ring", config.primaryColor);
      return () => {
        document.documentElement.style.removeProperty("--primary");
        document.documentElement.style.removeProperty("--accent");
        document.documentElement.style.removeProperty("--ring");
      };
    }
  }, [config.primaryColor]);

  const pkgLower = config.packageName.toLowerCase();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl border-x border-border min-h-screen relative">
        {/* Header */}
        <header className="border-b border-border px-8 pt-16 pb-10 text-center">
          <h1 className="font-display text-5xl font-black uppercase tracking-[0.3em] text-foreground sm:text-6xl">
            {config.packageName}
          </h1>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            by{" "}
            <a href={config.author.url} className="text-foreground hover:text-primary transition-colors">
              {config.author.handle}
            </a>
          </p>
        </header>

        <div className="flex flex-col gap-0">
          {/* Description */}
          <div className="px-8 py-10">
            <p className="text-sm leading-relaxed text-muted-foreground lowercase">
              {config.description}
            </p>
          </div>

          {/* Install — dashed breakout */}
          <div className="border-y border-dashed border-border -mx-[1px] px-8 py-10 bg-card/30">
            <InstallCommand packageName={pkgLower} />
          </div>

          {/* Demo — dashed breakout */}
          <div className="border-b border-dashed border-border -mx-[1px] px-8 py-10 bg-card/30">
            <DemoSection>{demoContent}</DemoSection>
          </div>

          {/* Badge bar */}
          <div className="px-8 py-6">
            <BadgeBar
              packageName={pkgLower}
              npmUrl={config.links.npm}
              githubUrl={config.links.github}
              version={config.badges.version}
              downloads={config.badges.downloads}
              bundleSize={config.badges.bundleSize}
            />
          </div>

          {/* Why section */}
          <div className="px-8 py-10">
            <h2 className="font-display text-xl font-bold lowercase tracking-tight text-foreground mb-4">
              why {pkgLower}?
            </h2>
            {config.why.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground lowercase mb-6 last:mb-0">
                {p}
              </p>
            ))}
          </div>

          {/* Feature grid — dashed breakout */}
          <div className="border-y border-dashed border-border -mx-[1px] px-8 py-10 bg-card/30">
            <FeatureGrid features={config.features} />
          </div>

          {/* Code examples */}
          <div className="px-8 py-10">
            <CodeExamples examples={config.codeExamples} />
          </div>

          {/* API reference — dashed breakout */}
          <div className="border-y border-dashed border-border -mx-[1px] px-8 py-10 bg-card/30">
            <ApiTable props={config.apiProps} />
          </div>

          {/* Use cases */}
          <div className="px-8 py-10">
            <h2 className="font-display text-xl font-bold lowercase tracking-tight text-foreground mb-3">
              use cases
            </h2>
            <p className="text-sm text-muted-foreground lowercase">
              {config.useCases}
            </p>
          </div>

          {/* Footer */}
          <div className="px-8 border-t border-dashed border-border">
            <FooterSection author={config.author.name} authorUrl={config.author.url} />
          </div>
        </div>
      </div>
    </div>
  );
}

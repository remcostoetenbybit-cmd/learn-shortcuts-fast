import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { InstallCommand } from "./InstallCommand";
import { DemoSection } from "./DemoSection";
import { FeatureGrid } from "./FeatureGrid";
import { ApiTable } from "./ApiTable";
import { CodeExamples } from "./CodeExamples";
import { FooterSection } from "./FooterSection";
import { BadgeBar } from "./BadgeBar";
import { WorksWith } from "./WorksWith";
import { PixelHeading } from "@/components/ui/pixel-heading";
import type { ShowcaseConfig } from "@/config/showcase.config";
import defaultConfig from "@/config/showcase.config";
import { ArrowRight } from "lucide-react";

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
    <div className="min-h-screen bg-background relative overflow-x-clip">
      {/* Navbar */}
      <Navbar
        packageName={config.packageName}
        navLinks={config.navLinks}
        githubUrl={config.links.github}
      />

      {/* Floating decorative elements outside the column */}
      <div className="hidden lg:block pointer-events-none select-none" aria-hidden="true">
        {/* Left side floaters */}
        <div className="fixed top-[200px] left-[calc(50%-400px)] -translate-x-full">
          <PixelHeading
            as="h2"
            mode="random"
            autoPlay
            cycleInterval={400}
            className="text-4xl text-muted-foreground/10 rotate-[-8deg]"
          >
            pixel
          </PixelHeading>
        </div>
        <div className="fixed top-[450px] left-[calc(50%-380px)] -translate-x-full">
          <PixelHeading
            as="h3"
            mode="uniform"
            autoPlay
            cycleInterval={600}
            className="text-2xl text-muted-foreground/8 rotate-[4deg]"
          >
            swap
          </PixelHeading>
        </div>
        <div className="fixed top-[650px] left-[calc(50%-420px)] -translate-x-full">
          <PixelHeading
            as="h3"
            mode="wave"
            autoPlay
            cycleInterval={300}
            className="text-3xl text-muted-foreground/10 rotate-[-3deg]"
          >
            cycle
          </PixelHeading>
        </div>

        {/* Right side floaters */}
        <div className="fixed top-[280px] right-[calc(50%-400px)] translate-x-full">
          <PixelHeading
            as="h2"
            mode="wave"
            autoPlay
            cycleInterval={350}
            className="text-3xl text-muted-foreground/10 rotate-[6deg]"
          >
            heading
          </PixelHeading>
        </div>
        <div className="fixed top-[520px] right-[calc(50%-390px)] translate-x-full">
          <PixelHeading
            as="h3"
            mode="multi"
            autoPlay
            cycleInterval={500}
            className="text-2xl text-muted-foreground/8 rotate-[-5deg]"
          >
            geist
          </PixelHeading>
        </div>
        <div className="fixed top-[740px] right-[calc(50%-410px)] translate-x-full">
          <PixelHeading
            as="h3"
            mode="random"
            autoPlay
            cycleInterval={250}
            className="text-xl text-muted-foreground/10 rotate-[3deg]"
          >
            a11y
          </PixelHeading>
        </div>
      </div>

      {/* Centered paper column */}
      <div className="mx-auto max-w-2xl border-x border-border min-h-screen relative">
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
            cycleInterval={200}
            staggerDelay={40}
            initialFont="square"
            className="text-2xl font-bold lowercase tracking-tight text-foreground sm:text-3xl leading-[1.2]"
          >
            {config.description}
          </PixelHeading>

          {/* CTAs */}
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
          {/* Install — dashed breakout */}
          <div className="border-b border-dashed border-border -mx-[1px] px-8 py-8 bg-card/30">
            <InstallCommand packageName={`@remcostoeten/${pkgLower}`} />
          </div>

          {/* Demo — dashed breakout */}
          <div className="border-b border-dashed border-border -mx-[1px] px-8 py-8 bg-card/30">
            <DemoSection>{demoContent}</DemoSection>
          </div>

          {/* Works with + Badge bar */}
          <div className="px-8 py-6 flex flex-col gap-4">
            {config.worksWith && config.worksWith.length > 0 && (
              <WorksWith items={config.worksWith} />
            )}
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
          <div className="px-8 py-8 border-t border-border">
            <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-3">
              why {pkgLower}?
            </h2>
            {config.why.paragraphs.map((p, i) => (
              <p key={i} className="text-xs leading-relaxed text-muted-foreground lowercase mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>

          {/* Feature grid — dashed breakout */}
          <div className="border-y border-dashed border-border -mx-[1px] px-8 py-8 bg-card/30">
            <FeatureGrid features={config.features} />
          </div>

          {/* Code examples */}
          <div className="px-8 py-8">
            <CodeExamples examples={config.codeExamples} />
          </div>

          {/* API reference — dashed breakout */}
          <div className="border-y border-dashed border-border -mx-[1px] px-8 py-8 bg-card/30">
            <ApiTable props={config.apiProps} />
          </div>

          {/* Use cases */}
          <div className="px-8 py-8">
            <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-2">
              use cases
            </h2>
            <p className="text-xs text-muted-foreground lowercase leading-relaxed">
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

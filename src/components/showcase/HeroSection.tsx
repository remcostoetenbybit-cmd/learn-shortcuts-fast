import { InstallCommand } from "./InstallCommand";

interface HeroSectionProps {
  packageName?: string;
  tagline?: string;
  description?: string;
}

export function HeroSection({
  packageName = "package-name",
  tagline = "a tiny utility that does something great.",
  description = "zero dependencies. fully typed. framework agnostic.",
}: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="font-mono text-xs lowercase text-muted-foreground">v0.0.0 — placeholder</span>
      </div>

      <h1 className="font-display text-5xl font-black lowercase leading-[0.95] tracking-tighter text-foreground sm:text-7xl md:text-8xl">
        {packageName}
      </h1>

      <p className="mt-6 max-w-lg text-lg lowercase text-muted-foreground">{tagline}</p>
      <p className="mt-2 max-w-md text-sm lowercase text-muted-foreground/70">{description}</p>

      <div className="mt-10">
        <InstallCommand packageName={packageName} />
      </div>
    </section>
  );
}

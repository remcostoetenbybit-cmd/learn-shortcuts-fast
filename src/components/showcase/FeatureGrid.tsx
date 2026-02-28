import { Zap, Shield, Code2, Globe, type LucideIcon } from "lucide-react";

interface Feature {
  icon?: LucideIcon;
  label: string;
  value?: string;
  description: string;
}

interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  { icon: Zap, label: "lightweight", value: "~0kb", description: "tree-shakeable with zero runtime overhead. ships only what you use." },
  { icon: Code2, label: "fully typed", value: "ts", description: "written in typescript with complete type inference. no @types needed." },
  { icon: Shield, label: "accessible", value: "a11y", description: "follows wai-aria patterns. keyboard navigable. screen reader friendly." },
  { icon: Globe, label: "universal", value: "ssr", description: "works with react, next.js, remix, and any ssr framework out of the box." },
];

export function FeatureGrid({
  title = "why this package?",
  subtitle = "placeholder description explaining the core value proposition. replace with your package's actual selling points and philosophy.",
  features = defaultFeatures,
}: FeatureGridProps) {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <h2 className="font-display text-3xl font-bold lowercase tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => {
          const Icon = f.icon || Zap;
          return (
            <div
              key={f.label}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                {f.value && (
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">{f.value}</span>
                )}
              </div>
              <h3 className="text-sm font-semibold lowercase text-foreground">{f.label}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

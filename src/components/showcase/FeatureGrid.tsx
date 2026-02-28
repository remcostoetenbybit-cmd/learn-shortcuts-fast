import { type LucideIcon, Zap, Code2, Shield, Globe } from "lucide-react";

interface Feature {
  icon?: LucideIcon;
  label: string;
  value?: string;
  description: string;
}

interface FeatureGridProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  { value: "0kb", label: "no external assets", description: "tree-shakeable with zero runtime overhead." },
  { value: "api", label: "route handler", description: "generate images on the fly with a simple endpoint." },
  { value: "a11y", label: "accessible by default", description: "follows wai-aria patterns. keyboard navigable." },
  { value: "ts", label: "fully typed", description: "complete type inference. no @types needed." },
];

export function FeatureGrid({ features = defaultFeatures }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
      {features.map((f) => (
        <div key={f.label} className="flex flex-col gap-0.5">
          <span className="font-mono text-sm font-bold text-foreground">{f.value || f.label}</span>
          <span className="text-xs font-medium text-foreground/80 lowercase">{f.label}</span>
          <span className="text-[11px] leading-snug text-muted-foreground lowercase mt-0.5">{f.description}</span>
        </div>
      ))}
    </div>
  );
}

import type { ShowcaseWorksWithItem } from "@/config/showcase.config";

interface WorksWithProps {
  items: ShowcaseWorksWithItem[];
}

export function WorksWith({ items }: WorksWithProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="font-mono text-[10px] text-muted-foreground lowercase">works well with</span>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-dashed border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

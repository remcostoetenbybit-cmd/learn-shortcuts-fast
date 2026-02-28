import { ReactNode } from "react";

interface DemoSectionProps {
  title?: string;
  children?: ReactNode;
}

export function DemoSection({ title = "try it", children }: DemoSectionProps) {
  return (
    <section id="demo" className="mx-auto max-w-4xl px-6 py-20">
      <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-primary">{title}</span>
      <div className="rounded-xl border border-border bg-card p-8">
        {children || (
          <div className="flex flex-col items-center gap-6 py-12">
            <div className="w-full max-w-sm">
              <input
                type="text"
                placeholder="type something..."
                className="w-full rounded-md border border-border bg-secondary px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="w-full max-w-sm rounded-md border border-dashed border-border bg-background p-6 text-center">
              <p className="font-mono text-xs lowercase text-muted-foreground">output preview area</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

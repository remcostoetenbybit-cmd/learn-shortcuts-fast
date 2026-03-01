import { ReactNode } from "react";

interface DemoSectionProps {
  label?: string;
  children?: ReactNode;
}

export function DemoSection({ label = "try it — type anything", children }: DemoSectionProps) {
  return (
    <div className="w-full">
      <p className="font-mono text-xs lowercase text-muted-foreground mb-3">{label}</p>
      {children || (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="type something..."
            className="w-full border border-border bg-card px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center border border-dashed border-border bg-secondary font-mono text-xs text-muted-foreground">
              32
            </div>
            <div className="flex h-20 w-20 items-center justify-center border border-dashed border-border bg-secondary font-mono text-xs text-muted-foreground">
              48
            </div>
            <div className="flex h-24 w-24 items-center justify-center border border-dashed border-border bg-secondary font-mono text-xs text-muted-foreground">
              64
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

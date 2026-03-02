import { Search, Code2, Navigation, Settings, Accessibility, Workflow } from "lucide-react";
import type { UseCase } from "@/config/types";

const iconMap: Record<string, React.ElementType> = {
  search: Search,
  code: Code2,
  navigation: Navigation,
  settings: Settings,
  accessibility: Accessibility,
  workflow: Workflow,
};

interface UseCaseCardsProps {
  useCases: UseCase[];
}

export function UseCaseCards({ useCases }: UseCaseCardsProps) {
  return (
    <div className="w-full">
      <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground mb-6">
        built for
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/40 border border-border overflow-hidden">
        {useCases.map((useCase) => {
          const Icon = iconMap[useCase.icon] || Code2;
          return (
            <div
              key={useCase.title}
              className="group flex flex-col gap-3 p-5 bg-background hover:bg-card/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-7 w-7 border border-border bg-secondary/30 group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-mono text-xs font-semibold text-foreground lowercase">
                  {useCase.title}
                </h3>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground lowercase">
                {useCase.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

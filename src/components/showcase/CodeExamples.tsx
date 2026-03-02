import { CodeBlock } from "./CodeBlock";
import { MiniDemo } from "./MiniDemos";

interface Example {
  title: string;
  code: string;
  language?: string;
  demoId?: "command-palette" | "text-editor" | "nav-scopes" | "recording";
}

interface CodeExamplesProps {
  examples?: Example[];
}

const defaultExamples: Example[] = [
  {
    title: "how to use with react?",
    code: `import { usePackage } from "package-name"

function App() {
  const result = usePackage({
    option: "value",
    enabled: true,
  })

  return <div>{result.output}</div>
}`,
  },
  {
    title: "need a different setup?",
    code: `import { createInstance } from "package-name"

const instance = createInstance({
  target: document.body,
  option: "value",
})

instance.enable()`,
  },
];

export function CodeExamples({ examples = defaultExamples }: CodeExamplesProps) {
  return (
    <div className="flex flex-col gap-10 w-full">
      <h2 className="font-display text-base font-bold lowercase tracking-tight text-foreground">
        real-world examples
      </h2>
      {examples.map((ex) => (
        <div key={ex.title} className="flex flex-col gap-4">
          {/* Section label */}
          <div className="flex items-center gap-2">
            <span className="h-px flex-1 bg-border/40" />
            <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">
              {ex.title}
            </span>
            <span className="h-px flex-1 bg-border/40" />
          </div>

          {/* Code + Interactive demo side-by-side (stacked on mobile) */}
          {ex.demoId ? (
            <div className="flex flex-col gap-4">
              <CodeBlock code={ex.code} language={ex.language} />
              <div className="border-l-2 border-primary/20 pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60 animate-pulse" />
                  <span className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-wider">
                    interactive preview
                  </span>
                </div>
                <MiniDemo demoId={ex.demoId} />
              </div>
            </div>
          ) : (
            <CodeBlock code={ex.code} language={ex.language} />
          )}
        </div>
      ))}
    </div>
  );
}

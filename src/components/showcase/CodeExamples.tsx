import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

interface Example {
  label: string;
  title: string;
  code: string;
  language?: string;
}

interface CodeExamplesProps {
  heading?: string;
  examples?: Example[];
}

const defaultExamples: Example[] = [
  {
    label: "basic",
    title: "basic usage",
    language: "tsx",
    code: `import { usePackage } from 'package-name'

function App() {
  const result = usePackage({
    option: 'value',
    enabled: true,
  })

  return <div>{result.output}</div>
}`,
  },
  {
    label: "advanced",
    title: "with options",
    language: "tsx",
    code: `import { usePackage } from 'package-name'

function App() {
  const result = usePackage({
    option: 'value',
    delay: 200,
    callback: (value) => {
      console.log('completed:', value)
    },
  })

  return (
    <div>
      <p>Status: {result.isEnabled ? 'active' : 'inactive'}</p>
      <button onClick={result.toggle}>toggle</button>
    </div>
  )
}`,
  },
  {
    label: "vanilla",
    title: "without react",
    language: "ts",
    code: `import { createInstance } from 'package-name'

const instance = createInstance({
  target: document.body,
  option: 'value',
})

instance.enable()
instance.on('change', (value) => {
  console.log(value)
})`,
  },
];

export function CodeExamples({ heading = "examples", examples = defaultExamples }: CodeExamplesProps) {
  const [active, setActive] = useState(0);

  return (
    <section id="examples" className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="mb-8 font-display text-3xl font-bold lowercase tracking-tight text-foreground sm:text-4xl">
        {heading}
      </h2>

      <div className="mb-4 flex gap-1 rounded-lg border border-border bg-secondary p-1">
        {examples.map((ex, i) => (
          <button
            key={ex.label}
            onClick={() => setActive(i)}
            className={`rounded-md px-4 py-2 font-mono text-xs lowercase transition-colors ${
              active === i ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      <CodeBlock title={examples[active].title} code={examples[active].code} language={examples[active].language} />
    </section>
  );
}

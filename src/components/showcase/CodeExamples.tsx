import { CodeBlock } from "./CodeBlock";

interface Example {
  title: string;
  code: string;
  language?: string;
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
    <div className="flex flex-col gap-8 w-full">
      {examples.map((ex) => (
        <CodeBlock key={ex.title} title={ex.title} code={ex.code} language={ex.language} />
      ))}
    </div>
  );
}

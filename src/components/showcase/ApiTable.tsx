interface ApiProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface ApiTableProps {
  title?: string;
  props?: ApiProp[];
}

const defaultProps: ApiProp[] = [
  { name: "option", type: "string", default: '""', description: "placeholder option description. replace with actual prop details." },
  { name: "enabled", type: "boolean", default: "true", description: "whether the feature is enabled by default." },
  { name: "delay", type: "number", default: "0", description: "delay in milliseconds before the action triggers." },
  { name: "callback", type: "(value: T) => void", default: "—", description: "callback function invoked when the action completes." },
  { name: "target", type: "HTMLElement | null", default: "document", description: "the dom element to attach the listener to." },
];

export function ApiTable({ title = "api reference", props = defaultProps }: ApiTableProps) {
  return (
    <section id="api" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-8 font-display text-3xl font-bold lowercase tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="px-4 py-3 font-mono text-xs font-medium lowercase tracking-wider text-muted-foreground">name</th>
              <th className="px-4 py-3 font-mono text-xs font-medium lowercase tracking-wider text-muted-foreground">type</th>
              <th className="hidden px-4 py-3 font-mono text-xs font-medium lowercase tracking-wider text-muted-foreground sm:table-cell">default</th>
              <th className="px-4 py-3 font-mono text-xs font-medium lowercase tracking-wider text-muted-foreground">description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((p, i) => (
              <tr key={p.name} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-background"}`}>
                <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">{p.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.type}</td>
                <td className="hidden px-4 py-3 font-mono text-xs text-muted-foreground sm:table-cell">{p.default || "—"}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{p.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

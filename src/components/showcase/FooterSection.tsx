interface FooterSectionProps {
  author?: string;
  authorUrl?: string;
  version?: string;
  sourceUrl?: string;
}

export function FooterSection({
  author = "author",
  authorUrl = "#",
  version,
  sourceUrl,
}: FooterSectionProps) {
  return (
    <footer className="w-full pt-12 pb-4 flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="font-mono text-xs lowercase text-muted-foreground">
          made by{" "}
          <a href={authorUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {author}
          </a>
        </p>
        {version && (
          <span className="font-mono text-xs text-muted-foreground/60">{version}</span>
        )}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            [source]
          </a>
        )}
      </div>
    </footer>
  );
}

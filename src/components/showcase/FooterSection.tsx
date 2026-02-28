interface FooterSectionProps {
  author?: string;
  authorUrl?: string;
  packageName?: string;
}

export function FooterSection({
  author = "author",
  authorUrl = "#",
  packageName = "package-name",
}: FooterSectionProps) {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs lowercase text-muted-foreground">
          built by{" "}
          <a href={authorUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {author}
          </a>
        </p>
        <div className="flex items-center gap-3">
          <img
            src={`https://img.shields.io/npm/v/${packageName}?style=flat-square&color=fe5101&labelColor=1a1a1a`}
            alt="npm version"
            className="h-5"
          />
          <img
            src={`https://img.shields.io/npm/dm/${packageName}?style=flat-square&color=555&labelColor=1a1a1a`}
            alt="npm downloads"
            className="h-5"
          />
        </div>
      </div>
    </footer>
  );
}

interface FooterSectionProps {
  author?: string;
  authorUrl?: string;
}

export function FooterSection({
  author = "author",
  authorUrl = "#",
}: FooterSectionProps) {
  return (
    <div className="w-full pt-12 pb-4">
      <p className="font-mono text-xs lowercase text-muted-foreground">
        made by{" "}
        <a href={authorUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {author}
        </a>
      </p>
    </div>
  );
}

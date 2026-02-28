import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { DemoSection } from "./DemoSection";
import { FeatureGrid } from "./FeatureGrid";
import { ApiTable } from "./ApiTable";
import { CodeExamples } from "./CodeExamples";
import { FooterSection } from "./FooterSection";

interface PackageShowcaseProps {
  packageName?: string;
  tagline?: string;
  description?: string;
  githubUrl?: string;
  author?: string;
  authorUrl?: string;
  demoContent?: ReactNode;
  children?: ReactNode;
}

export function PackageShowcase({
  packageName = "package-name",
  tagline,
  description,
  githubUrl,
  author,
  authorUrl,
  demoContent,
}: PackageShowcaseProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar packageName={packageName} githubUrl={githubUrl} />
      <HeroSection packageName={packageName} tagline={tagline} description={description} />
      <DemoSection>{demoContent}</DemoSection>
      <FeatureGrid title={`why ${packageName}?`} />
      <CodeExamples />
      <ApiTable />
      <FooterSection packageName={packageName} author={author} authorUrl={authorUrl} />
    </div>
  );
}

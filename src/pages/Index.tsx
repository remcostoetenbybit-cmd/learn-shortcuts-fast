import { PackageShowcase } from "@/components/showcase/PackageShowcase";
import useShortcutConfig from "@/config/packages/use-shortcut";

const Index = () => {
  return <PackageShowcase config={useShortcutConfig} />;
};

export default Index;

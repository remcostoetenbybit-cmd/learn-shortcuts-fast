import { PackageShowcase } from "@/components/showcase/PackageShowcase";
import useShortcutConfig from "@/config/packages/use-shortcut";
import { UseShortcutDemo } from "@/components/demos/use-shortcut-demo";

const Index = () => {
  return (
    <PackageShowcase
      config={useShortcutConfig}
      demoContent={<UseShortcutDemo />}
    />
  );
};

export default Index;

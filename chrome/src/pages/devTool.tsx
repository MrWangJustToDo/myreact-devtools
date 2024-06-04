import { Layout } from "@/components/Layout";
import { NodeView } from "@/components/NodeView";
import { TreeView } from "@/components/TreeView";

export default function Page() {
  return (
    <main className="flex p-2 h-screen">
      <Layout left={<TreeView />} right={<NodeView />} />
    </main>
  );
}

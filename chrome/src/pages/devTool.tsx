import { Layout } from "@/components/Layout";
import { TreeView } from "@/components/TreeView";

export default function Page() {
  return (
    <main className="flex p-2 h-screen">
      <Layout left={<TreeView />} right={<div className="border rounded-sm border-gray-100 h-full">panel</div>} />
    </main>
  );
}

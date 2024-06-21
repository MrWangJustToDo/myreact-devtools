import { useEffect } from "react";
import { Toaster, toast } from "sonner";

import { Layout } from "@/components/Layout";
import { NodeView } from "@/components/NodeView";
import { TreeView } from "@/components/TreeView";
import { useConnect } from "@/hooks/useConnect";

export default function Page() {
  const error = useConnect((s) => s.error);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
    }
  }, [error]);

  return (
    <main className="flex p-2 h-screen">
      <Toaster richColors />
      <Layout left={<TreeView />} right={<NodeView />} />
    </main>
  );
}

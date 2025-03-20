import { addToast } from "@heroui/react";
import Head from "next/head";
import { useEffect } from "react";

import { Layout } from "@/components/Layout";
import { NodeView } from "@/components/NodeView";
import { TreeView } from "@/components/TreeView";
import { useConnect } from "@/hooks/useConnect";

export default function Page() {
  const error = useConnect((s) => s.error);

  useEffect(() => {
    if (error) {
      addToast({ severity: "danger", description: error, title: "error", color: "danger" });
    }
  }, [error]);

  return (
    <main className="flex p-1 h-screen">
      <Head>
        <title>@my-react devtools</title>
      </Head>
      <Layout left={<TreeView />} right={<NodeView />} />
    </main>
  );
}

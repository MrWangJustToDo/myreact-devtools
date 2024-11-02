import Head from "next/head";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

import { Layout } from "@/components/Layout";
import { NodeView } from "@/components/NodeView";
import { TreeView } from "@/components/TreeView";
import { useConnect } from "@/hooks/useConnect";

export default function Page() {
  const error = useConnect((s) => s.error);

  const { theme } = useTheme();

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-right" });
    }
  }, [error]);

  return (
    <main className="flex p-1 h-screen">
      <Head>
        <title>@my-react devtools</title>
      </Head>
      <Toaster richColors theme={theme === "dark" ? "dark" : "light"} />
      <Layout left={<TreeView />} right={<NodeView />} />
    </main>
  );
}

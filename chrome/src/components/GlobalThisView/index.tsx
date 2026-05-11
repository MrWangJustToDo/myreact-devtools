import { Button, Spinner } from "@heroui/react";
import { RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { useGlobalThis } from "@/hooks/useGlobalThis";

import { ValueView } from "../ValueView";

export const GlobalThisView = () => {
  const target = useGlobalThis((s) => s.target);

  useEffect(() => {
    useGlobalThis.getActions().forceLoad();
  }, []);

  if (!target) return <Spinner />;

  return (
    <div className="global-view h-full flex flex-col font-code font-sm">
      <div className="flex items-center justify-between px-2 py-1 border-b border-divider shrink-0">
        <span className="text-sm text-foreground-500">globalThis</span>
        <Button isIconOnly size="sm" variant="light" onPress={() => useGlobalThis.getActions().forceLoad()} title="Refresh globalThis">
          <RefreshCw className="w-[1em] text-foreground-500" />
        </Button>
      </div>
      <div className="group flex-1 overflow-auto">
        <ValueView name="globalThis" prefix={<span className="text-green-400 mx-1">●</span>} item={target} />
      </div>
    </div>
  );
};

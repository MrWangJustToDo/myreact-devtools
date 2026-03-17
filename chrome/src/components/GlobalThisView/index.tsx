import { Spinner } from "@heroui/react";
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
    <div className="global-view h-full font-code font-sm">
      <div className="group h-full overflow-auto">
        <ValueView name="globalThis" prefix={<span className="text-green-400 mx-1">●</span>} item={target} />
      </div>
    </div>
  );
};

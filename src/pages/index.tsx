import { ScrollShadow } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { useForceUpdate } from "@/hooks/useForceUpdate";

import type { MyReactFiberNode } from "@my-react/react-reconciler";

type RenderContainer = {
  __fiber__: MyReactFiberNode;
};

export default function Home() {
  const [ele, setEle] = useState<RenderContainer>();

  const count = useForceUpdate((s) => s.count);

  useEffect(() => {
  }, []);

  return (
    <>
      <main className="flex p-[10px]" data-count={count}>
        <ScrollShadow className="w-[66.5%] border rounded-l-[4px] p-[4px]">
        </ScrollShadow>
        <ScrollShadow className="w-[33.5%] border border-l-[0] rounded-r-[4px] p-[4px]">
        </ScrollShadow>
      </main>
    </>
  );
}

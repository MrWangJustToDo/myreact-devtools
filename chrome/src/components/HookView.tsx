import { Chip, Spacer } from "@nextui-org/react";

import { useTreeNode } from "@/hooks/useTreeNode";

export const HookView = () => {
  const select = useTreeNode((s) => s.select);

  const hasHook = select?.current?.hookTree?.length;

  if (hasHook) {
    return (
      <div className="p-2">
        <div>hooks</div>
        <Spacer y={1} />
        <div className="flex flex-col gap-y-[2px] ml-4">
          {select?.current?.hookTree?.map((hook, index) => {
            return (
              <div key={hook} className="flex items-center">
                <Chip size="sm" radius="none" className=" rounded-sm mr-1 text-[8px] w-[12px] h-[12px]">
                  {index}
                </Chip>
                <div className="text-[12px] text-gray-500">{hook}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

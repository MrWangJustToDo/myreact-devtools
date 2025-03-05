import { Button, ButtonGroup, Input, Spacer, Tooltip } from "@heroui/react";
import { ArrowDownIcon, ArrowUpIcon, CursorArrowIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { memo, useEffect, useState } from "react";
import { toast } from "sonner";

import { useAppTree } from "@/hooks/useAppTree";
import { useConfig } from "@/hooks/useConfig";
import { useNodeName } from "@/hooks/useNodeName";
import { useSelectNode } from "@/hooks/useSelectNode";

import type { PlainNode } from "@my-react-devtool/core";
import type { FormEvent } from "react";
import type { VirtuosoHandle } from "react-virtuoso";

const { setSelect } = useSelectNode.getActions();

const { toggleHoverOnBrowser } = useConfig.getActions();

export const TreeViewSearch = memo(({ handle }: { handle?: VirtuosoHandle }) => {
  const [v, setV] = useState("");

  const list = useAppTree((s) => s.list);

  const [index, setIndex] = useState(0);

  const [indexArray, setIndexArray] = useState<number[]>([]);

  const [nodeList, setNodeList] = useState<(PlainNode & { _name: string })[]>([]);

  const map = useNodeName((s) => s.map);

  const enableHoverOnBrowser = useConfig.useShallowStableSelector((s) => s.state.enableHoverOnBrowser);

  const itemIndex = indexArray[index];

  const id = nodeList[itemIndex]?.i;

  const onSearch = (e?: FormEvent) => {
    e?.preventDefault?.();

    if (v) {
      setIndex(0);

      const _list = list.map((i) => ({ ...i, _name: map[i.n] }));

      const _indexArray = _list.map((i, index) => (i._name.includes(v) ? index : -1)).filter((i) => i !== -1);

      setNodeList(_list as (PlainNode & { _name: string })[]);

      setIndexArray(_indexArray);

      if (_indexArray.length === 0) {
        toast.error(`Can't find current name`, { position: "top-right" });
      } else {
        toast.success(`Find ${_indexArray.length} items`, { position: "top-right" });
      }
    }
  };

  useEffect(() => {
    setIndex(0);
    setIndexArray([]);
  }, [v]);

  useEffect(() => {
    if (itemIndex !== undefined) {
      handle?.scrollToIndex({ index: itemIndex });

      setSelect(id, true);
    }
  }, [itemIndex, handle, id]);

  return (
    <>
      <Tooltip content="hover on the browser" showArrow color="foreground">
        <Button isIconOnly variant="flat" onPress={toggleHoverOnBrowser}>
          <CursorArrowIcon height="14" className={enableHoverOnBrowser ? "text-green-400" : "text-gray-400"} />
        </Button>
      </Tooltip>
      <Spacer x={2} />
      <form onSubmit={onSearch}>
        <Input
          placeholder="Search component"
          className="w-full"
          value={v}
          variant="flat"
          onChange={(e) => setV(e.target.value)}
          endContent={
            <button className="focus:outline-none" type="submit">
              <MagnifyingGlassIcon className="text-black/50 dark:text-white/90 text-slate-400 flex-shrink-0" />
            </button>
          }
        />
      </form>

      {indexArray.length > 1 && (
        <>
          <Spacer x={2} />
          <ButtonGroup variant="flat">
            <Tooltip content={`Total ${indexArray.length}, current ${index + 1}`} showArrow color="foreground">
              <Button isIconOnly onPress={() => setIndex((i) => (i - 1 + indexArray.length) % indexArray.length)} isDisabled={index === 0}>
                <ArrowUpIcon />
              </Button>
            </Tooltip>
            <Tooltip content={`Total ${indexArray.length}, current ${index + 1}`} showArrow color="foreground">
              <Button isIconOnly onPress={() => setIndex((i) => (i + 1) % indexArray.length)} isDisabled={index === indexArray.length - 1}>
                <ArrowDownIcon />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </>
      )}
    </>
  );
});

TreeViewSearch.displayName = "TreeViewSearch";

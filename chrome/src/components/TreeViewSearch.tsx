import { addToast, Button, ButtonGroup, Input, Spacer, Tooltip } from "@heroui/react";
import { ChevronDown, ChevronUp, MousePointer, Search } from "lucide-react";
import { memo, useEffect, useState } from "react";

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
        addToast({ severity: "danger", description: `Can't find current name`, title: "error", color: "danger" });
      } else {
        addToast({ severity: "success", description: `Find ${_indexArray.length} items`, title: "success", color: "success" });
      }
    }
  };

  useEffect(() => {
    setIndex(0);
    setIndexArray([]);
  }, [v]);

  useEffect(() => {
    if (itemIndex !== undefined) {
      setSelect(id, true);
      
      handle?.scrollToIndex({ index: itemIndex, align: "center" });
    }
  }, [itemIndex, handle, id]);

  return (
    <>
      <Tooltip content="hover on the browser" showArrow color="foreground">
        <Button isIconOnly variant="flat" onPress={toggleHoverOnBrowser}>
          <MousePointer className={enableHoverOnBrowser ? "text-green-400 h-[1.2em]" : "text-gray-400 h-[1.2em]"} />
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
              <Search className="text-black/50 h-[1em] dark:text-white/90 text-slate-400 flex-shrink-0" />
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
                <ChevronUp className="w-[1.2em]" />
              </Button>
            </Tooltip>
            <Tooltip content={`Total ${indexArray.length}, current ${index + 1}`} showArrow color="foreground">
              <Button isIconOnly onPress={() => setIndex((i) => (i + 1) % indexArray.length)} isDisabled={index === indexArray.length - 1}>
                <ChevronDown className="w-[1.2em]" />
              </Button>
            </Tooltip>
          </ButtonGroup>
        </>
      )}
    </>
  );
});

TreeViewSearch.displayName = "TreeViewSearch";

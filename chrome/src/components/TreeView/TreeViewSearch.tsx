import { addToast, Button, ButtonGroup, Input, Spacer, Tooltip } from "@heroui/react";
import { ChevronDown, ChevronUp, MousePointer, Search } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";

import { getTreeIndexOfElement, getVisibleNodeList } from "@/hooks/useAppTree";
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

  const [index, setIndex] = useState(0);

  const [matchedNodes, setMatchedNodes] = useState<PlainNode[]>([]);

  const map = useNodeName((s) => s.map);

  const enableHoverOnBrowser = useConfig.useShallowStableSelector((s) => s.state.enableHoverOnBrowser);

  const currentNode = matchedNodes[index];

  const mapRef = useRef(map);
  mapRef.current = map;

  const onSearch = (e?: FormEvent) => {
    e?.preventDefault?.();

    if (v) {
      setIndex(0);

      const list = getVisibleNodeList();
      const currentMap = mapRef.current;
      const matched = list.filter((node) => {
        const name = currentMap[node.n];
        return name && name.includes(v);
      });

      setMatchedNodes(matched);

      if (matched.length === 0) {
        addToast({ severity: "danger", description: `Can't find current name`, title: "error", color: "danger" });
      } else {
        addToast({ severity: "success", description: `Find ${matched.length} items`, title: "success", color: "success" });
      }
    }
  };

  useEffect(() => {
    setIndex(0);
    setMatchedNodes([]);
  }, [v]);

  useEffect(() => {
    if (currentNode) {
      setSelect(currentNode.i, true);

      const treeIndex = getTreeIndexOfElement(currentNode.i);
      if (treeIndex !== -1) {
        handle?.scrollToIndex({ index: treeIndex, align: "center" });
      }
    }
  }, [currentNode, handle]);

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

      {matchedNodes.length > 1 && (
        <>
          <Spacer x={2} />
          <ButtonGroup variant="flat">
            <Tooltip content={`Total ${matchedNodes.length}, current ${index + 1}`} showArrow color="foreground">
              <Button isIconOnly onPress={() => setIndex((i) => (i - 1 + matchedNodes.length) % matchedNodes.length)} isDisabled={index === 0}>
                <ChevronUp className="w-[1.2em]" />
              </Button>
            </Tooltip>
            <Tooltip content={`Total ${matchedNodes.length}, current ${index + 1}`} showArrow color="foreground">
              <Button isIconOnly onPress={() => setIndex((i) => (i + 1) % matchedNodes.length)} isDisabled={index === matchedNodes.length - 1}>
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

import { Button, ButtonGroup, Input, Spacer, Tooltip } from "@nextui-org/react";
import { ArrowDownIcon, ArrowUpIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { memo, useEffect, useState } from "react";
import { toast } from "sonner";

import { useAppTree } from "@/hooks/useAppTree";
import { useNodeName } from "@/hooks/useNodeName";
import { useTreeNode } from "@/hooks/useTreeNode";

import type { PlainNode } from "@my-react-devtool/core";
import type { FormEvent } from "react";
import type { VirtuosoHandle } from "react-virtuoso";

const { setSelect } = useTreeNode.getActions();

export const TreeViewSearch = memo(({ handle }: { handle?: VirtuosoHandle }) => {
  const [v, setV] = useState("");

  const list = useAppTree((s) => s.list);

  const [index, setIndex] = useState(0);

  const [indexArray, setIndexArray] = useState<number[]>([]);

  const [nodeList, setNodeList] = useState<(PlainNode & { _name: string })[]>([]);

  const map = useNodeName((s) => s.map);

  const itemIndex = indexArray[index];

  const id = nodeList[itemIndex]?.i;

  const onSearch = (e?: FormEvent) => {
    e?.preventDefault();

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
      <form onSubmit={onSearch}>
        <Input
          placeholder="Search component"
          className="w-full"
          value={v}
          variant="flat"
          onChange={(e) => setV(e.target.value)}
          endContent={
            <Button isIconOnly variant="light" onClick={onSearch}>
              <MagnifyingGlassIcon className="text-black/50 dark:text-white/90 text-slate-400 flex-shrink-0" />
            </Button>
          }
        />
      </form>

      {indexArray.length > 1 && (
        <>
          <Spacer x={2} />
          <ButtonGroup variant="flat">
            <Tooltip content={`Total ${indexArray.length}, current ${index + 1}`} showArrow color="foreground">
              <Button isIconOnly onClick={() => setIndex((i) => (i - 1 + indexArray.length) % indexArray.length)} isDisabled={index === 0}>
                <ArrowUpIcon />
              </Button>
            </Tooltip>
            <Tooltip content={`Total ${indexArray.length}, current ${index + 1}`} showArrow color="foreground">
              <Button isIconOnly onClick={() => setIndex((i) => (i + 1) % indexArray.length)} isDisabled={index === indexArray.length - 1}>
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

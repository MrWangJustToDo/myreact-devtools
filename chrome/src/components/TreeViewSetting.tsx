import { getTypeName, typeKeys } from "@my-react-devtool/core";
import {
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  ButtonGroup,
  Tooltip,
  Spacer,
  Checkbox,
} from "@nextui-org/react";
import { CheckCircledIcon, CrossCircledIcon, GearIcon } from "@radix-ui/react-icons";
import { memo } from "react";

import { useConfig } from "@/hooks/useConfig";
import { useConnect } from "@/hooks/useConnect";
import { useFilterNode } from "@/hooks/useFilterNode";

import { TreeViewSearch } from "./TreeViewSearch";

import type { ChangeEvent } from "react";
import type { VirtuosoHandle } from "react-virtuoso";

const onChange = useFilterNode.getActions().onChange;

export const TreeViewSetting = memo(({ handle }: { handle?: VirtuosoHandle }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { state: configState, setEnableHover, setEnableUpdate } = useConfig();

  const { state, cb } = useConnect((s) => ({ state: s.state, cb: s.cb }));

  const values = useFilterNode((s) => s.filter);

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(new Set(e.target.value.split(",")));
  };

  return (
    <>
      <div className="fixed top-3 right-3 z-10 flex">
        <TreeViewSearch handle={handle} />
        <Spacer x={2} />
        <ButtonGroup variant="flat">
          <Tooltip content={<p className={state ? "text-green-400" : "text-red-400"}>{state ? "DevTool Connect" : "DevTool DisConnect"}</p>} showArrow>
            <Button isIconOnly onClick={() => cb?.()} disabled={state}>
              {state ? <CheckCircledIcon className="text-green-500" /> : <CrossCircledIcon className=" text-red-500" />}
            </Button>
          </Tooltip>
          <Tooltip content="Setting" showArrow>
            <Button isIconOnly onClick={onOpen}>
              <GearIcon className=" text-gray-500" />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} isDismissable={false} placement="top">
        <ModalContent className=" text-[16px]">
          <ModalHeader>
            <p className="text-[18px]">Setting</p>
          </ModalHeader>
          <ModalBody>
            <div className="flex items-center">
              <Select
                label={<p className=" whitespace-nowrap text-[14px]">Filter Node: </p>}
                selectionMode="multiple"
                placeholder="Select a Type"
                selectedKeys={values}
                className="flex items-center"
                radius="sm"
                variant="bordered"
                size="lg"
                onChange={handleSelectionChange}
              >
                {typeKeys.map((type) => (
                  <SelectItem key={type} value={type}>
                    {getTypeName(type)}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="mt-2">
              <Checkbox isSelected={configState.enableUpdate} onValueChange={setEnableUpdate} color="primary">
                Highlight Update
              </Checkbox>
            </div>
            <div className="mt-2">
              <Checkbox isSelected={configState.enableHover} onValueChange={setEnableHover} color="secondary">
                Hover Overlay
              </Checkbox>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="bordered">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

TreeViewSetting.displayName = "TreeViewSetting";

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
  RadioGroup,
  Radio,
  Divider,
} from "@nextui-org/react";
import { CheckCircledIcon, CrossCircledIcon, GearIcon } from "@radix-ui/react-icons";
import { memo } from "react";

import { useConfig } from "@/hooks/useConfig";
import { useConnect } from "@/hooks/useConnect";
import { useFilterNode } from "@/hooks/useFilterNode";
import { UISize, useUISize } from "@/hooks/useUISize";

import { TreeViewSearch } from "./TreeViewSearch";

import type { ChangeEvent } from "react";
import type { VirtuosoHandle } from "react-virtuoso";

const onChange = useFilterNode.getActions().onChange;

export const TreeViewSetting = memo(({ handle }: { handle?: VirtuosoHandle }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { state: configState, setEnableHover, setEnableUpdate, setEnableRuntimeCount, setEnableRuntimeMis } = useConfig();

  const { state: size, setUISize } = useUISize();

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

      <Modal isOpen={isOpen} size="xl" onClose={onClose} onOpenChange={onOpenChange} isDismissable={false} placement="top">
        <ModalContent className=" text-[16px]">
          <ModalHeader>
            <p className="text-[18px]">Setting</p>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <p className="whitespace-nowrap text-[14px] text-foreground-500">Filter Node: </p>
                <div className="flex items-center">
                  <Select
                    selectionMode="multiple"
                    placeholder="Select a Type"
                    selectedKeys={values}
                    aria-label="Filter Node"
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
              </div>
              <Divider />
              <div className="flex flex-col gap-y-2">
                <p className="whitespace-nowrap text-[14px] text-foreground-500">UI Size: </p>
                <RadioGroup value={size} onValueChange={(l) => setUISize(l as UISize)} orientation="horizontal">
                  <Radio value={UISize.sm}>Small Size</Radio>
                  <Radio value={UISize.md}>Medium Size</Radio>
                  <Radio value={UISize.lg}>Large Size</Radio>
                </RadioGroup>
              </div>
              <Divider />
              <div className="flex flex-col gap-y-2">
                <Checkbox isSelected={configState.enableUpdate} onValueChange={setEnableUpdate} color="primary">
                  Enable Highlight Update
                </Checkbox>
                <Checkbox isSelected={configState.enableHover} onValueChange={setEnableHover} color="secondary">
                  Enable Hover Overlay
                </Checkbox>
                <Checkbox isSelected={configState.enableRuntimeCount} onValueChange={setEnableRuntimeCount} color="success">
                  Enable RuntimeCount (DevMode only)
                </Checkbox>
                <Checkbox
                  isSelected={configState.enableRuntimeMis}
                  isDisabled={!configState.enableRuntimeCount}
                  onValueChange={setEnableRuntimeMis}
                  color="warning"
                >
                  Enable RuntimeMis (DevMode only)
                </Checkbox>
              </div>
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

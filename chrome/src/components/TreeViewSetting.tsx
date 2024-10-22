import { color, getTypeName, typeKeys } from "@my-react-devtool/core";
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
  Chip,
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
        <ModalContent>
          <ModalHeader>
            <h3 className="text-[1em]">
              Setting <small>@my-react</small>
            </h3>
          </ModalHeader>
          <ModalBody className="text-[14px]">
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
                <RadioGroup value={size} onValueChange={(l) => setUISize(l as UISize)} orientation="horizontal" classNames={{ wrapper: "gap-x-6" }}>
                  <Radio value={UISize.sm}>Small Size</Radio>
                  <Radio value={UISize.md}>Medium Size</Radio>
                  <Radio value={UISize.lg}>Large Size</Radio>
                </RadioGroup>
              </div>
              <Divider />
              <div className="flex flex-col gap-y-2">
                <Checkbox isSelected={configState.enableUpdate} onValueChange={setEnableUpdate} color="primary">
                  <div className="flex">
                    Highlight Update
                    <div className="ml-4 gap-x-2 flex">
                      <Chip style={{ backgroundColor: color.update, mixBlendMode: "difference" }}>update</Chip>
                      <Chip style={{ backgroundColor: color.append, mixBlendMode: "difference" }}>append</Chip>
                      <Chip style={{ backgroundColor: color.setRef, mixBlendMode: "difference" }}>setRef</Chip>
                      <Chip style={{ backgroundColor: color.warn, mixBlendMode: "difference" }}>warn</Chip>
                    </div>
                  </div>
                </Checkbox>
                <Checkbox isSelected={configState.enableHover} onValueChange={setEnableHover} color="secondary">
                  Hover Overlay
                </Checkbox>
                <Checkbox isSelected={configState.enableRuntimeCount} onValueChange={setEnableRuntimeCount} color="success">
                  RuntimeCount (DevMode only)
                </Checkbox>
                <Checkbox
                  isSelected={configState.enableRuntimeMis}
                  isDisabled={!configState.enableRuntimeCount}
                  onValueChange={setEnableRuntimeMis}
                  color="warning"
                >
                  RuntimeMis (DevMode only)
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

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
  Code,
} from "@heroui/react";
import { getTypeName, typeKeys } from "@my-react-devtool/core";
import { CircleCheck, CircleX, LetterText, ListFilter, Moon, Settings, Settings2, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { memo } from "react";

import { useConfig } from "@/hooks/useConfig";
import { useConnect } from "@/hooks/useConnect";
import { useDetailNodeExt } from "@/hooks/useDetailNodeExt";
import { useFilterNode } from "@/hooks/useFilterNode";
import { UISize, useUISize } from "@/hooks/useUISize";

import { TreeViewSearch } from "./TreeViewSearch";

import type { ChangeEvent } from "react";
import type { VirtuosoHandle } from "react-virtuoso";

const onChange = useFilterNode.getActions().onChange;

const onToggle = useDetailNodeExt.getActions().toggleEnable;

export const TreeViewSetting = memo(({ handle }: { handle?: VirtuosoHandle }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { theme, setTheme } = useTheme();

  const { state: configState, setEnableHover, setEnableUpdate, toggleEnableRetrigger, setEnableEdit } = useConfig();

  const { state: size, setUISize } = useUISize();

  const enable = useDetailNodeExt((s) => s.enable);

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
            <Button isIconOnly onPress={() => cb?.()} disabled={state}>
              {state ? <CircleCheck className="text-green-500 w-[1.2em]" /> : <CircleX className=" text-red-500 w-[1.2em]" />}
            </Button>
          </Tooltip>
          <Button isIconOnly onPress={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Moon className="text-gray-500 w-[1.2em]" /> : <Sun className="text-orange-500 w-[1.2em]" />}
          </Button>
          <Tooltip content="Setting" showArrow color="foreground">
            <Button isIconOnly onPress={onOpen}>
              <Settings className={isOpen ? "text-green-500 w-[1.2em]" : "text-gray-500 w-[1.2em]"} />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>

      <Modal isOpen={isOpen} backdrop="blur" size="2xl" onClose={onClose} onOpenChange={onOpenChange} placement="top">
        <ModalContent>
          <ModalHeader>
            <h3 className="font-lg">
              Setting - <Code>@my-react/devtool</Code>
            </h3>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <p className="whitespace-nowrap flex items-center text-foreground-500">
                  <ListFilter className="w-[1.2em] mr-2" />
                  Filter Node:
                </p>
                <div className="flex items-center">
                  <Select
                    selectionMode="multiple"
                    placeholder="Select a Type"
                    variant="bordered"
                    selectedKeys={values}
                    aria-label="Filter Node"
                    className="flex items-center"
                    onChange={handleSelectionChange}
                  >
                    {typeKeys.map((type) => (
                      <SelectItem key={type}>{getTypeName(type)}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
              <Divider />
              <div className="flex flex-col gap-y-2">
                <p className="whitespace-nowrap flex items-center text-foreground-500">
                  <LetterText className="w-[1.2em] mr-2" />
                  UI Size:
                </p>
                <RadioGroup value={size} onValueChange={(l) => setUISize(l as UISize)} orientation="horizontal" classNames={{ wrapper: "gap-x-6" }}>
                  <Radio value={UISize.sm}>Small Size</Radio>
                  <Radio value={UISize.md}>Medium Size</Radio>
                  <Radio value={UISize.lg}>Large Size</Radio>
                </RadioGroup>
              </div>
              <Divider />
              <div className="flex flex-col gap-y-2">
                <p className="whitespace-nowrap flex items-center  text-foreground-500">
                  <Settings2 className="w-[1.2em] mr-2" />
                  Config:
                </p>
                <Checkbox isSelected={configState.enableUpdate} radius="full" onValueChange={setEnableUpdate} color="primary">
                  Highlight Update
                </Checkbox>
                <Checkbox isSelected={configState.enableHover} radius="full" onValueChange={setEnableHover} color="secondary">
                  Hover Overlay
                </Checkbox>
                <Checkbox isSelected={configState.enableRetrigger} radius="full" onValueChange={toggleEnableRetrigger} color="warning">
                  Retrigger Status
                </Checkbox>
                <Checkbox isSelected={enable} radius="full" onValueChange={onToggle} color="default">
                  Extend Node Detail
                </Checkbox>
                <Checkbox isSelected={configState.enableEdit} radius="full" onValueChange={setEnableEdit} color="success">
                  Edit Update
                </Checkbox>
              </div>
            </div>
            <Spacer y={4} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

TreeViewSetting.displayName = "TreeViewSetting";

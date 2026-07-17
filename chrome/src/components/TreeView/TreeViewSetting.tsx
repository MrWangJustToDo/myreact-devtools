import {
  Button,
  Chip,
  Input,
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
  Switch,
  Tab,
  Tabs,
  RadioGroup,
  Radio,
  Code,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { getTypeName, typeKeys } from "@my-react-devtool/core";
import {
  BoxIcon,
  CircleCheck,
  CircleX,
  Eraser,
  Eye,
  EyeOff,
  FilterIcon,
  Gauge,
  MonitorIcon,
  Moon,
  RefreshCw,
  Settings,
  ShieldMinusIcon,
  SlidersHorizontalIcon,
  Sun,
  Type,
} from "lucide-react";
import { useTheme } from "next-themes";
import { memo, useState } from "react";

import { useAppTree } from "@/hooks/useAppTree";
import { useAutoWidthTree } from "@/hooks/useAutoWidthTree";
import { useConfig } from "@/hooks/useConfig";
import { useConnect } from "@/hooks/useConnect";
import { useDetailMode } from "@/hooks/useDetailMode";
import { useDetailNodeExt } from "@/hooks/useDetailNodeExt";
import { useFilterNode } from "@/hooks/useFilterNode";
import { useHighlightNode } from "@/hooks/useHighlightNode";
import { useHMRNode } from "@/hooks/useHMRNode";
import { useTriggerNode } from "@/hooks/useTriggerNode";
import { UISize, useUISize } from "@/hooks/useUISize";

import { TreeViewSearch } from "./TreeViewSearch";

import type { ChangeEvent, KeyboardEvent } from "react";
import type { VirtuosoHandle } from "react-virtuoso";

export const TreeViewSetting = memo(({ handle }: { handle?: VirtuosoHandle }) => {
  const onChange = useFilterNode.getActions().onChange;

  const { addNameFilter, removeNameFilter } = useFilterNode.getActions();

  const setEnableExt = useDetailNodeExt.getActions().setEnable;

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { theme, setTheme } = useTheme();

  const { mode, setMode } = useDetailMode();

  const { clearHMR } = useHMRNode.getActions();

  const { clearTrigger } = useTriggerNode.getActions();

  const { clearMessage } = useHighlightNode.getActions();

  const { forceRefresh } = useAppTree.getActions();

  const { setAutoWidth } = useAutoWidthTree.getActions();

  const autoWidth = useAutoWidthTree((s) => s.state);

  const { state: configState, setEnableHover, setEnableUpdate, setEnableRetrigger, setEnableEdit } = useConfig();

  const { state: size, setUISize } = useUISize();

  const enable = useDetailNodeExt((s) => s.enable);

  const { state, cb } = useConnect((s) => ({ state: s.state, cb: s.cb }));

  const values = useFilterNode((s) => s.filter);

  const nameFilters = useFilterNode((s) => s.nameFilters);

  const [nameInput, setNameInput] = useState("");

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(new Set(e.target.value.split(",")));
  };

  const handleNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && nameInput.trim()) {
      e.preventDefault();
      addNameFilter(nameInput);
      setNameInput("");
    }
    if (e.key === "Backspace" && !nameInput && nameFilters.size > 0) {
      const last = Array.from(nameFilters).pop();
      if (last) removeNameFilter(last);
    }
  };

  return (
    <>
      <div className="fixed top-3 right-3 z-10 flex">
        <TreeViewSearch handle={handle} />
        <Spacer x={2} />
        <ButtonGroup variant="flat">
          <Tooltip content="Refresh tree" showArrow color="foreground">
            <Button isIconOnly onPress={() => forceRefresh()}>
              <RefreshCw className="text-foreground-500 w-[1.2em]" />
            </Button>
          </Tooltip>
          <Tooltip content={<p className={state ? "text-green-400" : "text-red-400"}>{state ? "DevTool Connect" : "DevTool DisConnect"}</p>} showArrow>
            <Button isIconOnly onPress={() => cb?.()} disabled={state}>
              {state ? <CircleCheck className="text-green-500 w-[1.2em]" /> : <CircleX className="text-red-500 w-[1.2em]" />}
            </Button>
          </Tooltip>
          <Button isIconOnly onPress={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Moon className="text-foreground-500 w-[1.2em]" /> : <Sun className="text-warning-500 w-[1.2em]" />}
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly>
                <BoxIcon className="text-primary-500 w-[1.2em]" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Change mode"
              selectionMode="single"
              selectedKeys={new Set([mode])}
              onSelectionChange={(l) => setMode(Array.from(l)?.[0] as typeof mode)}
            >
              <DropdownItem key="node" startContent={<Type className="w-[1em]" />}>
                Detail mode
              </DropdownItem>
              <DropdownItem key="flameGraph" startContent={<Gauge className="w-[1em]" />}>
                Graph mode
              </DropdownItem>
              <DropdownItem key="global" startContent={<Eye className="w-[1em]" />}>
                Global mode
              </DropdownItem>
              <DropdownItem key="console" startContent={<EyeOff className="w-[1em]" />}>
                Console mode
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Tooltip content="Setting" showArrow color="foreground">
            <Button isIconOnly onPress={onOpen}>
              <Settings className={isOpen ? "text-success-500 w-[1.2em]" : "text-foreground-500 w-[1.2em]"} />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </div>

      <Modal isOpen={isOpen} backdrop="blur" size="xl" onClose={onClose} onOpenChange={onOpenChange} placement="top">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 pb-0">
            <div className="flex items-center gap-2">
              <Settings className="w-[1.1em] text-foreground-500" />
              <span className="text-medium font-semibold">Settings</span>
              <Code size="sm">@my-react/devtool</Code>
            </div>
          </ModalHeader>
          <ModalBody className="pt-6">
            <Tabs aria-label="Settings">
              <Tab
                key="filter"
                title={
                  <div className="flex items-center gap-x-2">
                    <FilterIcon size="1.1em" />
                    <span className="text-[1.2em]">Filter</span>
                  </div>
                }
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-foreground-500 tracking-wide uppercase">By Type</p>
                    <Select
                      selectionMode="multiple"
                      placeholder="Select a Type"
                      variant="bordered"
                      selectedKeys={values}
                      aria-label="Filter Node"
                      size="sm"
                      onChange={handleSelectionChange}
                    >
                      {typeKeys.map((type) => (
                        <SelectItem key={type}>{getTypeName(type)}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-foreground-500 tracking-wide uppercase">By Name</p>
                    <div className="flex flex-wrap items-center gap-1 p-2 min-h-10 rounded-lg border-2 border-default-200 focus-within:border-default-400 transition-colors">
                      {Array.from(nameFilters).map((name) => (
                        <Chip key={name} size="sm" variant="flat" color="danger" onClose={() => removeNameFilter(name)}>
                          {name}
                        </Chip>
                      ))}
                      <Input
                        className="flex-1 min-w-[120px]"
                        classNames={{
                          inputWrapper: "!bg-transparent shadow-none !p-0 min-h-0 h-auto",
                          innerWrapper: "h-auto",
                          input: "text-sm placeholder:text-foreground-400",
                        }}
                        placeholder={nameFilters.size === 0 ? "Type name and press Enter to hide" : ""}
                        value={nameInput}
                        variant="flat"
                        onChange={(e) => setNameInput(e.target.value)}
                        onKeyDown={handleNameKeyDown}
                      />
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab
                key="display"
                title={
                  <div className="flex items-center gap-x-2">
                    <MonitorIcon size="1.1em" />
                    <span className="text-[1.2em]">Display</span>
                  </div>
                }
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-foreground-500 tracking-wide uppercase">UI Size</p>
                    <RadioGroup value={size} onValueChange={(l) => setUISize(l as UISize)} orientation="horizontal" classNames={{ wrapper: "gap-x-6" }}>
                      <Radio value={UISize.sm}>Small</Radio>
                      <Radio value={UISize.md}>Medium</Radio>
                      <Radio value={UISize.lg}>Large</Radio>
                    </RadioGroup>
                  </div>
                </div>
              </Tab>
              <Tab
                key="features"
                title={
                  <div className="flex items-center gap-x-2">
                    <SlidersHorizontalIcon size="1.1em" />
                    <span className="text-[1.2em]">Features</span>
                  </div>
                }
              >
                <div className="flex flex-col gap-3">
                  <div
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 transition-colors -mx-2"
                    onClick={() => setEnableUpdate(!configState.enableUpdate)}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Highlight Update</span>
                      <span className="text-xs text-foreground-400">Flash updated components</span>
                    </div>
                    <Switch size="sm" isSelected={configState.enableUpdate} onValueChange={() => setEnableUpdate(!configState.enableUpdate)} />
                  </div>
                  <div
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 transition-colors -mx-2"
                    onClick={() => setEnableHover(!configState.enableHover)}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Hover Overlay</span>
                      <span className="text-xs text-foreground-400">Highlight on hover</span>
                    </div>
                    <Switch size="sm" isSelected={configState.enableHover} onValueChange={() => setEnableHover(!configState.enableHover)} />
                  </div>
                  <div
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 transition-colors -mx-2"
                    onClick={() => setEnableRetrigger(!configState.enableRetrigger)}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Retrigger Status</span>
                      <span className="text-xs text-foreground-400">Show retrigger indicators</span>
                    </div>
                    <Switch size="sm" isSelected={configState.enableRetrigger} onValueChange={() => setEnableRetrigger(!configState.enableRetrigger)} />
                  </div>
                  <div
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 transition-colors -mx-2"
                    onClick={() => setEnableExt(!enable)}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Extend Node Detail</span>
                      <span className="text-xs text-foreground-400">Show extended node info</span>
                    </div>
                    <Switch size="sm" isSelected={enable} onValueChange={() => setEnableExt(!enable)} />
                  </div>
                  <div
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 transition-colors -mx-2"
                    onClick={() => setEnableEdit(!configState.enableEdit)}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Edit Update</span>
                      <span className="text-xs text-foreground-400">Allow value editing</span>
                    </div>
                    <Switch size="sm" isSelected={configState.enableEdit} onValueChange={() => setEnableEdit(!configState.enableEdit)} />
                  </div>
                  <div
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-default-100 dark:hover:bg-default-50 transition-colors -mx-2"
                    onClick={() => setAutoWidth(!autoWidth)}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Auto Width</span>
                      <span className="text-xs text-foreground-400">Auto adjust tree width</span>
                    </div>
                    <Switch size="sm" isSelected={autoWidth} onValueChange={() => setAutoWidth(!autoWidth)} />
                  </div>
                </div>
              </Tab>
              <Tab
                key="actions"
                title={
                  <div className="flex items-center gap-x-2">
                    <ShieldMinusIcon size="1.1em" />
                    <span className="text-[1.2em]">Actions</span>
                  </div>
                }
              >
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold text-foreground-500 tracking-wide uppercase">Clear Data</p>
                  <Button size="sm" color="default" variant="flat" startContent={<Eraser className="w-[0.9em]" />} onPress={clearHMR}>
                    Clear All HMR
                  </Button>
                  <Button size="sm" color="default" variant="flat" startContent={<Eraser className="w-[0.9em]" />} onPress={clearTrigger}>
                    Clear All Trigger
                  </Button>
                  <Button size="sm" color="default" variant="flat" startContent={<Eraser className="w-[0.9em]" />} onPress={clearMessage}>
                    Clear All Message
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

TreeViewSetting.displayName = "TreeViewSetting";

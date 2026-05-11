import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

import { useConsole } from "@/hooks/useConsole";

import { ValueView } from "../ValueView";

import type { ConsoleEntry } from "@/hooks/useConsole";

const typeColorMap: Record<string, string> = {
  log: "text-foreground",
  info: "text-blue-400",
  warn: "text-yellow-400",
  error: "text-red-400",
  debug: "text-gray-400",
};

const typeBgMap: Record<string, string> = {
  warn: "bg-yellow-500/10",
  error: "bg-red-500/10",
};

const ConsoleEntry = ({ entry, index }: { entry: ConsoleEntry; index: number }) => {
  const color = typeColorMap[entry.type] || "text-foreground";
  const bg = typeBgMap[entry.type] || "";

  return (
    <div className={`console-entry border-b border-divider px-2 py-1 ${bg}`}>
      <div className="flex items-start gap-2">
        <span className={`${color} font-code text-xs shrink-0 w-12 pt-0.5`}>[{entry.type}]</span>
        <div className="flex-1 min-w-0 font-code text-sm">
          {entry.args.map((arg, argIndex) => (
            <ValueView key={`${index}-${argIndex}`} name={String(argIndex)} item={arg} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ConsoleView = () => {
  const entries = useConsole((s) => s.entries);

  const bottomRef = useRef<HTMLDivElement>(null);

  const { clear } = useConsole.getActions();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries.length]);

  return (
    <div className="console-view h-full flex flex-col">
      <div className="flex items-center justify-between px-2 py-1 border-b border-divider shrink-0">
        <span className="font-code text-sm text-foreground-500">Console ({entries.length})</span>
        <Button isIconOnly size="sm" variant="light" onPress={clear} title="Clear console">
          <Trash2 className="w-[1em] text-foreground-500" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        {entries.length === 0 ? (
          <div className="flex items-center justify-center h-full text-foreground-400 font-code text-sm">No console output</div>
        ) : (
          entries.map((entry, index) => <ConsoleEntry key={index} entry={entry} index={index} />)
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

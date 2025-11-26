import ErrorStackParser from "error-stack-parser";

import { getNode } from "../data";
import { getPlainNodeByFiber } from "../tree";

import type { DevToolRenderDispatch } from "../setup";
import type { MyReactElement } from "@my-react/react";
import type { MyReactFiberNode, MyReactFiberNodeDev } from "@my-react/react-reconciler";

export const getSource = (fiber: MyReactFiberNodeDev): { type: "stack" | "source"; value: string } => {
  if (fiber._debugElement) {
    const element = fiber._debugElement as MyReactElement;
    try {
      if (element._debugStack) {
        const stack = ErrorStackParser.parse(element._debugStack);
        const currentStack = stack[1];
        return {
          type: "stack",
          value: currentStack.fileName + ":" + currentStack.lineNumber + ":" + currentStack.columnNumber,
        };
      }
      throw new Error("No stack");
    } catch {
      if (element._source && typeof element._source === "object") {
        return {
          type: "source",
          value: element._source?.fileName + ":" + element._source?.lineNumber + ":" + element._source?.columnNumber,
        };
      }
    }
  }
  return null;
};

export const getTree = (fiber: MyReactFiberNodeDev) => {
  const tree: string[] = [];

  let current = fiber;

  let parent = current?.parent;

  while (parent) {
    const plain = getPlainNodeByFiber(parent);

    const id = plain.i;

    tree.push(id);

    current = parent as MyReactFiberNodeDev;

    parent = parent.parent;
  }

  if (current) {
    const typedCurrent = current as MyReactFiberNode & { renderDispatch?: DevToolRenderDispatch };

    const dispatch = typedCurrent.renderDispatch;

    if (dispatch && dispatch.renderMode) {
      const packageName = dispatch?.renderPackage || "@my-react";
      tree.push(`$$ ${packageName} ${dispatch.renderMode}`);
    }

    if (dispatch && dispatch.version) {
      if (dispatch.dispatcher) {
        tree.push(`$$ @my-react ${dispatch.version}`);
      } else {
        tree.push(`$$ @my-react legacy ${dispatch.version}`);
      }
    } else {
      tree.push(`$$ @my-react legacy`);
    }
  }

  return tree;
};

export const getProps = (fiber: MyReactFiberNodeDev) => {
  return getNode(fiber.pendingProps);
};

export const getState = (fiber: MyReactFiberNodeDev) => {
  return getNode(fiber.pendingState);
};

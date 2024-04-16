import {
  getElementName,
} from "@my-react/react-reconciler";

import type {
  MyReactFiberNode,
  MyReactFiberNodeDev} from "@my-react/react-reconciler";

export const getFiberName = (fiber: MyReactFiberNodeDev | MyReactFiberNode) => {
  const elementName = getElementName(fiber);

  return elementName.substring(1, elementName.length - 2);
};

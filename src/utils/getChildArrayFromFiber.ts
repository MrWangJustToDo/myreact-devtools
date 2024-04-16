import type { MyReactFiberNode } from "@my-react/react-reconciler";

const set = new Set();

export const getChildArrayFromFiber = (fiber: MyReactFiberNode) => {
  if (set.has(fiber)) {
    console.log("circular reference", fiber);
    return [];
  }
  set.add(fiber);
  const re: MyReactFiberNode[] = [];
  const child = fiber.child;
  console.log(fiber);
  if (child) {
    re.push(child);
    let sibling = child.sibling;
    while (sibling) {
      re.push(sibling);
      sibling = sibling.sibling;
    }
  }
  return re;
};

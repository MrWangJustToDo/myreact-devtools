import { RenderFiber } from "@my-react/react";

export const getFiberName = (fiber: RenderFiber) => {
  return fiber.elementType?.name || fiber.elementType;
}
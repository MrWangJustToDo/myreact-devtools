import { createState } from "reactivity-store";

export enum UISize {
  sm = "sm",
  md = "md",
  lg = "lg",
}

export const useUISize = createState(() => ({ state: "sm" as UISize }), {
  withActions: (s) => ({
    setUISize: (size: UISize) => (s.state = size),
  }),
  withDeepSelector: false,
});

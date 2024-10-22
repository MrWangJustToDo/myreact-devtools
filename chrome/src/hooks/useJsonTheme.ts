import { useTheme } from "next-themes";
import { useMemo } from "react";
import { getBase16Theme } from "react-base16-styling";

export const useJsonTheme = () => {
  const { theme } = useTheme();

  return useMemo(() => (theme === "dark" ? getBase16Theme("google")! : getBase16Theme("google:inverted")!), [theme]);
};

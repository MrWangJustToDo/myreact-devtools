import { Button, ButtonGroup } from "@heroui/react";

import { useFlameGraphViewMode } from "@/hooks/useFlameGraphViewMode";

export const FlameGraphViewModeSwitch = () => {
  const mode = useFlameGraphViewMode((s) => s.mode);
  const { setMode } = useFlameGraphViewMode.getActions();

  return (
    <ButtonGroup size="sm">
      <Button variant={mode === "v1" ? "solid" : "flat"} onPress={() => setMode("v1")}>
        V1
      </Button>
      <Button variant={mode === "v2" ? "solid" : "flat"} onPress={() => setMode("v2")}>
        V2
      </Button>
    </ButtonGroup>
  );
};

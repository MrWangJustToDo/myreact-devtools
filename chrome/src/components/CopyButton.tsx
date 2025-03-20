import { Button, Tooltip } from "@heroui/react";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

import { useCopy } from "@/hooks/useCopy";

export const CopyButton = ({ code }: { code: string }) => {
  const [_, copy] = useCopy();

  const [t, setT] = useState(false);

  return (
    <Tooltip content="copy to clipboard" showArrow color="foreground">
      <Button
        isIconOnly
        size="sm"
        variant="bordered"
        isDisabled={t}
        onPress={async () => {
          copy(code);
          setT(true);
          setTimeout(() => setT(false), 1000);
        }}
      >
        {!t ? <Copy /> : <CopyCheck className="text-green-400" />}
      </Button>
    </Tooltip>
  );
};

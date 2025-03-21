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
        {!t ? <Copy className="h-[1.2em]" /> : <CopyCheck className="text-green-400 h-[1.2em]" />}
      </Button>
    </Tooltip>
  );
};

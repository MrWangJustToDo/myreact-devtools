import { Button, Tooltip } from "@nextui-org/react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
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
        {!t ? <CopyIcon /> : <CheckIcon className="text-green-400" />}
      </Button>
    </Tooltip>
  );
};

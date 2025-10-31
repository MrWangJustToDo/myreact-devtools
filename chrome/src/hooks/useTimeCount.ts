import { useDisclosure } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";

export const useTimeCount = () => {
  const [c, setC] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!isOpen) return;

    const id = setInterval(() => setC((v) => v + 1), 1000);

    return () => clearInterval(id);
  }, [isOpen]);

  const onStop = useCallback(() => {
    onClose();
    setC(0);
  }, [onClose]);

  return { count: c, onStart: onOpen, onStop };
};

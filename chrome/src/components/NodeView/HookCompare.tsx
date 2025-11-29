import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { memo } from "react";

import { useHookValue } from "@/hooks/useHookValue";

import { AutoHeightLayout } from "../AutoHeightLayout";
import { NodeValue } from "../NodeValue";

export const HookCompare = memo(() => {
  const { state, open, toggle } = useHookValue.useShallowSelector((s) => ({ state: s.state[s.index!], open: s.open, toggle: s.toggleOpen }));

  return (
    <Modal isOpen={open && !!state} onClose={toggle} size="3xl">
      <ModalContent>
        <ModalHeader>
          <div className="font-bold text-lg mb-2">Hook Value Change</div>
        </ModalHeader>
        <ModalBody>
          <AutoHeightLayout left={<NodeValue name="old" item={state?.old} />} right={<NodeValue name="new" item={state?.new} />} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

HookCompare.displayName = "HookCompare";

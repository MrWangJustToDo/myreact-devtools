import { Card, CardBody, Spinner } from "@nextui-org/react";

import { useDetailNode } from "@/hooks/useDetailNode";
import { useTreeNode } from "@/hooks/useTreeNode";

import { HookView } from "./HookView";
// import { HookView_v2 } from "./HookView_v2";
import { NameView } from "./NameView";
import { PropsView } from "./PropsView";
import { RenderView } from "./RenderView";
import { SourceView } from "./SourceView";
import { StateView } from "./StateView";

export const NodeView = () => {
  const select = useTreeNode((s) => s.select);

  const { nodeList, loading } = useDetailNode((s) => ({ nodeList: s.nodes, loading: s.loading }));

  const currentSelectDetail = nodeList.find((i) => i.id === select);

  const isLoading = !currentSelectDetail && loading;

  if (isLoading) {
    return (
      <div className="node-view h-full p-1">
        <Card shadow="sm" radius="md" className="h-full">
          <CardBody className="flex h-full items-center justify-center">
            <Spinner color="primary" />
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="node-view h-full px-1 py-0.5">
      <Card shadow="sm" radius="md" className="h-full">
        <CardBody className="h-full">
          <div className="group h-full overflow-auto">
            <NameView />
            <PropsView />
            <StateView />
            <HookView />
            {/* <HookView_v2 /> */}
            <RenderView />
            <SourceView />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

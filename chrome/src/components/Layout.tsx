import { Card, CardBody } from "@nextui-org/react";
import { Allotment } from "allotment";

import type { ReactNode } from "react";

export const Layout = ({ left, right }: { left: ReactNode; right: ReactNode }) => {
  return (
    <Card className="w-full" radius="sm">
      <CardBody className="w-full">
        <Allotment>
          {left}
          {right}
        </Allotment>
      </CardBody>
    </Card>
  );
};

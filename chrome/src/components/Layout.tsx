import { Card, CardBody } from "@heroui/react";
import { Allotment } from "allotment";

import { useIsMobile } from "@/hooks/useIsMobile";

import type { ReactNode } from "react";

export const Layout = ({ left, right }: { left: ReactNode; right: ReactNode }) => {
  const isMobile = useIsMobile();

  return (
    <Card className="w-full" radius="sm">
      <CardBody className="w-full p-0">
        <Allotment vertical={isMobile} key={isMobile ? "1" : "2"}>
          {left}
          {right}
        </Allotment>
      </CardBody>
    </Card>
  );
};

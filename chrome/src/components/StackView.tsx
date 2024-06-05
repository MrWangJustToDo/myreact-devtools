import { Children, Fragment } from "react";

import type { ReactNode } from "react";

export const StackView = ({ children, splitNode, className }: { children: ReactNode; splitNode?: ReactNode; className?: string }) => {
  const childrenArray = Children.toArray(children);

  return (
    <div className={className ? className + " stack-view" : "stack-view"}>
      {childrenArray.map((child, index: number) => (
        <Fragment key={index}>
          {child}
          {index !== childrenArray.length - 1 && splitNode && <div className="stack-divider">{splitNode}</div>}
        </Fragment>
      ))}
    </div>
  );
};

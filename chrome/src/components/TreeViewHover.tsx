import { useSelectNode } from "@/hooks/useSelectNode";

export const TreeViewHover = () => {
  const hover = useSelectNode((s) => s.hover);

  return (
    <style jsx global>{`
      [data-indent="${hover}"] {
        display: block;
      }
      [data-indent-next="${hover}"] {
        display: block;
      }
    `}</style>
  );
};

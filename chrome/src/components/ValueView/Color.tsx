export const Color = ({ value }: { value: string }) => {
  return <div className="w-2 h-2 rounded ml-1 inline-block" style={{ backgroundColor: value }} />;
};

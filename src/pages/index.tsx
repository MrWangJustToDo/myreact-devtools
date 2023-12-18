import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function Home() {
  const props = useTheme();
  props.setTheme("light");
  return (
    <main className="flex">
      <div className="w-[66.5%] border">123</div>
      <div className="w-[33.5%] border border-l-0">2</div>
    </main>
  );
}

import { CircleX } from "lucide-react";

export default function Page() {
  return (
    <main className="flex p-[10px] whitespace-nowrap text-[12px]">
      <div className="flex text-red-400 items-center justify-center">
        <span className="mr-1">
          <CircleX className="h-[1.2em]" />
        </span>
        <p className="text-red-400 text-nowrap">This website not build with @my-react</p>
      </div>
    </main>
  );
}

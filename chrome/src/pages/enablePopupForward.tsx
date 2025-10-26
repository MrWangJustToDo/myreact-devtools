import { CircleCheck } from "lucide-react";

export default function Page() {
  return (
    <main className="flex p-[10px] whitespace-nowrap text-[12px]">
      <div className="flex text-green-500 items-center justify-center">
        <span className="mr-1">
          <CircleCheck className="h-[1.2em]" />
        </span>
        <p className="text-green-500">This website has some extension build on @my-react</p>
      </div>
    </main>
  );
}

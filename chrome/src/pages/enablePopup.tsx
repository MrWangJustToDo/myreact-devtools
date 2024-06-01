import { CheckCircledIcon } from "@radix-ui/react-icons";

export default function Page() {
  return (
    <main className="flex p-[10px] whitespace-nowrap">
      <div className="flex text-green-400 items-center justify-center">
        <span className="mr-1">
          <CheckCircledIcon />
        </span>
        <p className="text-green-400">This website build with @my-react</p>
      </div>
    </main>
  );
}

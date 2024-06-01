import { CrossCircledIcon } from "@radix-ui/react-icons";

export default function Page() {
  return (
    <main className="flex p-[10px] whitespace-nowrap">
      <div className="flex text-red-400 items-center justify-center">
        <span className="mr-1">
          <CrossCircledIcon />
        </span>
        <p className="text-red-400 text-nowrap">This website not build with @my-react</p>
      </div>
    </main>
  );
}

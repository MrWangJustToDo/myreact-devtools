import { useHasBuildWithMyReact } from "@/hooks/useHasBuildWithMyReact";

export default function Page() {
  const hasBuild = useHasBuildWithMyReact((s) => s.state);

  return (
    <main className="flex p-[10px] whitespace-nowrap">
      <p className={hasBuild ? "text-green-400" : "text-red-400"}>
        {hasBuild
          ? "This website build with @my-react"
          : "This website not build with @my-react"}
      </p>
    </main>
  );
}

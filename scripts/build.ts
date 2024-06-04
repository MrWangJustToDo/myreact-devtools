import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { rollupBuild } from "project-tool/rollup";

const externalCorePackage = (id: string) => !id.includes("tslib") && id.includes("node_modules");

const copyFile = async (type: "hook" | "proxy" | "service-worker" | "panel" | "detector") => {
  const path = resolve(process.cwd(), `packages/bridge/dist/iife/${type}.development.js`);
  const dest = resolve(process.cwd(), `chrome/public/bundle/${type}.js`);
  const content = await readFile(path, "utf-8");
  await writeFile(dest, content, "utf-8");
};

const start = async () => {
  await rollupBuild({
    packageName: "core",
    packageScope: "packages",
    external: externalCorePackage,
  });
  await rollupBuild({
    packageName: "bridge",
    packageScope: "packages",
    external: () => false,
  });
  copyFile("hook");
  copyFile("detector");
  copyFile("proxy");
  copyFile("service-worker");
  copyFile("panel");
};

start();

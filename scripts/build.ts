import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { rollupBuild } from "project-tool/rollup";

const externalCorePackage = (id: string) => id.includes("node_modules") && !id.includes("tslib");

const copyFile = async (type: "hook" | "proxy" | "backend") => {
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
    external: externalCorePackage,
  });
  copyFile("hook");
  copyFile("proxy");
  copyFile("backend");
};

start();

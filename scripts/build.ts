import { mkdir, readFile, rm, writeFile } from "fs/promises";
import { resolve } from "path";
import { rollupBuild } from "project-tool/rollup";

const externalCorePackage = (id: string) => !id.includes("tslib") && id.includes("node_modules") && !id.includes("@my-react");

const cleanDir = async () => {
  const path = resolve(process.cwd(), `chrome/public/bundle`);

  try {
    await rm(path, { recursive: true });
  } catch {
    void 0;
  }
};

const createDir = async () => {
  const path = resolve(process.cwd(), `chrome/public/bundle`);

  try {
    await mkdir(path, { recursive: true });
  } catch {
    void 0;
  }
};

const copyFile = async (type: "hook" | "proxy" | "service-worker" | "panel" | "detector" | "forward-dev") => {
  const path = resolve(process.cwd(), `packages/bridge/dist/iife/${type}.production.js`);
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
  await cleanDir();
  await createDir();
  copyFile("hook");
  copyFile("detector");
  copyFile("proxy");
  copyFile("service-worker");
  copyFile("panel");
  copyFile("forward-dev");
};

start();

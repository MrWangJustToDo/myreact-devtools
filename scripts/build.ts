import { rollupBuild } from "project-tool/rollup";

const externalCorePackage = (id: string) =>
  id.includes("node_modules") && !id.includes("tslib");

const start = async () => {
  await rollupBuild({
    packageName: "core",
    packageScope: "packages",
    external: externalCorePackage,
  });
};

start();

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import eslintPluginImport from "eslint-plugin-import";
import baseLint from "project-tool/baseLint";

const chromeSourceFiles = ["chrome/src/**/*.{js,jsx,ts,tsx}"];
const chromeServerFiles = ["chrome/server.mjs"];
const rootIgnores = ["**/.next/**", "**/dist/**", "**/out/**", "**/scripts/**", "**/*.d.ts", "**/tailwind.config.*", "**/postcss.config.*", "chrome/public/**"];

const removeImportPlugin = (configs) =>
  configs.map((config) => {
    if (!config?.plugins?.import) {
      return config;
    }

    const { import: removedImport, ...plugins } = config.plugins;
    const nextConfig = { ...config, plugins };

    if (Object.keys(plugins).length === 0) {
      delete nextConfig.plugins;
    }

    return nextConfig;
  });

const baseLintWithoutImport = removeImportPlugin(baseLint);

const withFiles = (configs, files, ignores = []) =>
  configs.map((config) => {
    if (!config || typeof config !== "object") {
      return config;
    }

    const configIgnores = Array.isArray(config.ignores) ? [...config.ignores, ...ignores] : ignores.length ? [...ignores] : undefined;

    return {
      ...config,
      files,
      ...(configIgnores ? { ignores: configIgnores } : {}),
    };
  });

export default defineConfig([
  globalIgnores(rootIgnores),
  ...withFiles(nextVitals, chromeSourceFiles),
  {
    files: chromeSourceFiles,
    settings: {
      next: {
        rootDir: "chrome",
      },
    },
    // Next.js config runs at repo root; keep Chrome-specific rules here.
    // Add future Chrome-only lint tweaks in this block.
    rules: {
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  {
    files: chromeServerFiles,
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      import: eslintPluginImport,
    },
  },
  ...withFiles(baseLintWithoutImport, chromeSourceFiles),
  ...withFiles(baseLintWithoutImport, chromeServerFiles),
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    ignores: ["chrome/**"],
    plugins: {
      import: eslintPluginImport,
    },
  },
  ...withFiles(baseLintWithoutImport, ["**/*.{js,jsx,ts,tsx,mjs,cjs}"], ["chrome/**"]),
  {
    files: ["packages/**/*.{js,cjs}"],
    // Packages ship CommonJS; allow require() in those entry points.
    // Add additional CJS directories here if more packages are added.
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

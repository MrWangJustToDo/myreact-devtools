const withNext = require("@my-react/react-refresh-tools/withNext");

const isProd = process.env.NODE_ENV === "production";

const isLocal = process.env.NEXT_PUBLIC_MODE === "local";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd && isLocal ? "/myreact-devtools/" : undefined,
  basePath: isProd && isLocal ? "/myreact-devtools" : undefined,
  output: "export",
  reactCompiler: true,
};

module.exports = withNext(nextConfig, { turbopackKey: 'turbopack' });
// module.exports = nextConfig;

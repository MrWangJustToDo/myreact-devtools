const withNext = require("@my-react/react-refresh-tools/withNext");

const isProd = process.env.NODE_ENV === "production";

const isLocal = process.env.NODE_ENV === "local";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd && isLocal ? "/myreact-devtools/" : undefined,
  basePath: isProd && isLocal ? "/myreact-devtools" : undefined,
  output: "export",
};

module.exports = withNext(nextConfig);
// module.exports = nextConfig;

const withNext = require("@my-react/react-refresh-tools/withNext");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
};

module.exports = withNext(nextConfig);

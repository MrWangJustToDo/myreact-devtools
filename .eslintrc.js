module.exports = {
  root: true,
  extends: [require.resolve("project-tool/baseLint")],
  ignorePatterns: ["dist", "dev", "out", "scripts", "tailwind.config.cjs"],
};

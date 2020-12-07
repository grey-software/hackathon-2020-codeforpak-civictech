module.exports = {
  apps: [
    {
      script: "index.ts",
      watch: ".",
      ignore_watch : ["/node_modules", "/logs"],
    },
  ],
};

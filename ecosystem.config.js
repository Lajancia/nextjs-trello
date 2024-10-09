module.exports = {
  apps: [
    {
      name: "next-trello",
      script: "npm",
      args: "run serve",
      exec_mode: "fork",
      watch: false,
    },
  ],
};

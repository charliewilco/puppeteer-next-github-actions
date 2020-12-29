module.exports = {
  server: {
    command: "yarn start",
    port: 3000,
    debug: true,
  },
  launch: {
    headless: !!process.env.CI,
    slowMo: process.env.CI ? 0 : 150,
  },
};

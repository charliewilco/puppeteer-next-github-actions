# Puppeteer, Jest + Next.js Example

![E2E Testing](https://github.com/charliewilco/puppeteer-next-github-actions/workflows/E2E%20Testing/badge.svg)

This is a really simple project that shows the usage building an E2E test with [Jest](https://jestjs.io/) and [Puppeteer](https://pptr.dev/) while running your project with `next start`.

This was a reduced test case to see if GitHub Actions could run the E2E tests with the headless browswer; also uses TypeScript and MongoDB.

## Notes

This demo combines the Mongoose and TypeScript examples from Next.js to build out what we're testing.

- [TypeScript Example](https://github.com/vercel/next.js/tree/canary/examples/with-typescript)
- [Mongoose Example](https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose)

This demo isn't using any of the assertions from [`jest-puppeteer`](https://github.com/smooth-code/jest-puppeteer) but is using the preset and [`ts-jest`](https://github.com/kulshekhar/ts-jest) preset

```javascript
// jest.config.js
const merge = require("merge");
const ts = require("ts-jest/jest-preset");
const puppeteer = require("jest-puppeteer/jest-preset");

module.exports = merge.recursive(ts, puppeteer, {
  testTimeout: 10000,
  verbose: true,
  testRegex: "(/__tests__/.*|(\\.|/)(spec))\\.[jt]sx?$",
});
```

Tests are meant to be simple, doesn't focus on doing evaluation for assertion but to see if one of the operations catches and fails to continue.

```ts
it("should find link", async () => {
  await page.waitForSelector("[data-testid='ABOUT_LINK']");
  await page.click("[data-testid='ABOUT_LINK']");

  await page.waitForSelector("[data-testid='ABOUT_TITLE']");
});
```

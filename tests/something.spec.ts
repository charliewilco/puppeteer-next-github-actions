/// <reference types="@types/jest-environment-puppeteer" />

import "expect-puppeteer";

jest.setTimeout(30000);

describe("E2E", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000/");
  });

  beforeEach(async () => {
    await page.setViewport({ width: 1440, height: 766 });
  });
  it("should find link", async () => {
    await page.waitForSelector("[data-testid='ABOUT_LINK']");
    await page.click("[data-testid='ABOUT_LINK']");

    await page.waitForSelector("[data-testid='ABOUT_TITLE']");
  });
});

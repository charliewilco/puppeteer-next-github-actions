/// <reference types="@types/jest-environment-puppeteer" />

import { jest, it, describe, beforeAll, beforeEach } from "@jest/globals";

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

  it("should create a new item", async () => {
    await page.waitForSelector("[data-testid='NEW_LINK'");
    await page.click("[data-testid='NEW_LINK'");

    await page.waitForSelector("[data-testid='NEW_FORM']");

    await page.waitForSelector("input[name='name']");
    await page.type("input[name='name']", "Charlie");

    await page.evaluate(() => {
      const input = document.querySelector<HTMLInputElement>(
        "input[name='age']"
      );

      if (input) {
        input.value = "";
      }
    });
    await page.type("input[name='age']", "37");
    await page.type("input[name='city']", "Tacoma, WA");

    await page.click("button[type='submit']");

    await page.waitForSelector("[data-testid='LIST_HOME']");
    await page.waitForSelector("[data-testid='PERSON_CARD']");
  });
});

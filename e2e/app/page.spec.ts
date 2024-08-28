import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Datalog Viewer/);
});

test("has expected text", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const titleText = page.locator("h2");

  await expect(titleText).toHaveText("Welcome to the Datalog Viewer!");
});

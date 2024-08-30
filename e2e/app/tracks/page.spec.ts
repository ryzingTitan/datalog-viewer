import { expect, test } from "../../fixtures";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/tracks");

  await expect(page).toHaveTitle(/Datalog Viewer/);
});

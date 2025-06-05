import { expect, test } from "@playwright/test";

const UI_URL = "http://localhost:4000";

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);
  await expect(
    page.getByRole("heading", { name: "Find your next stay" })
  ).toBeVisible();

  await page.getByPlaceholder("Where are you going?").fill("sambalpur");
  await page.getByRole("button", { name: "Search Hotels" }).click();
  await expect(page).toHaveURL(/search/g);
  await expect(page.getByText("Hotels...")).toBeVisible();

  await page.selectOption("select", "Price per night (high to low)");
  await page.waitForTimeout(1000);

  await expect(
    page.getByRole("heading", { name: "Sunset Retreat" })
  ).toBeVisible();
});

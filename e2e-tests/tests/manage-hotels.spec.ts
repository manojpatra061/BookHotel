import { test, expect } from "@playwright/test";
import { link } from "fs";
import path from "path";

const UI_URL = "http://localhost:4000";

test.beforeEach("should login", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "login" }).click();
  await expect(
    page.getByRole("heading", { name: "Login to your account" })
  ).toBeVisible();
  await page.getByPlaceholder("Email*").fill("test@gmail.com");
  await page.getByPlaceholder("Password*").fill("password");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("login successful")).toBeVisible();
  await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
});

test("should create a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);
  await page.locator('[name="name"]').fill("test_name");
  await page.locator('[name="city"]').fill("test_city");
  await page.locator('[name="country"]').fill("test_country");
  await page.locator('[name="description"]').fill("test_description");
  await page.locator('[name="pricePerNight"]').fill("123");
  await page.locator('[name="starRating"]').selectOption({ value: "1" });
  await page.getByText("Budget").click();
  await page.getByLabel("Parking").check();
  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("2");
  await page
    .locator('input[name="images"]')
    .setInputFiles([
      path.join(__dirname, "files", "1.png"),
      path.join(__dirname, "files", "2.png"),
    ]);
  await page.getByRole("button", { name: "Create Hotel" }).click();
  await expect(page.getByText("hotel created")).toBeVisible();
});

test("should display all hotels", async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);
  await expect(page.getByRole("heading", { name: "My Hotels" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Hotel O Sunrise" })
  ).toBeVisible();
  await expect(
    page.getByText(
      "There are many variations of passages of Lorem Ipsum available"
    )
  ).toBeVisible();
  await expect(page.getByText("Ahmedabad, India").first()).toBeVisible();
  await expect(page.getByText("All Inclusive").first()).toBeVisible();
  await expect(page.getByText("999/night").first()).toBeVisible();
  await expect(page.getByText("2 adults, 2 children").nth(1)).toBeVisible();
  await expect(page.getByText("4 star rating").first()).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View Details" }).nth(1)
  ).toBeVisible();
});

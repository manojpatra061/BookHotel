import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:4000";

test("should login", async ({ page }) => {
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

test("should signup", async ({ page }) => {
  const uniqueTestEmail = `test${
    Math.floor(Math.random() * 100) + 100
  }@test.com`;
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "register" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an account" })
  ).toBeVisible();

  await page.locator('[name="firstName"]').fill("manoj");
  await page.locator('[name="lastName"]').fill("patra");
  await page.locator('[name="email"]').fill(uniqueTestEmail);
  await page.locator('[name="password"]').fill("password");
  await page.locator('[name="confirmPassword"]').fill("password");
  await page.getByRole("button",{name:'create account'}).click()

  await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
});

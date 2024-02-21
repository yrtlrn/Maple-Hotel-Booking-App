import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test("should allow the user to login", async ({ page }) => {
    await page.goto(`${BASE_URL}/log-in`);

    await page.locator("input:nth-child(2)").fill("test@gmail.com");
    await page.locator("input:nth-child(1)").fill("test123");

    await page.getByRole("button", { name: "Log In" }).click();

    await expect(page.getByText("Log In Successful")).toBeVisible();
});

test("should allow the user to sign up", async ({ page }) => {
    const randNum = Math.floor(Math.random() * 10000);
    const email = "test_reg_" + randNum + "@test.com";
    await page.goto(`${BASE_URL}/sign-up`);

    await page.getByLabel("First Name").fill("test" + randNum);
    await page
        .locator("input:nth-child(2)")
        .nth(1)
        .fill("test" + randNum);
    await page.locator("input:nth-child(2)").nth(2).fill(email);
    await page
        .locator("input:nth-child(1)")
        .nth(0)
        .fill("test" + randNum);
    await page
        .locator("input:nth-child(1)")
        .nth(1)
        .fill("test" + randNum);
    await page.getByRole("button", { name: "Sign Up" }).click();

    await expect(page.getByText("Sign Up Successful")).toBeVisible();
});

test('should allow the user to logout', async({page}) => {
    await page.goto(`${BASE_URL}/log-in`);

    await page.locator("input:nth-child(2)").fill("test@gmail.com");
    await page.locator("input:nth-child(1)").fill("test123");
    await page.getByRole("button", { name: "Log In" }).click();
    await expect(page.getByText("Log In Successful")).toBeVisible();

    await page.getByRole('button').nth(1).click()
    
    await page.getByText('Logout').click();
    await expect(page.getByText('Logout Successful')).toBeVisible()
})
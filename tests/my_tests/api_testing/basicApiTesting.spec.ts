import { test, expect } from '@playwright/test';

test.describe("Positive Route for API Testing", () => {

    test("It should display products on the website", async ({ page }) => {
        //arrange
        const Url = "https://www.demoblaze.com/index.html";
        const response = await page.waitForResponse(res => res.url().endsWith('/entries'));
        await page.goto(Url);
        const product = page.locator(".card.h-100");
        const body = await response.json();

        //assert
        expect(response.status()).toBe(200);
        expect(body.Items).not.toHaveLength(0);
        await expect(product).not.toHaveCount(0);
    })
})

test.describe("Negative Route for API Testing", () => {

    test.beforeEach(async ({ page }) => {
        //arrange
        await page.route("**/entries", async (route) => {
            await route.fulfill({
                status: 500,
            });
        });

        //act
        const Url = "https://www.demoblaze.com/index.html";
        await page.goto(Url);
    });

    test("It should display no products or error when entries endpoint fails", async ({ page }) => {
        //arrange
        const product = page.locator(".card.h-100");

        //assert
        await expect(product).toHaveCount(0);
    });
});
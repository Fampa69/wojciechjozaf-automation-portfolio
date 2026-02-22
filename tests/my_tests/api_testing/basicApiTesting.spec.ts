import { test, expect } from '@playwright/test';
import mockEntries from '../../../mockdata/demoblazeGetEntries.json';

test.describe("Positive Route for API Testing", () => {
    //arrange
    const Url = "https://www.demoblaze.com/index.html";

    test("It should display products on the website", async ({ page }) => {
        //arrange
        const response = await page.waitForResponse(res => res.url().endsWith('/entries'));
        const product = page.locator(".card.h-100");
        const body = await response.json();
        
        //act
        await page.goto(Url);

        //assert
        expect(response.status()).toBe(200);
        expect(body.Items).not.toHaveLength(0);
        await expect(product).not.toHaveCount(0);
    })

    test("It should display mocked products on the website", async ({ page }) => {
        //arrange
        await page.route("**/entries", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                json: mockEntries
            });
        });
        
        //act
        await page.goto(Url);
        await page.pause();

        //assert
        await expect(page.getByText('Super Mocked Phone ProXL 10')).toBeVisible();
        await expect(page.getByText('TPhone 17 Pro')).toBeVisible();
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
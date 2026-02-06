import {test, expect} from '@playwright/test';

test("It should enter the website", async({page}) => {
    await page.goto("https://demo-bank.vercel.app/");
    await expect(page).toHaveURL("https://demo-bank.vercel.app/")
    await expect(page.getByRole('heading', { name: 'Wersja demonstracyjna serwisu' })).toBeVisible();
})
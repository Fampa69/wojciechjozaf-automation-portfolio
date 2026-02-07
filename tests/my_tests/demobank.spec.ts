import {test, expect} from '@playwright/test';
import {LoginPage} from "../../pages/demobank_login"

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo-bank.vercel.app/");
  await expect(page).toHaveURL("https://demo-bank.vercel.app/");
});

test("It should enter the website", async({page}) => {
    await expect(page.getByRole('heading', { name: 'Wersja demonstracyjna serwisu' })).toBeVisible();
})

test("It should be able to log into the user", async({page}) => {
    const LoginFunction = new LoginPage(page)
    await LoginFunction.login("test1234","password");
    await expect(page.getByTestId("user-name")).toHaveText("JanDemobankowy");
})
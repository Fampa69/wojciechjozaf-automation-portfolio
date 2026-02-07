import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/demobank_login"

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo-bank.vercel.app/");
  await expect(page).toHaveURL("https://demo-bank.vercel.app/");
});

test("It should enter the website", async({page}) => {
    await expect(page.getByRole('heading', { name: 'Wersja demonstracyjna serwisu' })).toBeVisible();
})

test("It should be able to log into the user", async({page}) => {
    const LoginFunction = new LoginPage(page);
    await LoginFunction.login("test1234","password");
    await page.getByRole('button',{name: "zaloguj się"}).click();
    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
})

test("It should display notification due to too short password provided", async({page}) => {
    const LoginFunction = new LoginPage(page);
    await LoginFunction.login("test1234","short");
    await page.getByRole('button',{name: "zaloguj się"}).click({ force: true });
    await expect(page.getByTestId("error-login-password")).toBeVisible()
    await expect(page.getByTestId("error-login-password")).toHaveText("hasło ma min. 8 znaków");
})

test("It should display notification due to too short login provided", async({page}) => {
    const LoginFunction = new LoginPage(page);
    await LoginFunction.login("t","password");
    await page.getByRole('button',{name: "zaloguj się"}).click({ force: true });
    await expect(page.getByTestId("error-login-id")).toBeVisible()
    await expect(page.getByTestId("error-login-id")).toHaveText("identyfikator ma min. 8 znaków");
})

test("It should display notification due to nothing being provided into login and password fields", async({page}) => {
    //three clicks to make notification of empty fields appear
    await page.getByTestId('login-input').click();
    await page.getByTestId('password-input').click();
    await page.getByTestId('login-input').click();

    await expect(page.getByTestId("error-login-id")).toBeVisible()
    await expect(page.getByTestId("error-login-id")).toHaveText("pole wymagane");

    await expect(page.getByTestId("error-login-password")).toBeVisible()
    await expect(page.getByTestId("error-login-password")).toHaveText("pole wymagane");
})
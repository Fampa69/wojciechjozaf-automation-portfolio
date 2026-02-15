import {test, expect} from '@playwright/test';
import {LoginPage} from "../../../pages/demobank_login.page"

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo-bank.vercel.app/");
});

test.describe("Positive Demobank login tests cases", () => {

    test("It should enter the website", async({page}) => {
        //arange
        const loginPage = new LoginPage(page);
        const nameHeading = loginPage.nameHeading;
        //assert
        await expect(nameHeading).toBeVisible();
    })

    test("It should be able to log into the user", async({page}) => {
        //arrange
        const loginPage = new LoginPage(page);
        const loginButton = loginPage.loginButton
        const userName = loginPage.userName;

        //act
        await loginPage.login("test1234","password");
        await loginButton.click();

        //assert
        await expect(userName).toHaveText("Jan Demobankowy");
    })
})

test.describe("Negative Demobank login tests cases", () => {

    test("It should display notification due to too short password provided", async({page}) => {
        //arrange
        const loginPage = new LoginPage(page);
        const loginButton = loginPage.loginButton;
        const errorLoginPassword = loginPage.errorLoginPassword;

        //act
        await loginPage.login("test1234","short");
        await loginButton.click({ force: true });

        //assert
        await expect(errorLoginPassword).toBeVisible()
        await expect(errorLoginPassword).toHaveText("hasło ma min. 8 znaków");
    })

    test("It should display notification due to too short login provided", async({page}) => {
        //arrange
        const loginPage = new LoginPage(page);
        const errorLoginId = loginPage.errorLoginId
        const loginButton = loginPage.loginButton;

        //act
        await loginPage.login("t","password");
        await loginButton.click({ force: true });
        await expect(errorLoginId).toBeVisible()
        await expect(errorLoginId).toHaveText("identyfikator ma min. 8 znaków");
    })

    test("It should display notification due to nothing being provided into login and password fields", async({page}) => {
        //arrange
        const loginPage = new LoginPage(page);
        const errorLoginId = loginPage.errorLoginId
        const errorLoginPassword = loginPage.errorLoginPassword;
        const loginInput = loginPage.loginInput;
        const passwordInput = loginPage.passwordInput;

        //act
        //three clicks to make notification of empty fields appear
        await loginInput.click();
        await passwordInput.click();
        await loginInput.click();


        //assert
        await expect(errorLoginId).toBeVisible()
        await expect(errorLoginId).toHaveText("pole wymagane");
        await expect(errorLoginPassword).toBeVisible()
        await expect(errorLoginPassword).toHaveText("pole wymagane");
    })
})
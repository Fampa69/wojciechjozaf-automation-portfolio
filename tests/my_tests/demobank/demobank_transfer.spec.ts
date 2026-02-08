import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/demobank_login";
import { TransferPage } from "../../../pages/demobank_transfer";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo-bank.vercel.app/");
  await expect(page).toHaveURL("https://demo-bank.vercel.app/");
  const LoginFunction = new LoginPage(page);
  await LoginFunction.login("test1234", "password");
  await page.getByRole("button", { name: "zaloguj się" }).click();
});

test("It should be able to send fast transfer and validate dialogue's text", async ({ page }) => {

    //variables
    const transferAmount = "400";
    const transferTitle = "Testing Transfer Title";
    const transferReceiver = "Chuck Demobankowy";
    const TransferFunction = new TransferPage(page) 

    //testing steps
    await TransferFunction.sendTransfer(transferAmount, transferTitle, "2");
    
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await expect(page.getByRole('dialog', { name: 'Przelew wykonany' })).toBeVisible();
    await expect(page.getByText(`Odbiorca: ${transferReceiver}`)).toBeVisible();
    await expect(page.getByText(`Nazwa: ${transferTitle}`)).toBeVisible();
    await expect(page.getByText(`Kwota: ${transferAmount}`)).toBeVisible();
});

test("It should be able to validate website's notification after sending fast transfer", async ({page}) => {
    
    //variables
    const transferAmount = "600";
    const transferTitle = "Another Transfer Title for Validation";
    const transferReceiver = "Jan Demobankowy";
    const TransferFunction = new TransferPage(page) 

    //testing steps
    await TransferFunction.sendTransfer(transferAmount, transferTitle, "1");
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();
    await expect(page.getByTestId('message-text')).toContainText(`Przelew wykonany! ${transferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
})

test("It should notificate user when transer receiver has not been selected", async({page}) =>{
     //variables
    const transferAmount = "600";
    const transferTitle = "Another Transfer Title for Validation";
    const TransferFunction = new TransferPage(page) 

    //testing steps
    await TransferFunction.sendTransfer(transferAmount, transferTitle,"");
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await expect(page.getByTestId("error-widget-1-transfer-receiver")).toBeVisible();
})

test("It should notificate user when transfer amount has not been provided", async({page}) =>{
     //variables

    const transferTitle = "Another Transfer Title for Validation";
    const TransferFunction = new TransferPage(page) 

    //testing steps
    await TransferFunction.sendTransfer("", transferTitle,"2");
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await expect(page.getByTestId("error-widget-1-transfer-amount")).toBeVisible();
})

test("It should notificate user when transer title has not been selected", async({page}) =>{
     //variables
    const transferAmount = "600";
    const TransferFunction = new TransferPage(page) 

    //testing steps
    await TransferFunction.sendTransfer(transferAmount, "","2");
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await expect(page.getByTestId('error-widget-1-transfer-title')).toBeVisible();
})
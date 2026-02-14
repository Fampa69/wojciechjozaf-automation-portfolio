import { test, expect } from "@playwright/test";
import { LoginPage } from "../../../pages/demobank_login.page";
import { TransferPage } from "../../../pages/demobank_transfer.page";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo-bank.vercel.app/");
  await expect(page).toHaveURL("https://demo-bank.vercel.app/");
  const LoginFunction = new LoginPage(page);
  await LoginFunction.login("test1234", "password");
  await page.getByRole("button", { name: "zaloguj się" }).click();
});

test.describe("Positive Route Test Cases for Transfer Actions", () => {
    test("It should be able to send fast transfer and validate dialogue's text", async ({ page }) => {
        //arrange
        const transferAmount = "400";
        const transferTitle = "Testing Transfer Title";
        const transferReceiver = "Chuck Demobankowy";
        const transferPage = new TransferPage(page)
        const doButton = transferPage.doButton;
        const transferDialog = transferPage.transferDialog;

        //act
        await transferPage.sendTransfer(transferAmount, transferTitle, "2");
        await doButton.click();

        //assert
        await expect(transferDialog).toBeVisible();
        await expect(page.getByText(`Odbiorca: ${transferReceiver}`)).toBeVisible();
        await expect(page.getByText(`Nazwa: ${transferTitle}`)).toBeVisible();
        await expect(page.getByText(`Kwota: ${transferAmount}`)).toBeVisible();
    });

    test("It should be able to validate website's notification after sending fast transfer", async ({page}) => {
        //arrange
        const transferAmount = "600";
        const transferTitle = "Another Transfer Title for Validation";
        const transferReceiver = "Jan Demobankowy";
        const transferPage = new TransferPage(page) 
        const doButton = transferPage.doButton;
        const closeButton = transferPage.closeButton;
        const message = transferPage.message;

        //act
        await transferPage.sendTransfer(transferAmount, transferTitle, "1");
        await doButton.click();
        await closeButton.click();

        //assert
        await expect(message).toContainText(`Przelew wykonany! ${transferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
    })
})

test.describe("Negative Route Test Cases for Transfer actions", () => {
    test("It should notificate user when transer receiver has not been selected", async({page}) =>{
        //arrange
        const transferAmount = "600";
        const transferTitle = "Another Transfer Title for Validation";
        const transferPage = new TransferPage(page)
        const doButton = transferPage.doButton;
        const errorTransferReceiver =  transferPage.errorTransferReceiver;

        //act
        await transferPage.sendTransfer(transferAmount, transferTitle,"");
        await doButton.click();

        //assert
        await expect(errorTransferReceiver).toBeVisible();
    })

    test("It should notificate user when transfer amount has not been provided", async({page}) =>{
        //arrange
        const transferTitle = "Another Transfer Title for Validation";
        const transferPage = new TransferPage(page)
        const doButton = transferPage.doButton; 
        const errorTransferMessage = transferPage.errorTransferMessage;

        //act
        await transferPage.sendTransfer("", transferTitle,"2");
        await doButton.click();

        //assert
        await expect(errorTransferMessage).toBeVisible();
    })

    test("It should notificate user when transer title has not been selected", async({page}) =>{
        //arrange
        const transferAmount = "600";
        const transferPage = new TransferPage(page)
        const doButton = transferPage.doButton; 
        const errorTransferTitle = transferPage.errorTransferTitle;

        //act
        await transferPage.sendTransfer(transferAmount, "","2");
        await doButton.click();

        //assert
        await expect(errorTransferTitle).toBeVisible();
    })
})
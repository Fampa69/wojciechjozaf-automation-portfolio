import {Page, Locator} from "@playwright/test"

export class TransferPage{
    
    readonly amountBox: Locator;
    readonly titleBox: Locator;
    readonly receiverBox: Locator;
    readonly doButton: Locator;
    readonly closeButton: Locator;
    readonly message: Locator;
    readonly transferDialog: Locator;
    readonly errorTransferMessage: Locator;
    readonly errorTransferTitle: Locator;
    readonly errorTransferReceiver: Locator;

    constructor(page: Page){

        this.amountBox = page.locator('#widget_1_transfer_amount');
        this.titleBox = page.locator('#widget_1_transfer_title');
        this.receiverBox = page.locator('#widget_1_transfer_receiver');
        this.doButton = page.getByRole('button', { name: 'wykonaj' });
        this.closeButton = page.getByTestId('close-button');
        this.message = page.getByTestId('message-text');
        this.transferDialog = page.getByRole('dialog', { name: 'Przelew wykonany' });
        this.errorTransferMessage = page.getByTestId("error-widget-1-transfer-amount");
        this.errorTransferTitle = page.getByTestId("error-widget-1-transfer-title");
        this.errorTransferReceiver = page.getByTestId("error-widget-1-transfer-receiver");

    }
    
    async sendTransfer(amount: string, title: string, receiver: string){
        await this.amountBox.fill(amount);
        await this.titleBox.fill(title);
        await this.receiverBox.selectOption(receiver);
    }   


}
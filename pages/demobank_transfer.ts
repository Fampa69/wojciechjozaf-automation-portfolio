import {Page, Locator} from "@playwright/test"

export class TransferPage{
    
    readonly page: Page;
    readonly amountBox: Locator;
    readonly titleBox: Locator;
    readonly receiverBox: Locator;

    constructor(page: Page){
        this.page = page;
        this.amountBox = page.locator('#widget_1_transfer_amount');
        this.titleBox = page.locator('#widget_1_transfer_title');
        this.receiverBox = page.locator('#widget_1_transfer_receiver')
    }
    
    async sendTransfer(amount: string, title: string, receiver: string){
        await this.amountBox.fill(amount);
        await this.titleBox.fill(title);
        await this.receiverBox.selectOption(receiver);
    }   

}
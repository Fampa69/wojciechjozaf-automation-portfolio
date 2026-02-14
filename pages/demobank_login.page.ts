import { Page, Locator } from '@playwright/test';

export class LoginPage{

    readonly usernameBox: Locator;
    readonly passwordBox: Locator;

    constructor(page: Page){
        this.usernameBox = page.getByTestId('login-input');
        this.passwordBox = page.getByTestId('password-input');
    }

    async login(username: string, password: string){
        await this.usernameBox.fill(username);
        await this.passwordBox.fill(password);
    }
}
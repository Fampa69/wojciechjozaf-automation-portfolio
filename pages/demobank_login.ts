import { Page, Locator } from '@playwright/test';

export class LoginPage{

    readonly page: Page;
    readonly usernameBox: Locator;
    readonly passwordBox: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameBox = page.getByTestId('login-input');
        this.passwordBox = page.getByTestId('password-input');
        this.loginButton = page.getByRole('button',{name: "zaloguj się"});
    }

    async login(username: string, password: string){
        await this.usernameBox.fill(username);
        await this.passwordBox.fill(password);
        await this.loginButton.click();
    }
}
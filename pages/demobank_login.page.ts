import { Page, Locator } from '@playwright/test';

export class LoginPage{

    readonly usernameBox: Locator;
    readonly passwordBox: Locator;
    readonly loginButton: Locator;
    readonly userName: Locator;
    readonly errorLoginPassword: Locator;
    readonly errorLoginId: Locator;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly nameHeading: Locator;


    constructor(page: Page){
        this.usernameBox = page.getByTestId('login-input');
        this.passwordBox = page.getByTestId('password-input');
        this.loginButton = page.getByRole('button',{name: "zaloguj się"});
        this.userName= page.getByTestId("user-name");
        this.errorLoginPassword = page.getByTestId("error-login-password");
        this.errorLoginId = page.getByTestId("error-login-id");
        this.loginInput = page.getByTestId('login-input');
        this.passwordInput = page.getByTestId('password-input');
        this.nameHeading = page.getByRole('heading', { name: 'Wersja demonstracyjna serwisu' });
    }

    async login(username: string, password: string){
        await this.usernameBox.fill(username);
        await this.passwordBox.fill(password);
    }
}
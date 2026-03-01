import { Page } from "@playwright/test";
import * as business from "@business";
import * as pages from "@pages";
import * as components from "@components";
import * as config from "@config"

export class SessionHandler {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async loginFromMainPage(username: string, password: string): Promise<void> {
        const home = new pages.HomePage(this.page);
        const cookies = new business.CookieHandler(this.page);

        await home.goto();
        await home.expectLoaded();
        await cookies.closeCookieBannerIfVisible();

        const header = new components.HeaderComp(this.page);
        await header.clickLogin();
        await cookies.closeCookieBannerIfVisible();
        const loginPage = new pages.LoginPage(this.page);
        await loginPage.login(username, password);
    }


    async loginFromSchoolPage(username: string, password: string): Promise<void> {
        const navigation = new business.NavigationHandler(this.page);
        await navigation.navigateToSchool(config.TestParams.getTestSchoolName());

        const schoolHomePage = new pages.SchoolHomePage(this.page);
        await schoolHomePage.clickSignInButton();
        await schoolHomePage.setUsername(username);
        await schoolHomePage.setPassword(password);
        await schoolHomePage.clickLoginButton();
        await this.page.waitForTimeout(3000);//not the best option, but if I do not put that wait here, the login is not performed correctly. Not sure why, would like to debug more.
    }

    async logout() {
        const home = new pages.HomePage(this.page);
        await home.goto();

        const header = new components.HeaderComp(this.page);
        await header.hoverOverMySchoolLink();
        await header.clickLogout();
    }

    async logoutFromThankYouPage() {
        const header = new components.HeaderComp(this.page);
        await header.clickLogoutFromThankYouPage();
    }
}
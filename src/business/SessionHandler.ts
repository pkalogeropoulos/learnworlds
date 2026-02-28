import { Page } from "@playwright/test";
import * as business from "@business";
import * as pages from "@pages";
import * as components from "@components";

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
        await navigation.navigateToSchool(process.env.DEMO_SCHOOL_NAME!);

        const schoolHomePage = new pages.SchoolHomePage(this.page);
        await schoolHomePage.clickSignInButton();
        await schoolHomePage.setUsername(username);
        await schoolHomePage.setPassword(password);
        await schoolHomePage.clickLoginButton();
    }

    async logout() {
        const home = new pages.HomePage(this.page);
        await home.goto();

        const header = new components.HeaderComp(this.page);
        await header.hoverOverMySchoolLink();
        await header.clickLogout();
    }

    async logoutFromSchoolSection() {

    }
}
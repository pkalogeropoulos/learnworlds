import { SessionHandler } from "@business";
import * as pages from "@pages";
import { User } from "@config";
import { Page } from "@playwright/test";



export class NavigationHandler {

    readonly page: Page;
    readonly sessionHandler: SessionHandler;

    constructor(page: Page) {
        this.page = page;
        this.sessionHandler = new SessionHandler(this.page);
    }


    async navigateToSchool(schoolName: string): Promise<void> {
        //This url should be dynamic and fetched based on the current env. Keeping it simple for now for this demo.
        await this.page.goto("https://" + schoolName + ".learnworlds.com", { waitUntil: "domcontentloaded" });
    }

    async navigateToAdminDashboard(schoolName: string): Promise<void> {
        //This url should be dynamic and fetched based on the current env. Keeping it simple for now for this demo.
        await this.page.goto("https://" + schoolName + ".learnworlds.com/author/dashboard", { waitUntil: "domcontentloaded" });
    }

    async navigateToUserWithEmail(adminUser: User, email: string) {
        await this.sessionHandler.loginFromSchoolPage(adminUser.email, adminUser.password);
        await this.page.waitForTimeout(3000);
        const usersPage = new pages.UsersPage(this.page);
        await usersPage.goto(adminUser.school);
        await usersPage.clickUserByEmail(email);
    }
}
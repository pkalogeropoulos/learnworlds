import { Locator, Page } from "@playwright/test"

export class AdminPage {

    readonly page: Page;
    readonly usersTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usersTab = page.locator("#users > div.admin-side-menu--top-level-item.gap-8 > div > span");
    }

    async clickUsersTab() {
        await this.usersTab.click();
    }


}
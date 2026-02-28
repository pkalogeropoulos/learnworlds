import { expect, Page } from "@playwright/test";


export class NavigationHandler {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async navigateToSchool(schoolName: string): Promise<void> {
        //This url should be dynamic and fetched based on the current env. Keeping it simple for now for this demo.
        await this.page.goto("https://" + schoolName + ".learnworlds.com", { waitUntil: "domcontentloaded" });
    }
}
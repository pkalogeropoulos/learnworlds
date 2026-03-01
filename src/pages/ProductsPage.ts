import { expect, Page } from "@playwright/test"

export class ProductsPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async isCoursePresent(courseName: string): Promise<boolean> {
        const row = await this.page.getByRole("row", {
            name: courseName,
        });

        return await row.count() > 0;
    }

    async getEnrollmentStatusForCourse(courseName: string): Promise<string> {
        const row = await this.page.getByRole("row", {
            name: courseName,
        });
        const status = await row.locator("td.authoring-table-cell").nth(6).innerText();
        return status;
    }
}
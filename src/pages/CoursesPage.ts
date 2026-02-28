import { Locator, Page } from "@playwright/test";

export class CoursesPage {

    readonly page: Page;
    readonly cartIcon: Locator;
    readonly checkoutButton;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.getByRole('img').nth(2);
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    /** 
     * We could create a specific method such as courseCardById(id: string): Locator, depends on the how we want to structure our codebase
     */
    private readonly dynamicSelectors = {
        courseCardById: (id: string) => this.page.locator(`div[id="${id}"] button.product-card-enroll-button`),
    };

    async addToCartCourseById(courseId: string): Promise<void> {
        await this.dynamicSelectors.courseCardById(courseId).click();
    }

    async hoverOverCartIcon() {
        await this.cartIcon.hover();
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
}
import { User } from "@config";
import { ProductsPage, TransactionsPage, UsersPage } from "@pages";
import { expect, Page } from "@playwright/test"

export class UserAssertions {

    static async verifyUserDetailsOverview(usersPage: UsersPage, testUser: User) {
        await expect.soft(usersPage.userEmail).toHaveText(testUser.email);
        await expect.soft(usersPage.userNameSurname).toHaveText(testUser.name + " " + testUser.surname);
        await expect.soft(usersPage.userCourses).toHaveText("0");//shouldn't this be 1? Maybe some sync with backend is required? I am very curious why it is zero, not sure what is going on here, maybe I'm missing something business/wise

    }

    static async verifyUserDetailsProducts(productsPage: ProductsPage, testCourseName: string) {
        await expect.soft(productsPage.isCoursePresent(testCourseName)).toBeTruthy();
        const status = await productsPage.getEnrollmentStatusForCourse(testCourseName);
        await expect.soft(status.toString()).toBe("Enrolled");
    }

    static async verifyUserDetailsTransactions(transactionsPage: TransactionsPage, coursePrice: string) {
        await expect.soft((transactionsPage.isStatusWithValuePresent("Successful"))).toBeTruthy();
        await expect.soft((transactionsPage.isAmountWithValuePresent(coursePrice))).toBeTruthy();
 
    }
}
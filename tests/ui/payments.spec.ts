import { test, expect } from "../fixtures/test";
import { PaymentAssertions } from "tests/assertions/PaymentAssertions";
import { TestParams, User } from "../../src/config/";
import { UserAssertions } from "tests/assertions/UserAssertions";
import * as allure from "allure-js-commons";

test.describe("Payments tests with cart disabled (go straight to payment)", () => {
    const adminUser = TestParams.getMainTestUser();
    let secondaryTestUser: User;
    const testCourseId = TestParams.getTestCourseId();
    const testCourseName = TestParams.getTestCourseName();
    const testCourseInitialPrice = TestParams.getCourseInitialPrice();
    const testCourseDiscountedPrice = TestParams.getDiscountCouponPrice();
    const couponCode = TestParams.getCouponCode();

    test("Perform simple payment happy path without coupon", async ({ page, schoolHomePage, coursesPage, transactionsPage, adminPage, navigation, usersPage, productsPage, paymentPage, thankYouPage }) => {
        await allure.step("Set user data in payments page", async () => {
            secondaryTestUser = TestParams.getSecondaryTestUser();
            await navigation.navigateToSchool(TestParams.getTestSchoolName());
            await schoolHomePage.clickCoursesLink();
            await coursesPage.proceedToCheckoutForCourseWithId(testCourseId);

            await paymentPage.setUserData(secondaryTestUser);
        });

        await paymentPage.clickBuy();

        await allure.step("Quick verifications in thank you page", async () => {
            await PaymentAssertions.verifyThankYouPage(thankYouPage);
        });

    });

    test("Perform simple payment happy path with coupon", async ({ page, schoolHomePage, coursesPage, transactionsPage, adminPage, navigation, usersPage, productsPage, paymentPage, thankYouPage }) => {
        await allure.step("Set user data in payments page", async () => {
            secondaryTestUser = TestParams.getSecondaryTestUser();
            await navigation.navigateToSchool(TestParams.getTestSchoolName());
            await schoolHomePage.clickCoursesLink();
            await coursesPage.proceedToCheckoutForCourseWithId(testCourseId);

            await paymentPage.setUserData(secondaryTestUser);
        });

        await paymentPage.applyCoupon(couponCode);

        //perform a hard-stop assertion here, this could be enriched with more checks here
        //In this case we could use a Currency formatter, keeping it simple for now
        await expect(paymentPage.totalAmount).toHaveText("€" + testCourseDiscountedPrice);
        await paymentPage.clickBuy();

        await allure.step("Quick verifications in thank you page", async () => {
            await PaymentAssertions.verifyThankYouPage(thankYouPage);
        });
    });

    test("Verify user that performed payment without coupon", async ({ transactionsPage, adminPage, navigation, usersPage, productsPage }) => {
        const userWithoutCoupon = TestParams.getUserWithoutCoupon();
        await navigation.sessionHandler.loginToAdminMenu(adminUser);
        await adminPage.clickUsersTab();

        await usersPage.searchForUser(userWithoutCoupon.email);
        await usersPage.clickUserByEmail(userWithoutCoupon.email);
        await allure.step("Verify users overview page", async () => {
            await UserAssertions.verifyUserDetailsOverview(usersPage, userWithoutCoupon);
        });

        await allure.step("Verify users transactions page", async () => {
            await usersPage.clickTransactionsTab();
            await UserAssertions.verifyUserDetailsTransactions(transactionsPage, testCourseDiscountedPrice);
        });

        await allure.step("Verify users products page", async () => {
            await usersPage.clickProductsTab();
            await UserAssertions.verifyUserDetailsProducts(productsPage, testCourseName);
        });
    });

    test("Verify user that performed payment with coupon", async ({ transactionsPage, adminPage, navigation, usersPage, productsPage }) => {
        const userWithCoupon = TestParams.getUserWithCoupon();
        await navigation.sessionHandler.loginToAdminMenu(adminUser);
        await adminPage.clickUsersTab();

        await usersPage.searchForUser(userWithCoupon.email);
        await usersPage.clickUserByEmail(userWithCoupon.email);
        await allure.step("Verify users overview page", async () => {
            await UserAssertions.verifyUserDetailsOverview(usersPage, userWithCoupon);
        });

        await allure.step("Verify users transactions page", async () => {
            await usersPage.clickTransactionsTab();
            await UserAssertions.verifyUserDetailsTransactions(transactionsPage, testCourseDiscountedPrice);
        });

        await allure.step("Verify users products page", async () => {
            await usersPage.clickProductsTab();
            await UserAssertions.verifyUserDetailsProducts(productsPage, testCourseName);
        });
    });


});
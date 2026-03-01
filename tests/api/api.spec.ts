import { test, expect } from "../fixtures/test";
import { request } from "@playwright/test";
import { CreateUserPayload } from "../../src/api/CreateUserPayload";
import { Config } from "../../src/config/Config";

test.describe("Payments tests with cart disabled (go straight to payment)", () => {

    test.beforeEach("Navigate to school", async ({ navigation }) => {
        //await navigation.navigateToSchool(Config.getTestSchoolName());
    });

    test("Perform simple payment happy path without coupon", async ({ page, session, transactionsPage, adminPage, navigation, usersPage, productsPage, schoolHomePage, coursesPage, paymentPage, thankYouPage }) => {
        const payload: CreateUserPayload = {
            custom_fields: {},
            isEmailVerificationRequested: false,
            first_name: "test",
            last_name: "test",
            email: "p.kalogeropouloss+01@gmail.com",
            tags: [],
            userRole: "user",
            userCoursesToEnroll: null,

            enrollmentData: {
                addToSeat: false,
                justification: "",
                applyAffiliateCommissions: false,

                products: [
                    {
                        id: "699e693a2a1dfdd7190737f2",
                        price: 10,
                        expirationTimestamp: null,
                        shouldSetCustomExpirationDate: false,
                        productId: "699e693a2a1dfdd7190737f2",
                    },
                ],

                createPaymentRecord: false,
                generateInvoice: false,
                sendWelcomeEmail: false,
                sendEnrollmentEmail: false,
                sendPaymentEmail: false,
                markProductsComplete: false,
                sendProductCompletionEmail: false,
            },

            account: {
                type: "learnworlds",
            },
        };
        session.loginFromSchoolPage(Config.getMainTestUser().email, Config.getMainTestUser().password);
        await expect(page).toHaveURL(/\/author/i);

        await page.context().storageState({ path: "storage/admin.state.json" });

        const apiContext = await request.newContext({
            baseURL: "https://pkalogerop.learnworlds.com",
            storageState: "storage/admin.state.json",
            extraHTTPHeaders: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });


        const response = await apiContext.post("/api/author/create_user", {
            data: payload
        });

        const json = await response.json();
        console.log("JSON:", json);

        // This is the real success check
        expect(json.success, JSON.stringify(json)).toBeTruthy();

        await apiContext.dispose();
    });


});
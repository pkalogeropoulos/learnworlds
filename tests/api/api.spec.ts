import { test, expect } from "../fixtures/test";
import { request } from "@playwright/test";
import { CreateUserPayload } from "../../src/api/CreateUserPayload";
import { Config } from "../../src/config/Config";


test("Create a user via api calls", async ({ page, session, transactionsPage, adminPage, navigation, usersPage, productsPage, schoolHomePage, coursesPage, paymentPage, thankYouPage }) => {
    
    const courseId = Config.getTestCourseId();

    const payload: CreateUserPayload = {
        custom_fields: {},
        isEmailVerificationRequested: false,
        first_name: "test",
        last_name: "test",
        email: `p.kalogeropouloss+${Date.now()}@gmail.com`,
        tags: [],
        userRole: "user",
        userCoursesToEnroll: null,

        enrollmentData: {
            addToSeat: false,
            justification: "",
            applyAffiliateCommissions: false,

            products: [
                {
                    id: courseId,
                    price: 10,
                    expirationTimestamp: null,
                    shouldSetCustomExpirationDate: false,
                    productId: courseId,
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

    const admin = Config.getMainTestUser();
    
    await session.loginFromSchoolPage(admin.email, admin.password);
    await expect(page).toHaveURL(/\/author/i);

    const storageStatePath = Config.getStorageStatePath();
    await page.context().storageState({ path: storageStatePath });

    const apiContext = await request.newContext({
        baseURL: Config.getDemoSchoolUrl(),
        storageState: storageStatePath,
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



import { test, expect } from "../fixtures/test";
import { request, APIRequestContext } from "@playwright/test";
import { TestParams } from "../../src/config/TestParams";
import { UserPayloadFactory } from "src/api/UserPayloadFactory";
import * as allure from "allure-js-commons";


test.describe("Api tests", () => {
    const admin = TestParams.getMainTestUser();
    const storageStatePath = TestParams.getStorageStatePath();
    let apiContext: APIRequestContext;


    /**
     * We could set this "login from ui" to setup/globalSetup or a worker fixture.
     * Since this is a standalone api test, we can do this in beforeAll method
     */
    test.beforeAll("Login via ui", async ({ page, session }) => {
        allure.step("Login via ui and set the storageState", async () => {
            await session.loginFromSchoolPage(admin.email, admin.password);
            await expect(page).toHaveURL(/\/author/i);

            await page.context().storageState({ path: storageStatePath });
        });
    });

    test("Create a user via api call", async () => {
        allure.step("Create the user in POST/api/author/create_user and assert the response", async () => {
            apiContext = await request.newContext({
                baseURL: TestParams.getDemoSchoolUrl(),
                storageState: storageStatePath,
                extraHTTPHeaders: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });


            const response = await apiContext.post("/api/author/create_user", {
                data: UserPayloadFactory.getDefaultUserPayload()
            });

            const json = await response.json();
            console.log("JSON:", json);

            /*
            The response should be something like:
            {
                user: { id: '69a459c91b1f7bcaa605d198', created: 1772378568.989671 },
                errors: [],
                success: true
            }
        
            we check that the success is true
            */
            expect(json.success, JSON.stringify(json)).toBeTruthy();
        })

    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

})



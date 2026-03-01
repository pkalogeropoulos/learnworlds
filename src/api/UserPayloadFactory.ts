import { CreateUserPayload } from "./CreateUserPayload";
import { TestParams } from "@config";

export class UserPayloadFactory {

    static getDefaultUserPayload(): CreateUserPayload  {
        const courseId = TestParams.getTestCourseId();

        const payload: CreateUserPayload = {
            custom_fields: {},
            isEmailVerificationRequested: false,
            first_name: "test",
            last_name: "test",
            email: `test+${Date.now()}@gmail.com`,
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

        return payload;
    }
}
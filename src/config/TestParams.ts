import { User } from "./User";

export class TestParams {


    static getMainTestUser(): User {
        const user: User = {
            name: "testName1",
            surname: "testSurname1",
            email: process.env.DEMO_NAME_01!,
            password: process.env.DEMO_PASS_01!,
            school: process.env.DEMO_SCHOOL_NAME!
        };

        return user;
    }

    static getSecondaryTestUser(): User {
        const user: User = {
            name: "testName2",
            surname: "testSurname2",
            email: "testuser+" + Math.floor((Math.random() * 1000) + 100) + "@gmail.com",
            password: "testPass123!",
            school: ""
        };

        return user;
    }

    static getTestSchoolName(): string {
        return process.env.DEMO_SCHOOL_NAME?.toString()!;
    }

    static getTestCourseId(): string {
        return process.env.DEMO_COURSE_ID?.toString()!;
    }

    static getTestCourseName(): string {
        return process.env.DEMO_COURSE_NAME?.toString()!;
    }

    static getCouponCode(): string {
        return process.env.DEMO_COUPON_NAME?.toString()!;
    }

    static getCourseInitialPrice(): string {
        return process.env.DEMO_COURSE_INITIAL_PRICE!;
    }

    static getDiscountCouponPrice(): string {
        return process.env.DEMO_COUPON_DISCOUNTED_PRICE?.toString()!;
    }

    static getStorageStatePath() {
        return process.env.STORAGE_STATE_PATH?.toString()!;
    }

    static getDemoSchoolUrl() {
        return process.env.DEMO_SCHOOL_URL?.toString()!;
    }
}
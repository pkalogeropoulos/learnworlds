import { User } from "./User";

export class Config {


    static getMainTestUser(): User {
        const user: User = {
            name: "testName1",
            surname: "testSurname1",
            email: process.env.DEMO_NAME_01!,
            password: process.env.DEMO_PASS_01!,
        };

        return user;
    }

    static getSecondaryTestUser(): User {
        const user: User = {
            name: "testName2",
            surname: "testSurname2",
            email: "p.kalogeropouloss+" + Math.floor((Math.random() * 1000) + 100) + "@gmail.com",//process.env.DEMO_NAME_02!,
            password: process.env.DEMO_PASS_02?.toString()!,
        };

        return user;
    }

    static getTestSchoolName(): string {
        return process.env.DEMO_SCHOOL_NAME?.toString()!;
    }

    static getTestCourseId(): string {
        return process.env.DEMO_COURSE_ID?.toString()!;
    }
}
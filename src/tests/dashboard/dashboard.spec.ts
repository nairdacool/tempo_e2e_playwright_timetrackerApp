import { test } from "@fixtures/index";
import { users } from "@data/users";
import * as allure from "allure-js-commons";

test.describe("TC-DASH — Dashboard", () => {

    test("TEM-17 | Dashboard renders stat cards",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/17`,
            },
        },
        async ({ loginPage, dashboardPage }) => {
            await allure.description("Verify that all four stat cards are visible on the dashboard and each displays a numeric value.");
            await allure.severity("normal");
            await allure.tag("dashboard");
            await allure.tag("stats");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await dashboardPage.verifyStatCards();
        });

});

import { test } from "@fixtures/index";
import { users } from "@data/users";
import * as allure from "allure-js-commons";

test.describe("TC-TIME — Timesheet", () => {

    test("TEM-26 | Timesheet page renders",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/26`,
            },
        },
        async ({ loginPage, timesheetPage }) => {
            await allure.description("Verify that navigating to /timesheet renders the timesheet page with the week navigator visible.");
            await allure.severity("normal");
            await allure.tag("timesheet");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await timesheetPage.goTo();
            await timesheetPage.verifyPageLoaded();
        });

});

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

    test("TEM-18 | View all entries link navigates to Timesheet",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/18`,
            },
        },
        async ({ loginPage, dashboardPage }) => {
            await allure.description("Verify that clicking the 'View all entries' link on the Dashboard navigates to the Timesheet page.");
            await allure.severity("normal");
            await allure.tag("dashboard");
            await allure.tag("navigation");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await dashboardPage.clickViewAllEntries();
        });

    test("TEM-19 | Recent entry click opens modal",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/19`,
            },
        },
        async ({ loginPage, dashboardPage, editTimeEntryModal }) => {
            await allure.description("Verify that clicking a Recent Team Entry row for the logged-in user opens the Edit Time Entry modal with pre-populated entry data.");
            await allure.severity("normal");
            await allure.tag("dashboard");
            await allure.tag("modal");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await dashboardPage.clickEntryByMember(users.valid.displayName);
            await editTimeEntryModal.verifyModalOpen();
            await editTimeEntryModal.verifyFieldsPopulated();
        });

    test("TEM-20 | Quick action — Log Time navigates to /timesheet",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/20`,
            },
        },
        async ({ loginPage, dashboardPage }) => {
            await allure.description("Verify that all Quick Action buttons are visible and clicking Log Time navigates to /timesheet.");
            await allure.severity("normal");
            await allure.tag("dashboard");
            await allure.tag("quick-actions");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await dashboardPage.verifyQuickActionsVisible();
            await dashboardPage.clickQuickActionTimesheet();
        });

    test("TEM-21 | Quick action — View Projects navigates to /projects",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/21`,
            },
        },
        async ({ loginPage, dashboardPage }) => {
            await allure.description("Verify that clicking the View Projects Quick Action navigates to /projects.");
            await allure.severity("normal");
            await allure.tag("dashboard");
            await allure.tag("quick-actions");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await dashboardPage.verifyQuickActionsVisible();
            await dashboardPage.clickQuickActionProjects();
        });

    test("TEM-22 | Quick action — Open Reports navigates to /reports",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/22`,
            },
        },
        async ({ loginPage, dashboardPage }) => {
            await allure.description("Verify that clicking the Open Reports Quick Action navigates to /reports.");
            await allure.severity("normal");
            await allure.tag("dashboard");
            await allure.tag("quick-actions");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await dashboardPage.verifyQuickActionsVisible();
            await dashboardPage.clickQuickActionReports();
        });

    test("TEM-23 | Quick action — Approvals navigates to /approvals",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/23`,
            },
        },
        async ({ loginPage, dashboardPage }) => {
            await allure.description("Verify that clicking the Approvals Quick Action navigates to /approvals.");
            await allure.severity("normal");
            await allure.tag("dashboard");
            await allure.tag("quick-actions");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await dashboardPage.verifyQuickActionsVisible();
            await dashboardPage.clickQuickActionApprovals();
        });

});

import { test } from "@fixtures/index";
import { users } from "@data/users";
import { navItems } from "@pages/SidebarPage";
import * as allure from "allure-js-commons";

test.describe("TC-NAV — Navigation", () => {

    test("TEM-12 | Sidebar nav routes correctly",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/12`,
            },
        },
        async ({ loginPage, sidebarPage }) => {
            await allure.description("Verify that each sidebar nav item navigates to the correct page and renders the module header.");
            await allure.severity("critical");
            await allure.tag("navigation");
            await allure.tag("smoke");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);

            for (const item of navItems) {
                await sidebarPage.navigateToAndVerify(item);
            }
        });

    test("TEM-14 | Active nav item highlighted",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/14`,
            },
        },
        async ({ loginPage, sidebarPage }) => {
            await allure.description("Verify that the active nav item shows the active/highlighted style when navigating between modules.");
            await allure.severity("normal");
            await allure.tag("navigation");
            await allure.tag("smoke");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);

            const itemsToVerify = ["dashboard", "timesheet", "projects"].map(
                (path) => navItems.find((item) => item.urlPath === path)!
            );

            for (const item of itemsToVerify) {
                await sidebarPage.navigateAndVerifyActive(item);
            }
        });

    test("TEM-15 | Sidebar user profile click",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/15`,
            },
        },
        async ({ loginPage, sidebarPage }) => {
            await allure.description("Verify that clicking the user profile button navigates to the Settings page.");
            await allure.severity("normal");
            await allure.tag("navigation");
            await allure.tag("smoke");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await sidebarPage.navigateToSettings();
        });

    test("TEM-16 | Organizations link visible for admins only",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/16`,
            },
        },
        async ({ loginPage, sidebarPage }) => {
            await allure.description("Verify that Organizations, Team and Approvals nav items are not visible for non-admin users.");
            await allure.severity("critical");
            await allure.tag("navigation");
            await allure.tag("authorization");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.nonAdmin.username, users.nonAdmin.password);
            await sidebarPage.verifyAdminOnlyNavHidden();
        });

});

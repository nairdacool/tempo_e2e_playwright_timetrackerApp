import { test } from "@fixtures/index";
import { users } from "@data/users";
import * as allure from "allure-js-commons";

test.describe("TC-TIME — Timesheet", () => {

    test("TEM-25 | Timesheet page renders",
        {
            annotation: [
                {
                    type: "test case",
                    description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/25`,
                },
                {
                    type: "test case",
                    description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/26`,
                },
            ],
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

    test("TEM-29 | Add entry via form",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/29`,
            },
        },
        async ({ loginPage, timesheetPage }) => {
            await allure.description("Verify that filling the timesheet entry form and submitting adds the entry to the day group list.");
            await allure.severity("critical");
            await allure.tag("timesheet");
            await allure.tag("entry");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await timesheetPage.goTo();
            const description = `Automated entry test ${Date.now()}`;
            await timesheetPage.addEntry({
                project: "Backend API v2",
                description,
                date: "2026-03-09",
                startTime: "08:00",
                endTime: "09:00",
            });
            await timesheetPage.verifyEntryInDayGroup(description);
        });

    test("TEM-30 | Add entry — missing project disables submit",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/30`,
            },
        },
        async ({ loginPage, timesheetPage }) => {
            await allure.description("Verify that the Add Entry button is disabled when no project is selected in the entry form.");
            await allure.severity("normal");
            await allure.tag("timesheet");
            await allure.tag("validation");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await timesheetPage.goTo();
            await timesheetPage.verifyAddEntryButtonDisabled();
        });

    test("TEM-31 | Add entry — end before start keeps button disabled",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/31`,
            },
        },
        async ({ loginPage, timesheetPage }) => {
            await allure.description("Verify that setting an end time earlier than the start time keeps the Add Entry button disabled.");
            await allure.severity("normal");
            await allure.tag("timesheet");
            await allure.tag("validation");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await timesheetPage.goTo();
            await timesheetPage.fillEntryTimesInvalidRange("10:00", "09:00");
            await timesheetPage.verifyAddEntryButtonDisabled();
        });

    test("TEM-32 | Click entry opens modal with correct data",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/32`,
            },
        },
        async ({ loginPage, timesheetPage, editTimeEntryModal }) => {
            await allure.description("Verify that clicking a timesheet entry opens the edit modal with the entry's data pre-filled.");
            await allure.severity("critical");
            await allure.tag("timesheet");
            await allure.tag("modal");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await timesheetPage.goTo();

            const description = `Edit modal test ${Date.now()}`;
            await timesheetPage.addEntry({
                project: "Backend API v2",
                description,
                date: "2026-03-09",
                startTime: "09:00",
                endTime: "10:00",
            });
            await timesheetPage.clickEntryByDescription(description);
            await editTimeEntryModal.verifyModalOpen();
            await editTimeEntryModal.verifyFieldsMatch({
                project: "Backend API v2",
                description,
                startTime: "09:00",
                endTime: "10:00",
            });
        });

    test("TEM-33 | Edit entry — save changes",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/33`,
            },
        },
        async ({ loginPage, timesheetPage, editTimeEntryModal }) => {
            await allure.description("Verify that modifying an entry's description and end time in the modal and clicking Save updates the entry in the list.");
            await allure.severity("critical");
            await allure.tag("timesheet");
            await allure.tag("modal");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await timesheetPage.goTo();

            const initialDescription = `Edit save test ${Date.now()}`;
            const updatedDescription = `${initialDescription} UPDATED`;

            await timesheetPage.addEntry({
                project: "Backend API v2",
                description: initialDescription,
                date: "2026-03-09",
                startTime: "09:00",
                endTime: "10:00",
            });
            await timesheetPage.clickEntryByDescription(initialDescription);
            await editTimeEntryModal.verifyModalOpen();
            await editTimeEntryModal.editFields({
                description: updatedDescription,
                endTime: "11:00",
            });
            await editTimeEntryModal.save();
            await editTimeEntryModal.verifyModalClosed();
            await timesheetPage.verifyEntryInDayGroup(updatedDescription);
            await timesheetPage.verifyEntryRowContains(updatedDescription, "11:00");
        });

    test("TEM-34 | Edit entry — cancel discards changes",
        {
            annotation: {
                type: "test case",
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/34`,
            },
        },
        async ({ loginPage, timesheetPage, editTimeEntryModal }) => {
            await allure.description("Verify that clicking Cancel in the edit modal closes it without saving any changes.");
            await allure.severity("critical");
            await allure.tag("timesheet");
            await allure.tag("modal");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await timesheetPage.goTo();

            const originalDescription = `Cancel test ${Date.now()}`;
            const changedDescription = `${originalDescription} CHANGED`;

            await timesheetPage.addEntry({
                project: "Backend API v2",
                description: originalDescription,
                date: "2026-03-09",
                startTime: "09:00",
                endTime: "10:00",
            });
            await timesheetPage.clickEntryByDescription(originalDescription);
            await editTimeEntryModal.verifyModalOpen();
            await editTimeEntryModal.editFields({ description: changedDescription });
            await editTimeEntryModal.cancel();
            await editTimeEntryModal.verifyModalClosed();
            await timesheetPage.verifyEntryInDayGroup(originalDescription);
        });

});

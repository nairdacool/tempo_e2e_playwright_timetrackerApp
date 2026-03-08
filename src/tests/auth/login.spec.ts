import { test } from "@fixtures/index";
import { users } from "@data/users";
import * as allure from "allure-js-commons";

test.describe("TC-AUTH — Authentication", () => {

    test("TEM-1 | Successful login with valid credentials",
        {
            annotation: {
                type: 'test case',
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/1`,
            },
        },
        async ({ loginPage }) => {
            await allure.description("Verify that a user can log in with valid credentials and is redirected to the dashboard.");
            await allure.severity("critical");
            await allure.tag("authentication");
            await allure.tag("smoke");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
        });

    test("TEM-2 | Login with invalid password",
        {
            annotation: {
                type: 'test case',
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/2`,
            },
        },
        async ({ loginPage }) => {
            await allure.description("Verify that a user cannot log in with an invalid password and an error message is displayed.");
            await allure.severity("critical");
            await allure.tag("authentication");
            await allure.tag("negative");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.loginWithInvalidCredentials(users.invalidPassword.username, users.invalidPassword.password);
        });

    test("TEM-3 | Login with unregistered email",
        {
            annotation: {
                type: 'test case',
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/3`,
            },
        },
        async ({ loginPage }) => {
            await allure.description("Verify that a user cannot log in with an unregistered email and an error message is displayed.");
            await allure.severity("critical");
            await allure.tag("authentication");
            await allure.tag("negative");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.loginWithInvalidCredentials(users.unregisteredEmail.username, users.unregisteredEmail.password);
        });

    test("TEM-4 | Sign up — new account",
        {
            annotation: {
                type: 'test case',
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/4`,
            },
        },
        async ({ loginPage }) => {
            await allure.description("Verify that a new user can create an account and is redirected to the dashboard.");
            await allure.severity("critical");
            await allure.tag("authentication");
            await allure.tag("smoke");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.signUp(
                users.newAccount.name,
                users.newAccount.organization,
                users.newAccount.username,
                users.newAccount.password,
            );
        });

    test("TEM-5 | Sign up — duplicate email",
        {
            annotation: {
                type: 'test case',
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/5`,
            },
        },
        async ({ loginPage }) => {
            await allure.description("Verify that signing up with an already registered email displays a duplicate email error.");
            await allure.severity("critical");
            await allure.tag("authentication");
            await allure.tag("negative");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.signUpWithError(
                users.duplicateEmail.name,
                users.duplicateEmail.organization,
                users.duplicateEmail.username,
                users.duplicateEmail.password,
            );
        });

    test("TEM-6 | Toggle between login and sign-up",
        {
            annotation: {
                type: 'test case',
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/6`,
            },
        },
        async ({ loginPage }) => {
            await allure.description("Verify that clicking the toggle button switches the form between login and sign-up modes.");
            await allure.severity("normal");
            await allure.tag("authentication");
            await allure.tag("smoke");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.toggleMode();
            await loginPage.verifySignUpMode();
            await loginPage.toggleMode();
            await loginPage.verifyLoginMode();
        });

    test("TEM-7 | Forgot password link",
        {
            annotation: {
                type: 'test case',
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/7`,
            },
        },
        async ({ loginPage }) => {
            await allure.description("Verify that clicking the forgot password link displays the reset password form with an email field and submit button.");
            await allure.severity("normal");
            await allure.tag("authentication");
            await allure.tag("smoke");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.forgotPassword(users.passwordRecovery.username);
        });

    test("TEM-8 | Session persistence",
        {
            annotation: {
                type: 'test case',
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/8`,
            },
        },
        async ({ loginPage }) => {
            await allure.description("Verify that an authenticated user remains logged in after closing and reopening the app.");
            await allure.severity("critical");
            await allure.tag("authentication");
            await allure.tag("smoke");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await loginPage.verifySessionPersists();
        });

    test("TEM-9 | Sign out from sidebar",
        {
            annotation: {
                type: 'test case',
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/9`,
            },
        },
        async ({ loginPage, sidebarPage }) => {
            await allure.description("Verify that a logged-in user can sign out from the sidebar and is redirected to the login page.");
            await allure.severity("critical");
            await allure.tag("authentication");
            await allure.tag("smoke");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.login(users.valid.username, users.valid.password);
            await sidebarPage.verifyLoggedInUser(users.valid.displayName);
            await sidebarPage.signOut();
        });

    test("TEM-10 | Deactivated account blocked",
        {
            annotation: {
                type: 'test case',
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/10`,
            },
        },
        async ({ loginPage }) => {
            await allure.description("Verify that a deactivated account cannot log in and an appropriate error message is displayed.");
            await allure.severity("critical");
            await allure.tag("authentication");
            await allure.tag("negative");
            await allure.owner("QA Team");

            await loginPage.goTo();
            await loginPage.loginDeactivatedAccount(users.deactivated.username, users.deactivated.password);
        });

    test("TEM-11 | Unauthenticated redirect",
        {
            annotation: {
                type: 'test case',
                description: `${process.env.QAS_URL}/project/${process.env.QAS_PROJECT_CODE}/tcase/11`,
            },
        },
        async ({ loginPage }) => {
            await allure.description("Verify that accessing a protected route without a session redirects the user to the login page.");
            await allure.severity("critical");
            await allure.tag("authentication");
            await allure.tag("smoke");
            await allure.owner("QA Team");

            await loginPage.verifyUnauthenticatedRedirect();
        });

});

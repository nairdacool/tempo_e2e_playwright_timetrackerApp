import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";
import { ErrorMessages, SuccessMessages } from "@data/messages";

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.getByTestId("input-email");
  private readonly passwordInput = this.page.getByTestId("input-password");
  private readonly loginButton = this.page.getByTestId("btn-submit");
  private readonly signUpButton = this.page.getByTestId("btn-toggle-mode");
  private readonly fullNameInput = this.page.getByTestId("input-name");
  private readonly organizationInput = this.page.getByTestId("input-organization");
  private readonly signUpHeading = this.page.getByText("Create your account");
  private readonly loginHeading = this.page.getByText("Welcome back");
  private readonly forgotPasswordLink = this.page.getByTestId("btn-forgot-password");
  private readonly resetPasswordHeading = this.page.getByText("Reset your password");
  

  constructor(page: Page) {
    super(page);
  }

  async goTo() {
    await allure.step("Navigate to the login page", async () => {
      await this.page.goto('/');
    });
  }

  async verifyUnauthenticatedRedirect() {
    await allure.step("Access the dashboard directly without a session", async () => {
      await this.page.goto('/dashboard');
    });
    await allure.step("Verify redirect to login page", async () => {
      await expect(this.page).toHaveURL("/");
      await expect(this.loginHeading).toBeVisible();
    });
  }

  async toggleMode() {
    await allure.step("Click toggle mode button", async () => {
      await this.signUpButton.click();
    });
  }

  async verifySignUpMode() {
    await allure.step("Verify sign-up form is displayed", async () => {
      await expect(this.signUpHeading).toBeVisible();
      await expect(this.fullNameInput).toBeVisible();
      await expect(this.organizationInput).toBeVisible();
    });
  }

  async verifyLoginMode() {
    await allure.step("Verify login form is displayed", async () => {
      await expect(this.loginHeading).toBeVisible();
      await expect(this.fullNameInput).not.toBeVisible();
      await expect(this.organizationInput).not.toBeVisible();
    });
  }

  async forgotPassword(username: string) {
    await allure.step("Click the forgot password link", async () => {
      await this.forgotPasswordLink.click();
    });
    await allure.step("Verify reset password form is displayed", async () => {
      await expect(this.resetPasswordHeading).toBeVisible();
      await expect(this.usernameInput).toBeVisible();
      await expect(this.loginButton).toBeVisible();
    });
    await allure.step("Enter email", async () => {
      await this.usernameInput.fill(username);
    });
    await allure.step("Click the submit button", async () => {
      await this.loginButton.click();
    });
    await allure.step("Verify password reset email sent message is displayed", async () => {
      await expect(this.page.getByText(SuccessMessages.passwordResetEmailSent)).toBeVisible();
    });
  }

  async verifySessionPersists() {
    await allure.step("Close the current tab", async () => {
      await this.page.close();
    });
    const newPage = await allure.step("Reopen the app in a new tab", async () => {
      return await this.page.context().newPage();
    });
    await allure.step("Navigate to the app", async () => {
      await newPage.goto('/');
    });
    await allure.step("Verify user stays authenticated", async () => {
      await expect(newPage).toHaveURL(/dashboard/);
    });
  }

  async login(username: string, password: string) {
    await allure.step("Enter username", async () => {
      await this.usernameInput.fill(username);
    });
    await allure.step("Enter password", async () => {
      await this.passwordInput.fill(password);
    });
    await allure.step("Click the login button", async () => {
      await this.loginButton.click();
    });
    await allure.step("Verify redirect to dashboard", async () => {
      await expect(this.page).toHaveURL(/dashboard/);
    });
  }

  async signUp(name: string, organization: string, username: string, password: string) {
    await allure.step("Toggle to sign up mode", async () => {
      await this.signUpButton.click();
    });
    await allure.step("Enter full name", async () => {
      await this.fullNameInput.fill(name);
    });
    await allure.step("Enter organization", async () => {
      await this.organizationInput.fill(organization);
    });
    await allure.step("Enter email", async () => {
      await this.usernameInput.fill(username);
    });
    await allure.step("Enter password", async () => {
      await this.passwordInput.fill(password);
    });
    await allure.step("Click the submit button", async () => {
      await this.loginButton.click();
    });
    await allure.step("Verify redirect to dashboard", async () => {
      await expect(this.page).toHaveURL(/dashboard/);
    });
  }

  async signUpWithError(name: string, organization: string, username: string, password: string) {
    await allure.step("Toggle to sign up mode", async () => {
      await this.signUpButton.click();
    });
    await allure.step("Enter full name", async () => {
      await this.fullNameInput.fill(name);
    });
    await allure.step("Enter organization", async () => {
      await this.organizationInput.fill(organization);
    });
    await allure.step("Enter email", async () => {
      await this.usernameInput.fill(username);
    });
    await allure.step("Enter password", async () => {
      await this.passwordInput.fill(password);
    });
    await allure.step("Click the submit button", async () => {
      await this.loginButton.click();
    });
    await allure.step("Verify error message is displayed", async () => {
      await expect(this.page.getByText(ErrorMessages.userAlreadyRegistered)).toBeVisible();
    });
  }

  async loginWithInvalidCredentials(username: string, password: string) {
    await allure.step("Enter username", async () => {
      await this.usernameInput.fill(username);
    });
    await allure.step("Enter password", async () => {
      await this.passwordInput.fill(password);
    });
    await allure.step("Click the login button", async () => {
      await this.loginButton.click();
    });
    await allure.step("Verify error message is displayed", async () => {
      await expect(this.page.getByText(ErrorMessages.invalidLoginCredentials)).toBeVisible();
    });
  }

  async loginDeactivatedAccount(username: string, password: string) {
    await allure.step("Enter username", async () => {
      await this.usernameInput.fill(username);
    });
    await allure.step("Enter password", async () => {
      await this.passwordInput.fill(password);
    });
    await allure.step("Click the login button", async () => {
      await this.loginButton.click();
    });
    await allure.step("Verify deactivated account error message is displayed", async () => {
      await expect(this.page.getByText(ErrorMessages.accountDeactivated)).toBeVisible();
    });
    await allure.step("Verify user remains on the login page", async () => {
      await expect(this.page).toHaveURL("/");
    });
  }

}
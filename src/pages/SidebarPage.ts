import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

export class SidebarPage extends BasePage {
  private readonly userProfileButton = this.page.getByTestId("btn-user-profile");
  private readonly signOutButton = this.page.getByTestId("btn-sign-out");

  constructor(page: Page) {
    super(page);
  }

  async verifyLoggedInUser(displayName: string) {
    await allure.step(`Verify logged-in user name is "${displayName}"`, async () => {
      await expect(this.userProfileButton).toBeVisible();
      await expect(this.userProfileButton).toContainText(displayName);
    });
  }

  async signOut() {
    await allure.step("Click sign out button", async () => {
      await this.signOutButton.click();
    });
    await allure.step("Verify redirect to login page", async () => {
      await expect(this.page).toHaveURL("/");
    });
  }
}

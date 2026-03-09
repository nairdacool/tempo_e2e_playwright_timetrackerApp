import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

export type NavItem = {
  testId: string;
  label: string;
  urlPath: string;
};

export const navItems: NavItem[] = [
  { testId: "nav-item-dashboard",     label: "Dashboard",     urlPath: "dashboard"     },
  { testId: "nav-item-timesheet",     label: "Timesheet",     urlPath: "timesheet"     },
  { testId: "nav-item-projects",      label: "Projects",      urlPath: "projects"      },
  { testId: "nav-item-reports",       label: "Reports",       urlPath: "reports"       },
  { testId: "nav-item-approvals",     label: "Approvals",     urlPath: "approvals"     },
  { testId: "nav-item-team",          label: "Team",          urlPath: "team"          },
  { testId: "nav-item-organizations", label: "Organizations", urlPath: "organizations" },
];

export class SidebarPage extends BasePage {
  private readonly userProfileButton = this.page.getByTestId("btn-user-profile");
  private readonly signOutButton = this.page.getByTestId("btn-sign-out");
  private readonly settingsHeading = this.page.getByText("Settings", { exact: true });
  private readonly adminOnlyNavItems = [
    this.page.getByTestId("nav-item-organizations"),
    this.page.getByTestId("nav-item-team"),
    this.page.getByTestId("nav-item-approvals"),
  ];
  private navItem = (testId: string) => this.page.getByTestId(testId);

  constructor(page: Page) {
    super(page);
  }

  async verifyLoggedInUser(displayName: string) {
    await allure.step(`Verify logged-in user name is "${displayName}"`, async () => {
      await expect(this.userProfileButton).toBeVisible();
      await expect(this.userProfileButton).toContainText(displayName);
    });
  }

  async navigateToSettings() {
    await allure.step("Click user profile button", async () => {
      await this.userProfileButton.click();
    });
    await allure.step("Verify URL contains settings", async () => {
      await expect(this.page).toHaveURL(/settings/);
    });
    await allure.step("Verify Settings title is visible", async () => {
      await expect(this.settingsHeading).toBeVisible();
    });
  }

  async verifyAdminOnlyNavHidden() {
    await allure.step("Verify Organizations nav item is not visible", async () => {
      await expect(this.adminOnlyNavItems[0]).not.toBeVisible();
    });
    await allure.step("Verify Team nav item is not visible", async () => {
      await expect(this.adminOnlyNavItems[1]).not.toBeVisible();
    });
    await allure.step("Verify Approvals nav item is not visible", async () => {
      await expect(this.adminOnlyNavItems[2]).not.toBeVisible();
    });
  }

  async navigateToAndVerify(item: NavItem) {
    await allure.step(`Navigate to ${item.label}`, async () => {
      await this.navItem(item.testId).click();
    });
    await allure.step(`Verify URL contains "${item.urlPath}"`, async () => {
      await expect(this.page).toHaveURL(new RegExp(item.urlPath));
    });
    await allure.step(`Verify "${item.label}" module header is visible`, async () => {
      await expect(
        this.page.locator("div").filter({ hasText: item.label }).first()
      ).toBeVisible();
    });
  }

  async navigateAndVerifyActive(item: NavItem) {
    await allure.step(`Click "${item.label}" nav item`, async () => {
      await this.navItem(item.testId).click();
    });
    await allure.step(`Verify "${item.label}" nav item is highlighted as active`, async () => {
      await expect(this.navItem(item.testId)).toHaveAttribute("style", /var\(--accent\)/);
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

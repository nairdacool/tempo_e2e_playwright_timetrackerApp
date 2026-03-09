import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

export class TimesheetPage extends BasePage {
  private readonly timesheetContainer = this.page.getByTestId("timesheet-page");
  private readonly weekNavigator      = this.page.getByTestId("week-navigator");

  async goTo() {
    await allure.step("Navigate to /timesheet", async () => {
      await this.page.goto(`${process.env.BASE_URL}timesheet`);
    });
  }

  async verifyPageLoaded() {
    await allure.step("Verify timesheet page container is visible", async () => {
      await expect(this.timesheetContainer).toBeVisible();
    });
    await allure.step("Verify week navigator is visible", async () => {
      await expect(this.weekNavigator).toBeVisible();
    });
  }
}

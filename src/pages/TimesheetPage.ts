import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

export class TimesheetPage extends BasePage {
  private readonly timesheetContainer  = this.page.getByTestId("timesheet-page");
  private readonly weekNavigator       = this.page.getByTestId("week-navigator");
  private readonly projectSelect       = this.page.getByTestId("select-project");
  private readonly descriptionInput    = this.page.getByTestId("input-description");
  private readonly dateInput           = this.page.getByTestId("input-date");
  private readonly startTimeInput      = this.page.getByTestId("input-start-time");
  private readonly endTimeInput        = this.page.getByTestId("input-end-time");
  private readonly addEntryButton      = this.page.getByTestId("btn-add-entry");

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

  async addEntry({ project, description, date, startTime, endTime }: {
    project: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
  }) {
    await allure.step(`Select project "${project}"`, async () => {
      await this.projectSelect.selectOption({ label: project });
    });
    await allure.step(`Fill description "${description}"`, async () => {
      await this.descriptionInput.fill(description);
    });
    await allure.step(`Set date to ${date}`, async () => {
      await this.dateInput.fill(date);
      await this.dateInput.press("Tab");
    });
    await allure.step(`Set start time to ${startTime}`, async () => {
      await this.startTimeInput.fill(startTime);
    });
    await allure.step(`Set end time to ${endTime}`, async () => {
      await this.endTimeInput.fill(endTime);
      await this.endTimeInput.press("Tab");
    });
    await allure.step("Click Add Entry button", async () => {
      await this.addEntryButton.click();
    });
  }

  async verifyEntryInDayGroup(description: string) {
    await allure.step(`Verify entry "${description}" appears in the day group`, async () => {
      await expect(
        this.timesheetContainer.getByText(description, { exact: true }).first()
      ).toBeVisible();
    });
  }

  async verifyAddEntryButtonDisabled() {
    await allure.step("Verify Add Entry button is disabled when no project is selected", async () => {
      await expect(this.addEntryButton).toBeDisabled();
    });
  }

  async fillEntryTimesInvalidRange(startTime: string, endTime: string) {
    await allure.step(`Set start time to ${startTime}`, async () => {
      await this.startTimeInput.fill(startTime);
    });
    await allure.step(`Set end time to ${endTime} (before start — invalid range)`, async () => {
      await this.endTimeInput.fill(endTime);
      await this.endTimeInput.press("Tab");
    });
  }

  async clickEntryByDescription(description: string) {
    await allure.step(`Click entry with description "${description}"`, async () => {
      await this.timesheetContainer
        .locator('[data-testid^="time-entry-row"]')
        .filter({ hasText: description })
        .first()
        .click();
    });
  }

  async verifyEntryRowContains(description: string, text: string) {
    await allure.step(`Verify entry "${description}" row contains "${text}"`, async () => {
      await expect(
        this.timesheetContainer
          .locator('[data-testid^="time-entry-row"]')
          .filter({ hasText: description })
          .first()
      ).toContainText(text);
    });
  }
}

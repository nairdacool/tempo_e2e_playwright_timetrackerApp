import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

type StatCard = { label: string };

const statCards: StatCard[] = [
  { label: "Team This Week" },
  { label: "Team This Month" },
  { label: "Active Projects" },
  { label: "Pending Approvals" },
];

export class DashboardPage extends BasePage {
  private readonly dashboardContainer    = this.page.getByTestId("dashboard-page");
  private readonly viewAllEntriesLink    = this.page.getByTestId("btn-view-all-entries");
  private readonly recentEntriesTable    = this.page.locator("tbody");
  private readonly quickActionTimesheet  = this.page.getByTestId("btn-quick-action-timesheet");
  private readonly quickActionProjects   = this.page.getByTestId("btn-quick-action-projects");
  private readonly quickActionReports    = this.page.getByTestId("btn-quick-action-reports");
  private readonly quickActionApprovals  = this.page.getByTestId("btn-quick-action-approvals");
  private readonly timerWidget           = this.page.getByTestId("timer-widget");
  private readonly timerProjectSelect    = this.page.getByTestId("select-timer-project");
  private readonly timerDescriptionInput = this.page.getByTestId("input-timer-description");
  private readonly timerStartButton      = this.page.getByTestId("btn-timer-start");
  private readonly timerStopButton       = this.page.getByTestId("btn-timer-stop");

  async startTimer(description: string) {
    await allure.step("Fill timer description", async () => {
      await this.timerDescriptionInput.fill(description);
    });
    await allure.step("Click Start timer button", async () => {
      await this.timerStartButton.click();
    });
  }

  async verifyTimerRunning() {
    await allure.step("Verify Stop button is visible (timer running)", async () => {
      await expect(this.timerStopButton).toBeVisible();
    });
    await allure.step("Verify timer is counting (displays seconds)", async () => {
      await expect(this.timerWidget).toContainText(/:/);
    });
  }

  async stopTimer() {
    await allure.step("Wait 3 seconds for timer to run", async () => {
      await this.page.waitForTimeout(3000);
    });
    await allure.step("Click Stop timer button", async () => {
      await this.timerStopButton.click();
    });
  }

  async verifyQuickActionsVisible() {
    await allure.step("Verify Quick Actions section is visible", async () => {
      await expect(this.quickActionTimesheet).toBeVisible();
      await expect(this.quickActionProjects).toBeVisible();
      await expect(this.quickActionReports).toBeVisible();
      await expect(this.quickActionApprovals).toBeVisible();
    });
  }

  async clickQuickActionTimesheet() {
    await allure.step("Click Quick Action — Timesheet button", async () => {
      await this.quickActionTimesheet.click();
    });
    await allure.step("Verify URL navigates to /timesheet", async () => {
      await expect(this.page).toHaveURL(/timesheet/);
    });
  }

  async clickQuickActionProjects() {
    await allure.step("Click Quick Action — Projects button", async () => {
      await this.quickActionProjects.click();
    });
    await allure.step("Verify URL navigates to /projects", async () => {
      await expect(this.page).toHaveURL(/projects/);
    });
  }

  async clickQuickActionReports() {
    await allure.step("Click Quick Action — Reports button", async () => {
      await this.quickActionReports.click();
    });
    await allure.step("Verify URL navigates to /reports", async () => {
      await expect(this.page).toHaveURL(/reports/);
    });
  }

  async clickQuickActionApprovals() {
    await allure.step("Click Quick Action — Approvals button", async () => {
      await this.quickActionApprovals.click();
    });
    await allure.step("Verify URL navigates to /approvals", async () => {
      await expect(this.page).toHaveURL(/approvals/);
    });
  }

  async verifyEmptyState() {
    await allure.step("Verify empty state message is shown", async () => {
      await expect(
        this.page.getByText("No entries yet — log your first hour", { exact: true })
      ).toBeVisible();
    });
  }

  async clickLogYourFirstHour() {
    await allure.step("Click 'log your first hour' CTA link", async () => {
      await this.page.getByText("log your first hour", { exact: true }).click();
    });
    await allure.step("Verify URL navigates to /timesheet", async () => {
      await expect(this.page).toHaveURL(/timesheet/);
    });
  }

  async clickEntryByMember(memberName: string) {
    await allure.step(`Click Recent Team Entry row for member "${memberName}"`, async () => {
      const row = this.recentEntriesTable
        .locator("tr")
        .filter({ hasText: memberName })
        .first();
      await expect(row).toBeVisible();
      await row.click();
    });
  }

  async clickViewAllEntries() {
    await allure.step("Click 'View all entries' link", async () => {
      await this.viewAllEntriesLink.click();
    });
    await allure.step("Verify URL navigates to Timesheet page", async () => {
      await expect(this.page).toHaveURL(/timesheet/);
    });
  }

  async verifyStatCards() {
    for (const { label } of statCards) {
      await allure.step(`Verify "${label}" label is visible`, async () => {
        await expect(
          this.dashboardContainer.getByText(label, { exact: true }).first()
        ).toBeVisible();
      });
      await allure.step(`Verify "${label}" card shows a numeric value`, async () => {
        const card = this.dashboardContainer
          .locator("div")
          .filter({ hasText: label })
          .filter({ hasText: /\d/ })
          .last();
        await expect(card).toBeVisible();
      });
    }
  }
}

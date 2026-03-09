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
  private readonly dashboardContainer = this.page.getByTestId("dashboard-page");

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

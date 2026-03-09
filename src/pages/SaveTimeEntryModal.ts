import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

export class SaveTimeEntryModal extends BasePage {
  private readonly modal = this.page.getByTestId("modal-time-entry");

  async verifyModalOpen() {
    await allure.step("Verify Save Time Entry modal is displayed after stopping timer", async () => {
      await expect(this.modal).toBeVisible();
    });
  }
}

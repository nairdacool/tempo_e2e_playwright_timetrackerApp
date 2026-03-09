import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

export class EditTimeEntryModal extends BasePage {
  private readonly modal          = this.page.getByTestId("modal-time-entry");
  private readonly projectSelect  = this.page.getByTestId("select-project");
  private readonly descriptionInput = this.page.getByTestId("input-description");
  private readonly dateInput      = this.page.getByTestId("input-date");
  private readonly startTimeInput = this.page.getByTestId("input-start-time");
  private readonly endTimeInput   = this.page.getByTestId("input-end-time");

  async verifyModalOpen() {
    await allure.step("Verify Edit Time Entry modal is visible", async () => {
      await expect(this.modal).toBeVisible();
    });
  }

  async verifyFieldsPopulated() {
    await allure.step("Verify Project field is populated", async () => {
      await expect(this.projectSelect).toBeVisible();
      const value = await this.projectSelect.inputValue();
      expect(value.trim()).not.toBe("");
    });
    await allure.step("Verify Description field is populated", async () => {
      await expect(this.descriptionInput).toBeVisible();
      const value = await this.descriptionInput.inputValue();
      expect(value.trim()).not.toBe("");
    });
    await allure.step("Verify Date field is populated", async () => {
      await expect(this.dateInput).toBeVisible();
      const value = await this.dateInput.inputValue();
      expect(value.trim()).not.toBe("");
    });
    await allure.step("Verify Start Time field is populated", async () => {
      await expect(this.startTimeInput).toBeVisible();
      const value = await this.startTimeInput.inputValue();
      expect(value.trim()).not.toBe("");
    });
    await allure.step("Verify End Time field is populated", async () => {
      await expect(this.endTimeInput).toBeVisible();
      const value = await this.endTimeInput.inputValue();
      expect(value.trim()).not.toBe("");
    });
  }
}

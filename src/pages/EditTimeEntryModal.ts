import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as allure from "allure-js-commons";

export class EditTimeEntryModal extends BasePage {
  private readonly modal          = this.page.getByTestId("modal-time-entry");
  private readonly projectSelect  = this.page.getByTestId("modal-time-entry").getByTestId("select-project");
  private readonly descriptionInput = this.page.getByTestId("modal-time-entry").getByTestId("input-description");
  private readonly dateInput      = this.page.getByTestId("modal-time-entry").getByTestId("input-date");
  private readonly startTimeInput = this.page.getByTestId("modal-time-entry").getByTestId("input-start-time");
  private readonly endTimeInput   = this.page.getByTestId("modal-time-entry").getByTestId("input-end-time");

  private readonly saveButton = this.page.getByTestId("modal-time-entry").getByTestId("btn-save-entry");

  async verifyModalOpen() {
    await allure.step("Verify Edit Time Entry modal is visible", async () => {
      await expect(this.modal).toBeVisible();
    });
  }

  async verifyModalClosed() {
    await allure.step("Verify Edit Time Entry modal is closed", async () => {
      await expect(this.modal).toBeHidden();
    });
  }

  async editFields({ description, endTime }: { description?: string; endTime?: string }) {
    if (description !== undefined) {
      await allure.step(`Update description to "${description}"`, async () => {
        await this.descriptionInput.clear();
        await this.descriptionInput.fill(description);
      });
    }
    if (endTime !== undefined) {
      await allure.step(`Update end time to ${endTime}`, async () => {
        await this.endTimeInput.fill(endTime);
        await this.endTimeInput.press("Tab");
      });
    }
  }

  async save() {
    await allure.step("Click Save Entry button", async () => {
      await this.saveButton.click();
    });
  }

  async cancel() {
    await allure.step("Click Cancel button", async () => {
      await this.page.getByTestId("modal-time-entry").getByTestId("btn-cancel").click();
    });
  }

  async verifyFieldsMatch({ project, description, startTime, endTime }: {
    project: string;
    description: string;
    startTime: string;
    endTime: string;
  }) {
    await allure.step(`Verify Project field shows "${project}"`, async () => {
      const selectedText = await this.projectSelect.evaluate(
        (el: HTMLSelectElement) => el.options[el.selectedIndex]?.text ?? ""
      );
      expect(selectedText.trim()).toBe(project);
    });
    await allure.step(`Verify Description field shows "${description}"`, async () => {
      await expect(this.descriptionInput).toHaveValue(description);
    });
    await allure.step(`Verify Start Time field shows "${startTime}"`, async () => {
      await expect(this.startTimeInput).toHaveValue(startTime);
    });
    await allure.step(`Verify End Time field shows "${endTime}"`, async () => {
      await expect(this.endTimeInput).toHaveValue(endTime);
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

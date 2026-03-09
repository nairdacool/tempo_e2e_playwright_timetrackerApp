import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SidebarPage } from '@pages/SidebarPage';
import { DashboardPage } from '@pages/DashboardPage';
import { EditTimeEntryModal } from '@pages/EditTimeEntryModal';
import { TimesheetPage } from '@pages/TimesheetPage';
import { SaveTimeEntryModal } from '@pages/SaveTimeEntryModal';

type PageFixtures = {
  loginPage: LoginPage;
  sidebarPage: SidebarPage;
  dashboardPage: DashboardPage;
  editTimeEntryModal: EditTimeEntryModal;
  timesheetPage: TimesheetPage;
  saveTimeEntryModal: SaveTimeEntryModal;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  sidebarPage: async ({ page }, use) => {
    await use(new SidebarPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  editTimeEntryModal: async ({ page }, use) => {
    await use(new EditTimeEntryModal(page));
  },
  timesheetPage: async ({ page }, use) => {
    await use(new TimesheetPage(page));
  },
  saveTimeEntryModal: async ({ page }, use) => {
    await use(new SaveTimeEntryModal(page));
  },
});

export { expect } from '@playwright/test';
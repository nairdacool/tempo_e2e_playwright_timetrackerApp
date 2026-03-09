import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SidebarPage } from '@pages/SidebarPage';
import { DashboardPage } from '@pages/DashboardPage';

type PageFixtures = {
  loginPage: LoginPage;
  sidebarPage: SidebarPage;
  dashboardPage: DashboardPage;
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
});

export { expect } from '@playwright/test';
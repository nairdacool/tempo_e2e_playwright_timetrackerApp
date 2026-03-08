import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SidebarPage } from '@pages/SidebarPage';

type PageFixtures = {
  loginPage: LoginPage;
  sidebarPage: SidebarPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  sidebarPage: async ({ page }, use) => {
    await use(new SidebarPage(page));
  },
});

export { expect } from '@playwright/test';
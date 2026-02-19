import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './Playwright-Mini-Project-master/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [ 
    ['html'], 
   ['allure-playwright', {
    detail: true,
    outputFolder: 'allure-results',
    suitetitle: false
   }],
  ],
  timeout: 60*1000,
  
  use: {
    screenshot: 'only-on-failure',
     video: 'retain-on-failure',
     headless: false,
  },

  projects: [
    {
       name: 'chromium',
       use: { ...devices['Desktop chromium'] },
       
     },
 
  ],
});
// 1.npm i -D @playwright/test allure-playwright allure-commandline         
// 2.npx allure-commandline generate ".\allure-results" --clean -o ".\allure-report"  
// 3.npx allure open ".\allure-report"
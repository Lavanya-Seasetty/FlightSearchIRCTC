// pages/SearchResultsPage.ts
import { Page } from '@playwright/test';

export class SearchResultsPage {
  constructor(private readonly page: Page) {}

  async shortWait() {
    await this.page.waitForTimeout(5000);
  }

  async longWait() {
    await this.page.waitForTimeout(10 * 1000);
  }

  async verifyCitiesVisible() {
    await this.page.locator('#accordionrt-left').getByText('Hyderabad').first().isVisible();
    await this.page.locator('#accordionrt-left').getByText('Pune').first().isVisible();
    await this.page.locator('#accordionrt-right').getByText('Hyderabad').first().isVisible();
    await this.page.locator('#accordionrt-right').getByText('Pune').first().isVisible();
  }

  async verifyHeaderDates(todayFormatted: string, tomorrowFormatted: string) {
    const todayText = `| ${todayFormatted}`;
    const returnText = `| ${tomorrowFormatted}`;
    await this.page.getByText(todayText).isVisible();
    await this.page.getByText(returnText).isVisible();
  }

  flightsLocator() {
    return this.page.locator('div.right-searchbarbtm.p-0');
  }

  async countFlights(): Promise<number> {
    return await this.flightsLocator().count();
  }

  async logFlightNames() {
    const flights = this.flightsLocator();
    const count = await flights.count();
    console.log('Number of flights:', count);
    for (let i = 0; i < count; i++) {
      const flightName = await flights.nth(i).locator('span').nth(1).innerText();
      console.log(`Flight ${i + 1}: ${flightName}`);
    }
  }
}
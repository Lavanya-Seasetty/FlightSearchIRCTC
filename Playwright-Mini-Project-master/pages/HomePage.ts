// pages/HomePage.ts
import { Page, expect } from '@playwright/test';
import data from '../testData/data.json';

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('https://www.air.irctc.co.in/', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveTitle('Best Domestic & International Flight Booking Website');
  }

  async selectOrigin() {
    await this.page.getByRole('textbox', { name: 'Origin' }).click();
    await this.page.getByText(`${data.origin}`).click();
  }

  async selectDestination() {
    await this.page.locator(`//*[contains(text(), "${data.destination}")]`).nth(1).click();
  }

  async openDepartureDate() {
    await this.page.locator('#originDate').click();
  }

  depRoot() {
    return this.page.locator('div.datepicker.rdeparturedate.no-border:visible').first();
  }

  async ensureDepRootVisible() {
    const depRoot = this.depRoot();
    await expect(depRoot).toBeVisible({ timeout: 10*1000 });
  }

  async selectDepartureMonthRow(todayMonthLong: string, year1: string) {
    const depRoot = this.depRoot();
    await depRoot
      .locator(`.date-table-right tr:has(span.ML-Month:has-text("${todayMonthLong}")):has(sub:has-text("${year1}"))`)
      .first()
      .click();
  }

  async selectDepartureDay(day: string) {
    const depRoot = this.depRoot();
    await depRoot
      .locator(`xpath=.//td[contains(@class,'date')]//span[contains(@class,'act')][normalize-space(text()[1])='${day}']`)
      .first()
      .click();
  }

  async openReturnDate() {
    await this.page.locator('#returnDate').click();
  }

  returnRoot() {
    return this.page.locator('div.datepicker.returnDate.no-border:visible').first();
  }

  async selectReturnMonth(tommorowMonthLong: string) {
    const returnRoot = this.returnRoot();
    await returnRoot
      .locator('.date-table-right span.ML-Month.d-none.d-md-block')
      .filter({ hasText: tommorowMonthLong })
      .first()
      .click();
  }

  async selectReturnDay(tomorrow: string) {
    const returnRoot = this.returnRoot();
    await returnRoot
      .locator('.datepicker-days td.date span')
      .filter({ hasText: tomorrow })
      .first()
      .click();
  }

  async TravellerAndSelectBusiness() {
    await this.page.locator('#Traveller-Economy').click();
    await this.page.locator('#travelClass').selectOption(`${data.travelClass}`);
  }

  async clickSearch() {
    await this.page.getByRole('button', { name: 'Search ' }).click();
  }
}

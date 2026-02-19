// pages/components/DatePicker.ts
import { Locator, Page, expect } from '@playwright/test';

export class DatePicker {
  private readonly root: Locator;

  constructor(page: Page, rootSelector: string) {
    this.root = page.locator(`${rootSelector}:visible`).first();
  }

  async expectVisible(timeout = 10*1000) {
    await expect(this.root).toBeVisible({ timeout });
  }

  async selectMonthYear(monthLong: string, year: string) {
    // Matches the month row with month and year on the RIGHT grid 
    const monthRow = this.root
      .locator(`.date-table-right tr:has(span.ML-Month:has-text("${monthLong}")):has(sub:has-text("${year}"))`)
      .first();
    await monthRow.click();
  }

  async selectDay(day: string) {
    await this.root
      .locator(`xpath=.//td[contains(@class,'date')]//span[contains(@class,'act')][normalize-space(text()[1])='${day}']`)
      .first()
      .click();
  }

  async selectReturnMonth(monthLong: string) {
    await this.root
      .locator('.date-table-right span.ML-Month.d-none.d-md-block')
      .filter({ hasText: monthLong })
      .first()
      .click();
  }

  async selectReturnDay(day: string) {
    await this.root
      .locator('.datepicker-days td.date span')
      .filter({ hasText: day })
      .first()
      .click();
  }
}
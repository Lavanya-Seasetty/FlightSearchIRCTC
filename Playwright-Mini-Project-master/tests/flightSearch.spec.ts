// tests/irctc.spec.ts
import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { formatDate } from '../utils/dateUtils';

test("Flight Search", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const home = new HomePage(page);
  const results = new SearchResultsPage(page);

  await home.goto();

  // Origin & Destination 
  await home.selectOrigin();
  await home.selectDestination();

  // Dates
  const today = new Date();
  const day = today.getDate().toString();
  const year1 = String(today.getFullYear());
  const todayMonthLong = today.toLocaleString('en-US', { month: 'long' });

  await home.openDepartureDate();
  await home.ensureDepRootVisible();
  await home.selectDepartureMonthRow(todayMonthLong, year1);
  await home.selectDepartureDay(day);

  await home.openReturnDate();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(today.getDate() + 1);
  const tomorrow = tomorrowDate.getDate().toString();
  const tommorowMonthLong = tomorrowDate.toLocaleString('en-US', { month: 'long' });
  const year = String(tomorrowDate.getFullYear());

  await home.selectReturnMonth(tommorowMonthLong);
  await home.selectReturnDay(tomorrow);

  await home.TravellerAndSelectBusiness();
  await home.clickSearch();

  await results.shortWait();

  await results.verifyCitiesVisible();

  await results.longWait();

  const todayFormatted = formatDate(today);
  const tomorrowFormatted = formatDate(tomorrowDate);

  //verifying the dates
  await results.verifyHeaderDates(todayFormatted, tomorrowFormatted);

  //displaying the flight names in console
  await results.logFlightNames();

  await page.screenshot({ path: 'output/results.png', fullPage: true });
});
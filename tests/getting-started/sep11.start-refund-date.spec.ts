import {
  test,
  expect,
  BrowserUtility,
} from "../../utilities/sep-test-utilities";
import { productInfo } from "../../utilities/qa-data-reader";
import { StartApplicationPage } from "../../pages/StartApplicationPage";

test.describe("SEP11 - Start Application - Program & refund dates @sep11", () => {
  // =========================================================
  // AC1 - Start date and refund date are visible on Step 1 for "Test Automation with Selenium"
  // =========================================================
  test("Program and refund dates are visible @sep11-1", async ({ page }) => {
    const startApplicationPage = new StartApplicationPage(page);

    await expect(startApplicationPage.programStartDate).toBeVisible();
    await expect(startApplicationPage.refundEndDate).toBeVisible();
  });

  // =========================================================
  // AC2 - Dates shown on the page match the expected values from test data
  // =========================================================
  test("Program and refund dates match expected QA data @sep11-2", async ({
    page,
  }) => {
    const startApplicationPage = new StartApplicationPage(page);

    // Clean the UI text before comparison
    const actualStartDate = await BrowserUtility.cleanText(
      startApplicationPage.programStartDate
    );
    const actualRefundDate = await BrowserUtility.cleanText(
      startApplicationPage.refundEndDate
    );

    const expectedStartDate = String(productInfo.startDate).trim();
    const expectedRefundDate = String(productInfo.refundDate).trim();

    expect(actualStartDate).toBe(expectedStartDate);
    expect(actualRefundDate).toBe(expectedRefundDate);
  });
});
import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";
import { productInfo } from "../../utilities/qa-data-reader";

test.describe("Progrm start date and refund date", () => {

  let starteAppPage: StartApplicationPage;

  test.beforeEach(async ({ page }) => {
    starteAppPage = new StartApplicationPage(page);
  });

  test("Verify program start date and refund date are displayed", async ({page}) => {
    await expect(starteAppPage.programStartDate).toBeVisible();
    await expect(starteAppPage.refundEndDate).toBeVisible();
  });

  test("Verify the displayed start date and refund date are correct", async ({page}) => {
    const startAppPage = new StartApplicationPage(page);

    const ACTUAL_START_DATE = await startAppPage.programStartDate.innerText();
    const EXPECTED_START_DATE = productInfo.startDate;

    const ACTUAL_REFUND_DATE = await startAppPage.refundEndDate.innerText();
    const EXPECTED_REFUND_DATE = productInfo.refundDate;

    expect(ACTUAL_START_DATE).toBe(EXPECTED_START_DATE);
    expect(ACTUAL_REFUND_DATE).toBe(EXPECTED_REFUND_DATE);
  });
});

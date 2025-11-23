import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";

test.describe("Pay button on review payment page", () => {

    let reviewPaymentPage: ReviewPaymentPage;

    test.beforeEach(async ({ page }) => {
        reviewPaymentPage = new ReviewPaymentPage(page);
        await CommonUI.completeStartApplicationForm(page);
        await CommonUI.completeSelectingPaymentPlan(page, "upfront");
    });

    test('Verify that the pay button is displayed', async ({page}) => {
      await expect(reviewPaymentPage.payButton).toBeVisible();
    });

    test('Verify that the pay button is disabled by default', async ({page}) => {
        await expect(reviewPaymentPage.payButton).toBeDisabled();
    });
});
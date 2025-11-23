import { test, expect } from "../../utilities/sep-test-utilities";
import { CommonUI } from "../../utilities/sep-test-utilities";
import { PaymentPlanPage } from "../../pages/PaymentPlanPage";

test.describe("Next button on selecting payment page", () => {
    let paymentPlanPage: PaymentPlanPage;

    test.beforeEach(async ({ page }) => {
        paymentPlanPage = new PaymentPlanPage(page);
        await CommonUI.completeStartApplicationForm(page, "Muhtar", "M", "muhtar.mahmoud@example.com", "1234567890");
    });

    test('Verify that the next button is displayed', async ({page}) => {
        await expect(paymentPlanPage.inactiveNextButton).toBeVisible();
    });

    test('Verify that the next button is disabled by default', async ({page}) => {
        await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
    });
});
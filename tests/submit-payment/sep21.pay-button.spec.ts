import { test, expect, goToStep3 } from "../../utilities/sep-test-utilities";
import { ReviewPaymentPage } from "../../pages/ReviewPaymentPage";

test.describe(
  "SEP21 - Pay button state on Review Payment page @sep21",
  () => {
    let review: ReviewPaymentPage;

    // Each test starts directly on Step 3 thanks to reusable helper
    test.beforeEach(async ({ page }) => {
      review = await goToStep3(page);

      test
        .info()
        .annotations.push({
          type: "reviewPage",
          description: "Initialized at Step 3",
        });
    });

    // =========================================================
    // AC1 – Pay button is visible
    // =========================================================
    test("AC1 - Pay button should be visible @sep21-1", async () => {
      await expect(review.payButton).toBeVisible();
    });

    // =========================================================
    // AC2 – Pay button is disabled by default
    // =========================================================
    test("AC2 - Pay button should be disabled by default @sep21-2", async () => {
      await expect(review.payButton).toBeDisabled();
    });

    // =========================================================
    // AC3 – Pay button becomes enabled only when all fields valid
    // =========================================================
    test("AC3 - Pay button enables only after all fields valid @sep21-3", async () => {
      await review.enterCardNumber("4242 4242 4242 4242");
      await review.enterExpiryDate("12/40");
      await review.enterCVC("123");
      await review.enterZipCode("12345");
      await review.clickTermsAndConditionsCheckbox();

      await expect(review.payButton).toBeEnabled();
    });
  }
);
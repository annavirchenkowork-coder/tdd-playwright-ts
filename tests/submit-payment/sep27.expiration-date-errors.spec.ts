import {
  test,
  expect,
  goToStep3,
  BrowserUtility,
} from "../../utilities/sep-test-utilities";

test.describe("SEP27 - Expiration Date validation @sep27", () => {
  // ============================================================
  // AC1 – Short / malformed expiration date gives INCOMPLETE error
  // ============================================================
  test(
    "AC1 - Short expiration date shows 'expiration date is incomplete' @sep27-1",
    async ({ page }) => {
      const reviewPaymentPage = await goToStep3(page);

      // Type incomplete MM/YY
      await BrowserUtility.fillStripeInput(
        reviewPaymentPage.expiryDateInput,
        "12"
      );

      // Check the terms checkbox to trigger validation
      await reviewPaymentPage.clickTermsAndConditionsCheckbox();

      // Assertions
      await expect(reviewPaymentPage.cardExpiryErrorMessage).toBeVisible();
      await expect(reviewPaymentPage.cardExpiryErrorMessage).toContainText(
        "Your card’s expiration date is incomplete.",
        { ignoreCase: true }
      );
    }
  );

  // ============================================================
  // AC2 – Past expiration year gives YEAR IS IN THE PAST error
  // ============================================================
  test(
    "AC2 - Past expiration date shows 'expiration year is in the past' @sep27-2",
    async ({ page }) => {
      const reviewPaymentPage = await goToStep3(page);

      // Type date in the past
      await BrowserUtility.fillStripeInput(
        reviewPaymentPage.expiryDateInput,
        "01/20"
      );

      // Trigger validation
      await reviewPaymentPage.clickTermsAndConditionsCheckbox();

      // Assertions
      await expect(reviewPaymentPage.cardExpiryErrorMessage).toBeVisible();
      await expect(reviewPaymentPage.cardExpiryErrorMessage).toContainText(
        "Your card’s expiration year is in the past.",
        { ignoreCase: true }
      );
    }
  );
});
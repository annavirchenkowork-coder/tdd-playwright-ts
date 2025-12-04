import {
  test,
  expect,
  goToStep3,
  BrowserUtility,
} from "../../utilities/sep-test-utilities";

test.describe("SEP29 - Error message for invalid CVC number @sep29", () => {
  // =========================================================
  // AC1 – Short CVC should trigger "security code is incomplete" error
  // =========================================================
  test("AC1 - Short CVC shows inline error @sep29-1", async ({ page }) => {
    const reviewPage = await goToStep3(page);

    // Type short CVC using reusable Stripe helper
    await BrowserUtility.fillStripeInput(reviewPage.cvcInput, "12");

    // Trigger validation
    await reviewPage.clickTermsAndConditionsCheckbox();

    // Assertions
    await expect(reviewPage.cardCVCErrorMessage).toBeVisible();
    await expect(reviewPage.cardCVCErrorMessage).toContainText(
      "Your card’s security code is incomplete.",
      { ignoreCase: true }
    );
  });
});
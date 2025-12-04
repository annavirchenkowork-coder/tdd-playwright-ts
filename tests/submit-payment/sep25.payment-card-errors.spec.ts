import {
  test,
  expect,
  BrowserUtility,
  goToStep3,
} from "../../utilities/sep-test-utilities";

// =========================================================
// SEP25 – Error message for the invalid card number
// =========================================================
test.describe("SEP25 - Error message for invalid card number @sep25", () => {
  const INCOMPLETE_CARD: string = "4242 4242 4242 424"; // too short
  const INVALID_CARD: string = "4242 4242 4242 4246";   // wrong

  // =========================================================
  // AC1 – Incomplete card number shows "Your card number is incomplete."
  // =========================================================
  test("AC1 - Incomplete card number shows proper error @sep25-1", async ({
    page,
  }) => {
    const review = await goToStep3(page);

    // When User types incomplete card number
    await BrowserUtility.fillStripeInput(
      review.cardNumberInput,
      INCOMPLETE_CARD
    );

    // And checks Terms & Conditions
    await review.clickTermsAndConditionsCheckbox();

    // Then error visible + correct text
    await expect(review.cardNumberErrorMessage).toBeVisible();
    await expect(review.cardNumberErrorMessage).toContainText(
      "Your card number is incomplete.",
      { ignoreCase: true }
    );
  });

  // =========================================================
  // AC2 – Invalid card number shows "Your card number is invalid."
  // =========================================================
  test("AC2 - Invalid card number shows proper error @sep25-2", async ({
    page,
  }) => {
    const review = await goToStep3(page);

    // When User types invalid card number
    await BrowserUtility.fillStripeInput(review.cardNumberInput, INVALID_CARD);

    // And checks Terms & Conditions
    await review.clickTermsAndConditionsCheckbox();

    // Then error visible + correct text
    await expect(review.cardNumberErrorMessage).toBeVisible();
    await expect(review.cardNumberErrorMessage).toContainText(
      "Your card number is invalid.",
      { ignoreCase: true }
    );
  });
});
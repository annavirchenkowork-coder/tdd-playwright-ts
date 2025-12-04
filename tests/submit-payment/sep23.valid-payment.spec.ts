import {
  test,
  expect,
  goToStep3,
  microSettle,
} from "../../utilities/sep-test-utilities";

test.describe("SEP23 - Make a payment with a valid card @sep23", () => {
  // =======================================================
  // AC1 – Happy path: successful payment
  // =======================================================
  test("AC1 - Successful payment with a valid test card @sep23-1", async ({
    page,
  }) => {
    // Go through Step 1 + Step 2 (upfront plan) and land on Review Payment
    const review = await goToStep3(page);

    // ---- Fill valid payment data ----
    await review.enterCardNumber(
      process.env.CARD_NUMBER ?? "4242 4242 4242 4242"
    );

    await review.enterExpiryDate(
      process.env.CARD_EXPIRATION_DATE ?? "12/40"
    );

    await review.enterCVC(process.env.CARD_SECURITY_CODE ?? "123");

    await review.enterZipCode(process.env.ZIP_CODE ?? "12345");

    // Terms & conditions
    await review.clickTermsAndConditionsCheckbox();

    // Click Pay and wait a bit for Stripe + confirmation UI
    await review.clickPayButton();
    await microSettle(page, 1500);

    // ---- Assertions for success state ----
    await expect(review.confirmationBox).toBeVisible();

    // Steps 1 & 2 done, Step 3 completed/active
    await expect(review.step1Container).toHaveClass(/done/);
    await expect(review.step2Container).toHaveClass(/done/);
    await expect(review.step3Container).toHaveClass(/editing|done/);
  });

  // =========================================================
  // NEG1 – Pay button stays disabled if Terms are not accepted
  // =========================================================
  test("NEG1 - Pay button stays disabled if Terms are not accepted @sep23-neg1", async ({
    page,
  }) => {
    const review = await goToStep3(page);

    // Fill all valid Stripe fields
    await review.enterCardNumber("4242 4242 4242 4242");
    await review.enterExpiryDate("12/40");
    await review.enterCVC("123");
    await review.enterZipCode("12345");

    // DO NOT check the checkbox

    // Give UI a moment to settle
    await microSettle(page, 300);

    // User should NOT be able to click Pay
    await expect(review.payButton).toBeDisabled();
  });

  // =======================================================
  // NEG2 – Invalid card number: inline error + alert
  // =======================================================
  test("NEG2 - Invalid card number shows error & 'Something went wrong' alert @sep23-2", async ({
    page,
  }) => {
    const review = await goToStep3(page);

    // Invalid card number
    await review.enterCardNumber("4242 4242 4242 4246");

    // Other fields valid
    await review.enterExpiryDate("12/40");
    await review.enterCVC("123");
    await review.enterZipCode("12345");

    // Accept Terms
    await review.clickTermsAndConditionsCheckbox();

    // Let Stripe validate and render inline error
    await microSettle(page, 300);

    // Inline card error should be shown
    await expect(review.cardNumberErrorMessage).toBeVisible();
    await expect(review.cardNumberErrorMessage).toContainText(
      "Your card number is invalid",
      { ignoreCase: true }
    );

    // When clicking Pay, a browser alert with "Something went wrong" should appear
    const dialogPromise = page.waitForEvent("dialog");
    await review.clickPayButton();

    const dialog = await dialogPromise;
    expect(dialog.message()).toContain("Something went wrong");
    await dialog.accept();

    // Optional: still on the review page – we don't assert confirmationBox here
    await expect(review.cardNumberErrorMessage).toBeVisible();
  });

  // =======================================================
  // NEG3 – Invalid ZIP: inline error + alert
  // =======================================================
  test("NEG3 - Invalid ZIP shows error & 'Something went wrong' alert @sep23-3", async ({
    page,
  }) => {
    const review = await goToStep3(page);

    // Valid card / expiry / CVC
    await review.enterCardNumber("4242 4242 4242 4242");
    await review.enterExpiryDate("12/40");
    await review.enterCVC("123");

    // Intentionally bad ZIP
    await review.enterZipCode("000");
    await review.clickTermsAndConditionsCheckbox();

    await microSettle(page, 300);

    // ZIP inline error
    await expect(review.cardZipErrorMessage).toBeVisible();
    await expect(review.cardZipErrorMessage).toContainText(
      "Your ZIP is invalid",
      { ignoreCase: true }
    );

    // Pay still clickable & clicking shows the alert
    const dialogPromise = page.waitForEvent("dialog");
    await review.clickPayButton();

    const dialog = await dialogPromise;
    expect(dialog.message()).toContain("Something went wrong");
    await dialog.accept();

    // And error is still there after the alert
    await expect(review.cardZipErrorMessage).toBeVisible();
  });
});
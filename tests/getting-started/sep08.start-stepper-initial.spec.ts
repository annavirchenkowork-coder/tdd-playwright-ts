import { test, expect } from "../../utilities/sep-test-utilities";
import { StartApplicationPage } from "../../pages/StartApplicationPage";

const ACTIVE_BLUE = "rgb(1, 201, 255)";
const INACTIVE_GREY = "rgb(217, 226, 236)"; // #D9E2EC

test.describe(
  "SEP08 Start Application - initial checkout stepper state @sep08",
  () => {
    // =========================================================
    // AC1 - steps are "Start Application", "Payment Plan", "Review"
    // =========================================================
    test("Stepper shows correct labels in order @sep08-1", async ({ page }) => {
      const startApplicationPage = new StartApplicationPage(page);

      await expect(startApplicationPage.startApplicationText).toHaveText(
        /^\s*Start Application\s*$/i
      );
      await expect(startApplicationPage.paymentPlanText).toHaveText(
        /^\s*Payment\s*Plan\s*$/i
      );
      await expect(startApplicationPage.reviewText).toHaveText(
        /^\s*Review\s*$/i
      );
    });

    test(
      '"Start Application" is active blue and other steps are inactive grey @sep08-2 @sep08-3',
      async ({ page }) => {
        const startApplicationPage = new StartApplicationPage(page);

        // =========================================================
        // AC2 - Start Application step is active (blue)
        // =========================================================
        await expect(
          startApplicationPage.startApplicationStepCircle
        ).toHaveCSS("background-color", ACTIVE_BLUE);

        // =========================================================
        // AC3 - Payment Plan + Review steps are inactive (grey)
        // =========================================================
        const inactiveSteps = [
          startApplicationPage.paymentPlanStepCircle,
          startApplicationPage.reviewStepCircle,
        ];

        for (const circle of inactiveSteps) {
          await expect(circle).toHaveCSS("border-color", INACTIVE_GREY);
          await expect(circle).toHaveCSS("color", INACTIVE_GREY);
        }
      }
    );
  }
);
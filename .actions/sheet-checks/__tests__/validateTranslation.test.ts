import { beforeEach, describe, expect, it, vi } from "vitest";

import { validateTranslation } from "../src/checks/validateTranslation"
import { VALIDATION_STATUS } from "../src/statuses";

const sheetFiles = {
  translation: "GoblinLawyerRPG"
};

describe("validateTranslation", () => {
  vi.stubEnv("GITHUB_WORKSPACE", "/github/workspace");

  beforeEach(() => {
    vi.clearAllMocks();
  })
  it("should return a notice status when no translation file is found", async () => {

    const result = await validateTranslation({});

    expect(result).toContainEqual(VALIDATION_STATUS.NO_TRANSLATION_FILE);
  })
  it("should return an error if it cannot read the sheet.json as json", async () => {
    // act
    const result = await validateTranslation({ translation: "GoblinLawyerRPG" });

    // assert
    expect(result).toContain(VALIDATION_STATUS.NO_PARSE_TRANSLATION);
  });
})
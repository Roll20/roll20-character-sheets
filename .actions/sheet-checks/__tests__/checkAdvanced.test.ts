import { describe, expect, it } from "vitest";
import { SheetJSON } from "../src/types";
import { isAdvanced } from "../src/checks/checkAdvanced"
import { VALIDATION_STATUS } from "../src/statuses";

const sheetJSON: SheetJSON = {
  html: "vampireArchaeologistRPG/varpg.html",
  css: "vampireArchaeologistRPG/varpg.html",
  preview: "vampireArchaeologistRPG/image.png",
  authors: "me",
  roll20userid: "01",
  advanced: false,
  instructions: "You're a vampire and you can't find your stuff! Lie about your credentials so you're allowed to find it."
};

describe("isAdvanced", () => {
  it("should return an advancedSheet property of false for empty/false advanced sheetJSON values", () => {
    const firstJSON = {...sheetJSON};
    delete firstJSON.advanced;
    const firstResult = isAdvanced(firstJSON);
    expect(firstResult.advancedSheet).toBeFalsy();
    const secondResult = isAdvanced(sheetJSON);
    expect(secondResult.advancedSheet).toBeFalsy();
  })
  it("should return an advancedSheet property of true for true advanced sheetJSON values", () => {
    const firstJSON = {...sheetJSON};
    firstJSON.advanced = true;
    const firstResult = isAdvanced(firstJSON);
    expect(firstResult.advancedSheet).toBeTruthy();
  })
  it("should return a status indicating the sheet is being skipped when it finds a true advanced sheetJSON value", () => {
    const firstJSON = {...sheetJSON};
    firstJSON.advanced = true;
    const firstResult = isAdvanced(firstJSON);
    expect(firstResult.advancedStatuses).toContainEqual(VALIDATION_STATUS.SKIPPED_ADVANCED_SHEET);
  })
})
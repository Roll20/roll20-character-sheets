import { describe, it, expect, vi } from "vitest"

import { hasCRLF, checkAllLineEndings } from "../src/checks/checkLineEndings"
import { VALIDATION_STATUS } from "../src/statuses";

const badFile = "This is a bad line\r\nThis is another line";
const goodFile = "This is a bad line\nThis is another line";

const sheetFile = "MidnightTacoBellRPG";

vi.mock("@actions/core", () => {
  return {
    debug: vi.fn(),
  }
});

describe("checkLineEndings", () => {
  vi.stubEnv("GITHUB_WORKSPACE", "/github/workspace");

  describe("hasCRLF", () => {
    it("should return true if it the provided string has CRLF endings", () => {
      const result = hasCRLF(badFile)

      expect(result).toBeTruthy();
    })

    it("should return false if the provided string has LF endings", () => {
      const result = hasCRLF(goodFile)

      expect(result).toBeFalsy();
    })
  })

  describe("checkAllLineEndings", () => {
    it("should return a success when all provided file paths have good endings", () => {
      const result = checkAllLineEndings({
        ["a_random_name.html"]: goodFile,
        ["final_name.html"]: goodFile,
      }, sheetFile);
      expect(result).toStrictEqual([])
    });
    it("should return a failure if any provided file paths have bad endings, and include their file paths as errors", () => {
      const result = checkAllLineEndings({
        [`a_random_name.html`]: goodFile,
        [`a_different_name.css`]: badFile,
        [`a_third_name.json`]: badFile,
      }, sheetFile);
      expect(result).toStrictEqual([
          {
            ...VALIDATION_STATUS.INCORRECT_LINE_ENDINGS,
            annotation: {
              file: `${sheetFile}/a_different_name.css`
            }
          },
          {
            ...VALIDATION_STATUS.INCORRECT_LINE_ENDINGS,
            annotation: {
              file: `${sheetFile}/a_third_name.json`,
            }
          },
        ])
    })
  })
})
import { it, expect, describe, vi } from "vitest"
import { sendAllStatuses } from "../src/annotate";
import { VALIDATION_STATUS } from "../src/statuses";

const hoisted = vi.hoisted(() => {
  return {
    core: {
      error: vi.fn(),
      warning: vi.fn(),
      notice: vi.fn(),
      setFailed: vi.fn(),
    },
  }
});

vi.mock("@actions/core", () => hoisted.core);

describe("annotate", () => {
  describe("sendAllStatuses", () => {
    it("should send an error message to the core", () => {
      // arrange
      const error = VALIDATION_STATUS.CHANGING_MULTIPLE_SHEETS;
      const statuses = [error];

      // act
      sendAllStatuses(statuses);

      // assert
      expect(hoisted.core.error).toHaveBeenCalledWith(error.description, undefined);
    });

    it("should send a warning message to the core", () => {
      // arrange
      const warning = VALIDATION_STATUS.SHEET_HTTP_GET_FAILED;
      const statuses = [warning];

      // act
      sendAllStatuses(statuses);

      // assert
      expect(hoisted.core.warning).toHaveBeenCalledWith(warning.description, undefined);
    });

    it("should send a notice message to the core", () => {
      // arrange
      const notice = VALIDATION_STATUS.CHANGING_DOT_FILE;
      const statuses = [notice];

      // act
      sendAllStatuses(statuses);

      // assert
      expect(hoisted.core.notice).toHaveBeenCalledWith(notice.description, undefined);
    });
  });
});
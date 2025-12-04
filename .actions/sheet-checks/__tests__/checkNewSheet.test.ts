import { it, expect, describe, vi, beforeAll } from "vitest"

import { checkNewSheet } from "../src/checks/checkNewSheet";
import { VALIDATION_STATUS } from "../src/statuses";

const hoisted = vi.hoisted(() => {
  return {
    fetch: vi.fn(),
    core: {
      getInput: vi.fn(),
      debug: vi.fn(),
    },
    github: {
      getOctokit: vi.fn(),
      context: {
        payload: {
          pull_request: {
            number: 123,
          },
        }
      },
    },
    octokit: {
      request: vi.fn(),
    },
  }
});

vi.stubGlobal("fetch", hoisted.fetch);

vi.mock("@actions/core", () => hoisted.core);

vi.mock("@actions/github", () => hoisted.github);

const emptyResponse = {
  json: () => ([]),
}

const responseWithData = {
  json: () => ([{
    shortname: "bobsburgs",
    longname: "Bob's Burgers: The Movie: The Game",
    system: "Flipping CORE",
    path: "Bobs Burgers the TTRPG",
    repo: "roll20-character-sheets",
    hidden: false,
    official: null,
    updated_at: "2024_11_19T11:00:00.000Z",
  }]),
}

describe("checkNewSheet", () => {
  beforeAll(() => {
    hoisted.github.getOctokit.mockReturnValueOnce(hoisted.octokit);
    hoisted.octokit.request.mockResolvedValue({ data: [] });
  });

  describe("checkNewSheet", () => {
    const mockSheetName = "Bobs Burgers the TTRPG";

    it("returns a success state with a notice if the sheet-http service is not found", async () => {
      hoisted.fetch.mockRejectedValueOnce(new Error("this is an error"));
      const res = await checkNewSheet(mockSheetName);
      expect(res).toStrictEqual([VALIDATION_STATUS.SHEET_HTTP_GET_FAILED])
    });

    it("returns new sheet true if the sheet-http service is found and the sheet does not exist", async () => {
      hoisted.fetch.mockResolvedValueOnce(emptyResponse);
      const res = await checkNewSheet(mockSheetName);
      expect(res).toStrictEqual([VALIDATION_STATUS.NEW_SHEET])
    });

    it("returns new sheet false if the sheet-http service is found and the sheet does exist", async () => {
      hoisted.fetch.mockResolvedValueOnce(responseWithData);
      const res = await checkNewSheet(mockSheetName);
      expect(res).toStrictEqual([]);
    });
  });
});

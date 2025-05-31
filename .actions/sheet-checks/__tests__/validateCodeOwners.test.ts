import { describe, expect, it, vi } from "vitest";

import { VALIDATION_STATUS } from "../src/statuses";
import { validateCodeOwners } from "../src/checks/validateCodeOwners";
import { appendAnnotation } from "../src/helpers/utils";

const sheetName = "ThousandThousandIslands";
const groupedSheetName = "TheSoundOfMusicRPG";

const codeOwners = {
  "groups": {
    "somenerds": ["@NorWhal", "@nmbradley", "@NBrooks-Roll20"]
  },
  "sheets": {
    "ThousandThousandIslands": ["@munkao", "@z-siew"],
    "TheSoundOfMusicRPG": ["somenerds"]
  }
};


const hoisted = vi.hoisted(() => {
  return {
    core: {
      getInput: vi.fn(),
      debug: vi.fn(),
    },
    fsPromises: {
      readFile: vi.fn(),
    }
  }
});

vi.mock("@actions/core", () => hoisted.core);

vi.mock("fs/promises", () => hoisted.fsPromises);

describe("validateCodeOwners", () => {
  vi.stubEnv("GITHUB_WORKSPACE", "/github/workspace");

  it("should return an error if no codeowners file is found", async () => {
    // arrange
    hoisted.fsPromises.readFile.mockRejectedValueOnce("ENOENT");

    // act
    const result = await validateCodeOwners(sheetName);

    // assert
    expect(result).toContainEqual(VALIDATION_STATUS.NO_CODE_OWNERS_FILE);
  });

  it("should return an error if the codeowners file cannot be read", async () => {
    // arrange
    hoisted.fsPromises.readFile.mockReturnValueOnce("this is not json");

    // act
    const result = await validateCodeOwners(sheetName)

    // assert
    expect(result).toContainEqual(VALIDATION_STATUS.INVALID_CODE_OWNERS_FILE);
  });

  it("should provide no status if the codeowners file does not contain the sheet name", async () => {
    // arrange
    hoisted.fsPromises.readFile.mockReturnValueOnce(JSON.stringify({
      groups: {},
      sheets: {someOtherSheet: ["aDude"]},
    }));

    // act
    const result = await validateCodeOwners(sheetName);

    // assert
    expect(result).toStrictEqual([]);
  });

  it("should return an error if the codeowners file does not contain the user", async () => {
    // arrange
    hoisted.fsPromises.readFile.mockReturnValueOnce(JSON.stringify(codeOwners));
    hoisted.core.getInput.mockReturnValueOnce("user");

    // act
    const result = await validateCodeOwners(sheetName);

    // assert
    expect(result).toContainEqual(VALIDATION_STATUS.NOT_CODE_OWNER);
  });

  it("should provide a status if the user is listed as authorized", async () => {
    // arrange
    hoisted.fsPromises.readFile.mockReturnValueOnce(JSON.stringify(codeOwners));
    hoisted.core.getInput.mockReturnValueOnce("munkao");

    // act
    const result = await validateCodeOwners(sheetName);

    // assert
    expect(result).toContainEqual(VALIDATION_STATUS.IS_CODE_OWNER);
  });

  it("should provide a status if the user is listed as part of an authorized group", async () => {

    // arrange
    hoisted.fsPromises.readFile.mockReturnValueOnce(JSON.stringify(codeOwners));
    hoisted.core.getInput.mockReturnValueOnce("NorWhal");


    // act
    const result = await validateCodeOwners(groupedSheetName);

    // assert
    expect(result).toContainEqual(VALIDATION_STATUS.IS_CODE_OWNER);
  })

  it("should provide an error status if it looks for a group that doesn't exist", async () => {

    // arrange
    hoisted.fsPromises.readFile.mockReturnValueOnce(JSON.stringify({
      groups: {},
      sheets: {
        [groupedSheetName]: ["NotReal"]
      }
    }));
    hoisted.core.getInput.mockReturnValueOnce("NorWhal");


    // act
    const result = await validateCodeOwners(groupedSheetName);

    // assert
    expect(result).toContainEqual(appendAnnotation(
      VALIDATION_STATUS.NO_OWNER_GROUP_FOUND,
      {
        title: "NotReal"
      }
    ));
  })
})
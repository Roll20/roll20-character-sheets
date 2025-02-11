import { it, expect, describe, vi } from "vitest"

import { validateFiles } from "../src/validateFiles";
import { VALIDATION_STATUS } from "../src/statuses";

const hoisted = vi.hoisted(() => {
  return {
    fsPromises: {
      readFile: vi.fn(),
      readdir: vi.fn(),
    },
    isbinaryfile: {
      isBinaryFile: vi.fn(),
    },
    core: {
      debug: vi.fn(),
    },
  }
});

vi.mock("fs/promises", () => hoisted.fsPromises);

vi.mock("isbinaryfile", () => hoisted.isbinaryfile);

vi.mock("@actions/core", () => hoisted.core);

describe("validateFiles", () => {
  vi.stubEnv("GITHUB_WORKSPACE", "/github/workspace");

  it("should return an error if a file is in the root directory", async () => {
    // arrange
    const rawFiles = [
      "index.html",
    ];

    // act
    const { fileStatuses } = await validateFiles(rawFiles);

    // assert
    expect(fileStatuses).toContain(VALIDATION_STATUS.CHANGING_ROOT_FILE);
  });

  it("should return a status if the file is in a dotfile", async () => {
    // arrange
    const rawFiles = [
      ".dotfile/index.html",
    ];

    // act
    const { fileStatuses } = await validateFiles(rawFiles);

    // assert
    expect(fileStatuses).toContain(VALIDATION_STATUS.CHANGING_DOT_FILE);
  });

  it("should return an error if the PR changes files in multiple subdirectories", async () => {
    // arrange
    const rawFiles = [
      "sheet1/index.html",
      "sheet2/index.html",
    ];

    // act
    const { fileStatuses } = await validateFiles(rawFiles);

    // assert
    expect(fileStatuses).toContain(VALIDATION_STATUS.CHANGING_MULTIPLE_SHEETS);
  });

  it("should return an error if the sheet folder cannot be determined", async () => {
    // arrange
    const rawFiles = [
      "index.html",
    ];

    // act
    const { fileStatuses } = await validateFiles(rawFiles);

    // assert
    expect(fileStatuses).toContain(VALIDATION_STATUS.NO_SHEET_FOLDER);
  });

  it("should return no status if the PR is valid", async () => {
    // arrange
    const rawFiles = [
      "sheet1/index.html",
    ];
    hoisted.fsPromises.readdir.mockResolvedValue(["sheet1/index.html"]);

    // act
    const { fileStatuses } = await validateFiles(rawFiles);

    // assert
    expect(fileStatuses).toHaveLength(0);
  });

  it("should return a list of all files in the sheet folder", async () => {
    // arrange
    const rawFiles = [
      "sheet1/index.html",
    ];
    hoisted.fsPromises.readdir.mockResolvedValue(["sheet1/index.html", "sheet1/index.css", "sheet1/translation.json", "sheet1/src/source.pug"]);
    hoisted.fsPromises.readFile.mockResolvedValue("file content");
    hoisted.isbinaryfile.isBinaryFile.mockResolvedValue(false);

    // act
    const { allFiles } = await validateFiles(rawFiles);

    // assert
    expect(allFiles).toEqual({
      "sheet1/index.html": "file content",
      "sheet1/index.css": "file content",
      "sheet1/translation.json": "file content",
      "sheet1/src/source.pug": "file content",
    });
  });
});
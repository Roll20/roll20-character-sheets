import { it, expect, describe, vi } from "vitest"

import { validateSheetJson } from "../src/checks/validateSheetJson";
import { VALIDATION_STATUS } from "../src/statuses";
import { FileManifest } from "../src/validateFiles";
import { appendAnnotation } from "../src/helpers/utils";

const sheetFolder = "PapersPleaseRPG";

const hoisted = vi.hoisted(() => {
  return {
    fsPromises: {
      readFile: vi.fn(),
    },
  }
});

vi.mock("fs/promises", () => hoisted.fsPromises);

describe("validateSheetJson", () => {
  vi.stubEnv("GITHUB_WORKSPACE", "/github/workspace");

  describe("validateSheetJson", () => {
    it("should return an error if it cannot find a sheet.json in the list of provided files", async () => {
      // arrange
      const allFiles: FileManifest = {
        "sheet.html": "File Contents Example",
        "sheet.css": "File Contents Example",
        "translation.json": "File Contents Example",
      };

      // act
      const result = await validateSheetJson(allFiles, sheetFolder);

      // assert
      expect(result.jsonStatuses).toContainEqual(VALIDATION_STATUS.NO_SHEET_JSON);
    });

    it("should return an error if it cannot read the sheet.json as json", async () => {
      // arrange
      const allFiles: FileManifest = {
        "sheet.html": "File Contents Example",
        "sheet.css": "File Contents Example",
        "translation.json": "File Contents Example",
        "sheet.json": "this is not json",
      };

      // act
      const result = await validateSheetJson(allFiles, sheetFolder);

      // assert
      expect(result.jsonStatuses).toContainEqual(appendAnnotation(
        VALIDATION_STATUS.NO_PARSE_JSON,
        {
          file: `${sheetFolder}/sheet.json`
        }
      ));
    });

    it("should return an error if it cannot find an 'html' key in the sheet.json", async () => {
      // arrange
      const sheetJson = {
        css: "sheet.css",
        preview: "sheet.png",
        translation: "translation.json",
      };
      const stringifiedSheetJson = JSON.stringify(sheetJson);
      const allFiles: FileManifest = {
        "sheet.html": "File Contents Example",
        "sheet.css": "File Contents Example",
        "translation.json": "File Contents Example",
        "sheet.json": stringifiedSheetJson,
      };

      // act
      const result = await validateSheetJson(allFiles, sheetFolder);

      // assert
      expect(result.jsonStatuses).toContainEqual(appendAnnotation(
        VALIDATION_STATUS.NO_HTML_KEY,
        {
          file: `${sheetFolder}/sheet.json`
        }
      ));
    });

    it("should return an error if it cannot find a 'css' key in the sheet.json", async () => {
      // arrange
      const sheetJson = {
        html: "sheet.html",
        preview: "sheet.png",
        translation: "translation.json",
      };
      const stringifiedSheetJson = JSON.stringify(sheetJson);
      const allFiles: FileManifest = {
        "sheet.html": "File Contents Example",
        "sheet.css": "File Contents Example",
        "translation.json": "File Contents Example",
        "sheet.json": stringifiedSheetJson,
      };

      // act
      const result = await validateSheetJson(allFiles, sheetFolder);

      // assert
      expect(result.jsonStatuses).toContainEqual(appendAnnotation(
        VALIDATION_STATUS.NO_CSS_KEY,
        {file: `${sheetFolder}/sheet.json`}
      ));
    });

    it("should return an error if it cannot find a 'preview' key in the sheet.json", async () => {
      // arrange
      const sheetJson = {
        html: "sheet.html",
        css: "sheet.css",
        translation: "translation.json",
      };
      const stringifiedSheetJson = JSON.stringify(sheetJson);
      const allFiles: FileManifest = {
        "sheet.html": "File Contents Example",
        "sheet.css": "File Contents Example",
        "translation.json": "File Contents Example",
        "sheet.json": stringifiedSheetJson,
      };

      // act
      const result = await validateSheetJson(allFiles, sheetFolder);

      // assert
      const expected = appendAnnotation(
        VALIDATION_STATUS.NO_PREVIEW_KEY,
        {file: `${sheetFolder}/sheet.json`}
      );
      expect(result.jsonStatuses).toContainEqual(expected);
    });

    it("should return a success if no errors are found", async () => {
      // arrange
      const sheetJson = {
        html: "sheet.html",
        css: "sheet.css",
        preview: "sheet.png",
      };
      const stringifiedSheetJson = JSON.stringify(sheetJson);
      const allFiles: FileManifest = {
        "sheet.html": "File Contents Example",
        "sheet.css": "File Contents Example",
        "translation.json": "File Contents Example",
        "sheet.json": stringifiedSheetJson,
        "sheet.png": "File Contents Example",
      };

      hoisted.fsPromises.readFile
        .mockResolvedValueOnce(allFiles["sheet.png"]);

      // act
      const result = await validateSheetJson(allFiles, sheetFolder);
      const errors = result.jsonStatuses.filter((status) => status.type === "error");

      // assert
      expect(errors).toStrictEqual([]);
    });

    it("should return a status if it cannot find the sheet.html file", async () => {
      // arrange
      const sheetJson = {
        html: "sheet.html",
        css: "sheet.css",
        preview: "sheet.png",
      };
      const stringifiedSheetJson = JSON.stringify(sheetJson);
      const allFiles: FileManifest = {
        "sheet.css": "File Contents Example",
        "translation.json": "File Contents Example",
        "sheet.json": stringifiedSheetJson,
      };

      // act
      const result = await validateSheetJson(allFiles, sheetFolder);

      // assert
      const expected = appendAnnotation(
        VALIDATION_STATUS.NO_HTML_FILE,
        {file: `${sheetFolder}/sheet.json`}
      );
      expect(result.jsonStatuses).toContainEqual(expected);
    });

    it("should return a status if it cannot find the sheet.css file", async () => {
      // arrange
      const sheetJson = {
        html: "sheet.html",
        css: "sheet.css",
        preview: "sheet.png",
      };
      const stringifiedSheetJson = JSON.stringify(sheetJson);
      const allFiles: FileManifest = {
        "sheet.html": "File Contents Example",
        "translation.json": "File Contents Example",
        "sheet.json": stringifiedSheetJson,
      };

      // act
      const result = await validateSheetJson(allFiles, sheetFolder);

      // assert
      const expected = appendAnnotation(
        VALIDATION_STATUS.NO_CSS_FILE,
        {file: `${sheetFolder}/sheet.json`}
      );
      expect(result.jsonStatuses).toContainEqual(expected);
    });

    it("should return a status if it cannot find the preview file", async () => {
      // arrange
      const sheetJson = {
        html: "sheet.html",
        css: "sheet.css",
        preview: "sheet.png",
      };
      const stringifiedSheetJson = JSON.stringify(sheetJson);
      const allFiles: FileManifest = {
        "sheet.html": "File Contents Example",
        "sheet.css": "File Contents Example",
        "translation.json": "File Contents Example",
        "sheet.json": stringifiedSheetJson,
      };
      hoisted.fsPromises.readFile.mockRejectedValueOnce("ENOENT");

      // act
      const result = await validateSheetJson(allFiles, sheetFolder);

      // assert
      const expected = appendAnnotation(
        VALIDATION_STATUS.NO_PREVIEW_FILE,
        {file: `${sheetFolder}/sheet.json`}
      );
      expect(result.jsonStatuses).toContainEqual(expected);
    });
  });
});
import { beforeEach, afterEach, it, expect, describe, vi } from "vitest"

import { convertToUtf8, getFileList } from "../src/getFiles";

const hoisted = vi.hoisted(() => {
  return {
    getInput: vi.fn(),
  }
});

vi.mock("@actions/core", () => ({
  getInput: hoisted.getInput
}));

describe("getFiles", () => {
  describe("getFileList", () => {
    it("should take a raw file list and a separator and return a list of files", async () => {
      // arrange
      const rawFileList = "file1,file2,file3";
      const sep = ",";
      hoisted.getInput.mockReturnValueOnce(rawFileList)
      .mockReturnValueOnce(sep);

      // act
      const rawFiles = getFileList();

      // assert
      expect(rawFiles).toEqual(["file1", "file2", "file3"]);
    });

    it("should take a raw file list with subdirectories and a seperator and return a list of files", () => {
      // arrange
      const rawFileArray = [
        "example sheet name/sheet.html",
        "example sheet name/sheet.css",
        "example sheet name/translation.json",
        "example sheet name/sheet.json",
      ];
      const rawFileList = rawFileArray.join(",");
      const sep = ",";
      hoisted.getInput.mockReturnValueOnce(rawFileList)
      .mockReturnValueOnce(sep);

      // act
      const rawFiles = getFileList();

      // assert
      expect(rawFiles).toEqual(rawFileArray);
    });
  });

  describe("convertToUtf8", () => {
    it("should convert an octal escaped string to utf8", () => {
      // arrange
      const input = '"Brigandyne 2e \\303\\251dition/sheet.json"';

      // act
      const output = convertToUtf8(input);

      // assert
      expect(output).toEqual("Brigandyne 2e édition/sheet.json");
    });

    it("should convert antoher octal escaped strihng to utf8", () => {
      // arrange
      const input = '"hell\\303\\264 w\\303\\264rld/sheet.json"';

      // act
      const output = convertToUtf8(input);

      // assert
      expect(output).toEqual("hellô wôrld/sheet.json");
    });
  });
});
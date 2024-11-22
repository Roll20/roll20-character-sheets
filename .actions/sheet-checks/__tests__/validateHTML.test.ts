import {describe, expect, it, vi} from "vitest";
import { validateHTML } from "../src/checks/validateHTML"
import { VALIDATION_STATUS } from "../src/statuses";
import { SheetJSONFiles } from "../src/checks/validateSheetJson";
import { appendAnnotation } from "../src/helpers/utils";
import { SheetJSON } from "../src/types";

const sheetFolder = "TaxEvasionRPG";
const sheetJson: SheetJSON = {
  html: "tax-evasion-rpg.html",
  css: "tax-evasion-rpg.css",
  preview: "tax-evasion-rpg.png",
  authors: "me",
  roll20userid: "001",
  instructions: "The tale of how a young adult (you) sent the government on the wildest goose chase in living memory.",
}

describe("validateHTML", () => {
  it("should return an error if it cannot find the specified html file", () => {
    const mockRawFiles: SheetJSONFiles = {
      css: ".a-class { key: style;}",
      translation: "{'key':'value'}",
    };

    const result = validateHTML(mockRawFiles, sheetFolder);

    expect(result).toContainEqual(VALIDATION_STATUS.NO_HTML_FILE)
  })
  it("should return a notice for each table in the html file", () => {
    const mockRawFiles: SheetJSONFiles = {
      html: "<div>\n<h2>A Header</h2>\n<table>\n<tr>\n<th>A Table Header</th>\n</tr>\n<tr>\n<td>a value</td>\n</tr>\n</table>\n</div>"+
            "<table>\n<tr>\n<th>a</th>\n</tr>\n</table>",
      css: ".a-class { key: style;}",
      translation: "{'key':'value'}",
      sheetJson
    };

    const result = validateHTML(mockRawFiles, sheetFolder);

    const expectedResult = [
      appendAnnotation(
        VALIDATION_STATUS.TABLES_IN_HTML,
        {
          file: `${sheetFolder}/${sheetJson.html}`,
          startLine: 3,
          startColumn: 1,
          endLine: 10,
          endColumn: 8,
        }
      ),
      appendAnnotation(
        VALIDATION_STATUS.TABLES_IN_HTML,
        {
          file: `${sheetFolder}/${sheetJson.html}`,
          startLine: 11,
          startColumn: 7,
          endColumn: 8,
          endLine: 15,
        },
      )
    ]

    expect(result).toStrictEqual(expectedResult)
  })
})
import { describe, expect, it } from "vitest";
import { SheetJSONFiles } from "../src/checks/validateSheetJson";
import {validateCSS} from "../src/checks/validateCSS"
import { VALIDATION_STATUS } from "../src/statuses";

describe("validateCSS", () => {
  it("should return an error when no css file is specified/found", () => {
    const mockRawFiles: SheetJSONFiles = {
      html: "<div><h2>A Header</h2><table><tr><th>A Table Header</th></tr><tr><td>a value</td></tr></table></div>",
      translation: "{'key':'value'}",
    };

    const result = validateCSS(mockRawFiles)

    expect(result).toContainEqual(VALIDATION_STATUS.NO_CSS_FILE);
  })
})
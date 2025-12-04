import { VALIDATION_STATUS, ValidationStatus } from "../statuses";
import { appendAnnotation } from "../helpers/utils";
import { SheetJSONFiles } from "./validateSheetJson";
import lineColumn from "line-column"

export function validateHTML(files: SheetJSONFiles, sheetDirectoryName: string) {
  const statuses: ValidationStatus[] = [];
  const { html, sheetJson } = files;
  if (!html) statuses.push(VALIDATION_STATUS.NO_HTML_FILE);
  else if (html.includes("<table")) {
    let index = 0;
    do {
      const openTagIndex = html.indexOf("<table", index);
      if (openTagIndex !== -1){
        const closeTagIndex = html.indexOf("</table>", openTagIndex+7)
        const { line: startLine, col: startColumn } = lineColumn(html, openTagIndex);
        const { line: endLine, col: endCol } = lineColumn(html, closeTagIndex);
  
        statuses.push(appendAnnotation(
          VALIDATION_STATUS.TABLES_IN_HTML, 
          {
            file: `${sheetDirectoryName}/${sheetJson.html}`,
            startLine,
            startColumn,
            endLine,
            endColumn: endCol+7, //account for length of "</table>"
          }
        ))
        index = closeTagIndex + 7;
      } else index = null
    } while (index);
  }
  return statuses;
}
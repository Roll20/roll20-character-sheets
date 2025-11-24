import { VALIDATION_STATUS, ValidationStatus } from "../statuses";
import { SheetJSONFiles } from "./validateSheetJson";

export function validateCSS(files: SheetJSONFiles) {
  const statuses: ValidationStatus[] = [];
  if (!files.css) {
    statuses.push(VALIDATION_STATUS.NO_CSS_FILE);
    return statuses;
  }

  // If anything is imported that's not a google font, alert them
  // This regex checks if @import url( exists more times in the CSS than @import url("fonts.googleapis.com
  // If it does, then they're importing things other than google fonts
  const importMatch = files.css.match(/@import url\(/g) ?? [];
  const googleImportMatch = files.css.match(/@import url\(('|")https:\/\/fonts.googleapis.com/g) ?? [];
  if (importMatch.length > googleImportMatch.length) {
    statuses.push({
      ...VALIDATION_STATUS.CSS_FONT_ERROR,
      annotation: {
        title: "Imports other than google fonts detected"
      }
    });
  }

  // If they use font-face, alert them
  if (files.css.includes("@font-face")) {
    statuses.push({
      ...VALIDATION_STATUS.CSS_FONT_ERROR,
      annotation: {
        title: "@font-face detected. This may behave in unexpected ways, or not function at all"
      }
    });
  }

  // Legacy-legacy CSS checking
  if (files.sheetJson.legacy) {
    // Check if the CSS file contains "@import url('https://fonts.googleapis.com/css2"
    // must be 'css', not 'css2': https://wiki.roll20.net/CSS_Wizardry#Fonts
    if (files.css.match(/@import url\(('|")https:\/\/fonts.googleapis.com\/css2/g)?.length > 0) {
      statuses.push({
        ...VALIDATION_STATUS.CSS_FONT_ERROR,
        annotation: {
          title: "Font imported using css2; must be imported using css"
        }
      })
    }
    // Check if the CSS file contains "@import url('https://fonts.googleapis.com/......&family="
    // Must be pipe-separated with no family= for multiple fonts: https://wiki.roll20.net/CSS_Wizardry#Fonts
    if (files.css.match(/@import url\(('|")https:\/\/fonts.googleapis.com.+&family=/g)?.length > 0) {
      statuses.push({
        ...VALIDATION_STATUS.CSS_FONT_ERROR,
        annotation: {
          title: "Google font includes '&family='; should be using a | without the extra family="
        }
      });
    }
  }

  return statuses;
}
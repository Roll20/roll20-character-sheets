import { VALIDATION_STATUS, ValidationStatus } from "../statuses";
import { SheetJSONFiles } from "./validateSheetJson";

export function validateTranslation(files: SheetJSONFiles) {
  const statuses: ValidationStatus[] = [];

  if(!files.translation) { statuses.push(VALIDATION_STATUS.NO_TRANSLATION_FILE) }
  else {
    try {
      JSON.parse(files.translation);
    } catch (e) {
      statuses.push(VALIDATION_STATUS.NO_PARSE_TRANSLATION)
    }
  }

  return statuses;
}
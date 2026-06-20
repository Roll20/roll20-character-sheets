import { VALIDATION_STATUS, ValidationStatus } from "../statuses";
import { SheetJSON } from "../types";

export function isAdvanced(sheetJSON: SheetJSON) {
  const statuses: ValidationStatus[] = [];
  if (sheetJSON.advanced) {
    statuses.push(VALIDATION_STATUS.SKIPPED_ADVANCED_SHEET)
  }
  return {
    advancedSheet: sheetJSON.advanced || false,
    advancedStatuses: statuses
  }
}
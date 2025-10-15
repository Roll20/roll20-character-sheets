import { VALIDATION_STATUS, ValidationStatus } from "../statuses";
import type { FileManifest } from "../validateFiles";
import * as core from "@actions/core";

export function hasCRLF(file: string) {
  return file.includes("\r\n")
};

export function checkAllLineEndings(allFiles: FileManifest, sheetFolder: string): ValidationStatus[] {
  const statuses: ValidationStatus[] = [];
  for (const filePath in allFiles) {
    core.debug(`Checking line endings for ${filePath}`);
    const file = allFiles[filePath];
    if (!file) {
      core.debug(`No file found for ${filePath}`);
    continue;
    }
    if (hasCRLF(file)){
      statuses.push({
        ...VALIDATION_STATUS.INCORRECT_LINE_ENDINGS,
        annotation: {
          file: `${sheetFolder}/${filePath}`
        }
      });
    }
  }
  return statuses;
}
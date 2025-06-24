import { VALIDATION_STATUS, ValidationStatus } from "../statuses";
import { SheetJSON } from "../types";
import { getSheetFile, appendAnnotation } from "../helpers/utils";
import { FileManifest } from "../validateFiles";

export type SheetJSONFiles = {
  html?: string;
  css?: string;
  translation?: string;
  sheetJson?: SheetJSON;
};

function validateKeys(json: any): ValidationStatus[] {
  const statuses: ValidationStatus[] = [];
  if (!json.html) {
    statuses.push(VALIDATION_STATUS.NO_HTML_KEY);
  }
  if (!json.css) {
    statuses.push(VALIDATION_STATUS.NO_CSS_KEY);
  }
  if (!json.preview) {
    statuses.push(VALIDATION_STATUS.NO_PREVIEW_KEY);
  }
  return statuses;
};

export type SheetFilesAndStatuses = {
  fileStatuses: ValidationStatus[];
  sheetFiles?: SheetJSONFiles;
};

function getSheetFiles (allFiles: FileManifest, sheetJson: SheetJSON,): SheetJSONFiles {
  const sheetFiles: SheetJSONFiles = {};
  sheetFiles.sheetJson = sheetJson;
  sheetFiles.html = allFiles[sheetJson.html];
  sheetFiles.css = allFiles[sheetJson.css];
  sheetFiles.translation = allFiles["translation.json"];
  return sheetFiles;
}

async function validateSheetFiles(sheetFiles: SheetJSONFiles, sheetFolder: string): Promise<ValidationStatus[]> {
  const validStatuses: ValidationStatus[] = [];
  if (!sheetFiles.html) {
    validStatuses.push(VALIDATION_STATUS.NO_HTML_FILE);
  }
  if (!sheetFiles.css) {
    validStatuses.push(VALIDATION_STATUS.NO_CSS_FILE);
  }
  if (!sheetFiles.translation) {
    validStatuses.push(VALIDATION_STATUS.NO_TRANSLATION_FILE);
  }
  if (sheetFiles.sheetJson.preview) {
    const preview = await getSheetFile(sheetFolder, sheetFiles.sheetJson.preview, { removeBinary: false });
    if (!preview) {
      validStatuses.push(VALIDATION_STATUS.NO_PREVIEW_FILE);
    }
  }
  return validStatuses;
}

export type JSONValidationResult = {
  sheetFiles?: SheetJSONFiles;
  jsonStatuses: ValidationStatus[];
};

export async function validateSheetJson(allFiles: FileManifest, sheetFolder: string): Promise<JSONValidationResult> {
  const jsonStatuses: ValidationStatus[] = [];
  const sheetJson = allFiles["sheet.json"];
  if (!sheetJson) {
    jsonStatuses.push(VALIDATION_STATUS.NO_SHEET_JSON);
    return { jsonStatuses };
  }
  try {
    const json = JSON.parse(sheetJson);
    const keyStatuses = validateKeys(json);
    const sheetFiles = getSheetFiles(allFiles, json);
    const fileStatuses = await validateSheetFiles(sheetFiles, sheetFolder);
    const allStatuses = [...keyStatuses, ...fileStatuses].map(status => appendAnnotation(status, {file: `${sheetFolder}/sheet.json`}));
    jsonStatuses.push(...allStatuses);
    return {
      sheetFiles,
      jsonStatuses,
    }
  } catch (e) {
    const errorStatus = appendAnnotation(
      VALIDATION_STATUS.NO_PARSE_JSON,
      {
        file: `${sheetFolder}/sheet.json`,
      }
    );
    jsonStatuses.push(errorStatus);
    return {
      jsonStatuses,
    }
  }
}
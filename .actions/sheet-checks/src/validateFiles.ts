import { VALIDATION_STATUS, ValidationStatus } from "./statuses";
import * as path from "path";
import * as core from "@actions/core";
import { readdir } from "fs/promises";
import { getSheetFile } from "./helpers/utils";

type SheetFiles = {
  "html"?: string;
  "css"?: string;
  "translation"?: string;
  "preview"?: string;
};

function fileInRoot(filePath: string): boolean {
  return filePath.split("/").length === 1;
};

function fileIsDotFile(filePath: string): boolean {
  return filePath.startsWith(".");
}

type ValidateChangesReturn = {
  sheetFolder?: string;
  changeStatuses: ValidationStatus[];
};

// 5th Edition OGL by Roll20/5th Edition OGL by Roll20.html
function validateChanges(newFiles: string[]): ValidateChangesReturn {
  const changeStatuses: ValidationStatus[] = [];
  const sheetFolders = new Set<string>();

  for (const file of newFiles) {
    if (fileInRoot(file)) {
      changeStatuses.push(VALIDATION_STATUS.CHANGING_ROOT_FILE);
      continue;
    }
    if (fileIsDotFile(file)) {
      changeStatuses.push(VALIDATION_STATUS.CHANGING_DOT_FILE);
      continue;
    }
    const filePath = path.parse(file);
    if (filePath.dir.includes("/")) {
      const sheetFolder = filePath.dir.split("/")[0];
      sheetFolders.add(sheetFolder);
    }
    if (sheetFolders.size > 1) {
      changeStatuses.push(VALIDATION_STATUS.CHANGING_MULTIPLE_SHEETS);
      break;
    }
  }

  core.debug(`Sheet folders: ${JSON.stringify(Array.from(sheetFolders))}`);

  const sheetFolder = Array.from(sheetFolders)[0];

  if (!sheetFolder) {
    changeStatuses.push(VALIDATION_STATUS.NO_SHEET_FOLDER);
  }

  return {
    sheetFolder,
    changeStatuses,
  };
};

export type FileManifest = Record<string, string>;

async function getFiles(sheetFolder: string): Promise<FileManifest> {
  const allFiles: Record<string, string> = {};
  const sheetFolderPath = path.join(process.env["GITHUB_WORKSPACE"], sheetFolder);
  const fileList = await readdir(sheetFolderPath, { recursive: true });

  for (const file of fileList) {
    core.debug(`Getting File: ${file}`);
    const fileContent = await getSheetFile(sheetFolder, file, { removeBinary: true });
    if (!fileContent) {
      continue;
    }
    allFiles[file] = fileContent;
  }

  return allFiles;
};

type FileValidationReturn = {
  fileStatuses: ValidationStatus[];
  allFiles: Record<string, string>;
};

export async function validateFiles(newFiles: string[]): Promise<FileValidationReturn> {
  const fileStatuses: ValidationStatus[] = [];

  const { sheetFolder, changeStatuses } = validateChanges(newFiles);
  if (changeStatuses.length > 0) {
    fileStatuses.push(...changeStatuses);
  }

  const allFiles = await getFiles(sheetFolder);

  return {
    fileStatuses,
    allFiles,
  };
};
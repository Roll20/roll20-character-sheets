#!/usr/bin/env node

import * as core from "@actions/core";

import { sendAllStatuses } from "./annotate";
import { checkAllLineEndings } from "./checks/checkLineEndings";
import { isAdvanced } from "./checks/checkAdvanced";
import { checkNewSheet } from "./checks/checkNewSheet";
import { getFileList } from "./getFiles";
import { VALIDATION_STATUS, ValidationStatus } from "./statuses";
import { validateCSS } from "./checks/validateCSS";
import { validateFiles } from "./validateFiles";
import { validateHTML } from "./checks/validateHTML";
import { validateSheetJson } from "./checks/validateSheetJson";
import { validateTranslation } from "./checks/validateTranslation";
import { validateCodeOwners } from "./checks/validateCodeOwners";
import { sendSummary } from "./sendSummary";

function prettyPrintStatuses(statuses: ValidationStatus[]) {
  return statuses.map((status) => {
    return `${status.type}: ${status.description}`;
  }).join("\n");
};

async function getStatusForPR() {
  core.debug("Starting validation.");
  const statuses: ValidationStatus[] = [];

  // get modified files
  core.debug("Getting and checking modified files.");
  const rawFileList = getFileList();
  // Checks if you've modified root or a dot file
  const { allFiles, fileStatuses } = await validateFiles(rawFileList);
  statuses.push(...fileStatuses);
  const sheetDirectoryName = rawFileList[0].split("/")[0];

  const fileList = Object.keys(allFiles);
  core.debug(`All files: ${JSON.stringify(fileList)}`);
  core.debug("Checking sheet.json keys.");
  // Checks if you have a sheet.json and (legacy only) if the correct data is on it
  const sheetJson = fileList.find((file) => file.endsWith("sheet.json"));
  if (!sheetJson) {
    statuses.push(VALIDATION_STATUS.NO_SHEET_JSON);
    return statuses;
  }
  core.debug(`Sheet Directory Name: ${sheetDirectoryName}`);
  const { jsonStatuses, sheetFiles } = await validateSheetJson(allFiles, sheetDirectoryName);
  
  core.debug("Checking for advanced sheet.");
  // If it's advanced, return here - all we care about then is that the sheet.json exists
  const { advancedSheet, advancedStatuses } = isAdvanced(sheetFiles.sheetJson);
  core.debug(`Is Advanced Sheet: ${advancedSheet}`);
  if (advancedStatuses.length > 0) {
    core.debug(`Advanced Statuses: ${prettyPrintStatuses(advancedStatuses)}`);
  }
  // Just return the advanced data
  if (advancedSheet) {
    return [...advancedStatuses];
  }

  // If it's legacy, then go back and check the validateFiles errors above and return early if they exist
  const fileErrors = fileStatuses.filter((status) => status.type === "error");
  if (fileErrors.length > 0) {
    core.debug(`File Statuses: ${prettyPrintStatuses(fileStatuses)}`);
    return statuses;
  }

  core.debug(`Has HTML: ${!!sheetFiles.html}`);
  core.debug(`Has CSS: ${!!sheetFiles.css}`);
  core.debug(`Has Translation: ${!!sheetFiles.translation}`);
  if (jsonStatuses.length > 0) {
    core.debug(`Sheet JSON Statuses: ${prettyPrintStatuses(jsonStatuses)}`);
  }
  statuses.push(...jsonStatuses);

  const newSheetStatuses = await checkNewSheet(sheetDirectoryName);
  if (newSheetStatuses.length > 0) {
    core.debug(`New Sheet Statuses: ${prettyPrintStatuses(newSheetStatuses)}`);
  }
  statuses.push(...newSheetStatuses);

  const lineEndingStatuses = await checkAllLineEndings(allFiles, sheetDirectoryName);
  if (lineEndingStatuses.length > 0) {
    core.debug(`Line Ending Statuses: ${prettyPrintStatuses(lineEndingStatuses)}`);
  }
  statuses.push(...lineEndingStatuses);

  const htmlStatuses = validateHTML(sheetFiles, sheetDirectoryName);
  if (htmlStatuses.length > 0) {
    core.debug(`HTML Statuses: ${prettyPrintStatuses(htmlStatuses)}`);
  }
  statuses.push(...htmlStatuses);

  const cssStatuses = validateCSS(sheetFiles);
  if (cssStatuses.length > 0) {
    core.debug(`CSS Statuses: ${prettyPrintStatuses(cssStatuses)}`);
  }
  statuses.push(...cssStatuses);

  const translationStatuses = validateTranslation(sheetFiles);
  if (translationStatuses.length > 0) {
    core.debug(`Translation Statuses: ${prettyPrintStatuses(translationStatuses)}`);
  }
  statuses.push(...translationStatuses);

  const codeownerStatuses = await validateCodeOwners(sheetDirectoryName);
  if (codeownerStatuses.length > 0) {
    core.debug(`Codeowner Statuses: ${prettyPrintStatuses(codeownerStatuses)}`);
  }
  statuses.push(...codeownerStatuses);

  return statuses;
}

async function run () {
  const statuses = await getStatusForPR();
  sendAllStatuses(statuses);
  if (statuses.every(status => status.name !== "SKIPPED_ADVANCED_SHEET")) {
    sendSummary(statuses);
  }
};

run();

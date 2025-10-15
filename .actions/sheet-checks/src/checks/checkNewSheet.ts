import * as core from "@actions/core";

import { getOctokit, getPRInfo } from "../helpers/utils";
import { VALIDATION_STATUS, ValidationStatus } from "../statuses";

const NEW_SHEET_LABEL = "new sheet";

async function toggleLabel(isNewSheet: boolean) {
  const repository = core.getInput("repository");
  core.debug(`Checking if 'New Sheet' label should be added`);
  const octokit = getOctokit();
  const pr = getPRInfo();
  core.debug(`PR: ${repository}/${pr.number}`);
  const currentLabels = await octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/labels",
    {
      owner: "Roll20",
      repo: repository,
      issue_number: pr.number,
    }
  );
  core.debug(`Current labels: ${JSON.stringify(currentLabels.data)}`);
  const newSheetLabel = currentLabels.data.find((label) => label.name === NEW_SHEET_LABEL);
  core.debug(`isNewSheet: ${isNewSheet}`);
  core.debug(`newSheetLabel: ${newSheetLabel}`);
  if (isNewSheet && !newSheetLabel) {
    core.debug(`Adding ${NEW_SHEET_LABEL} label`);
    const response = await octokit.request(
      "POST /repos/{owner}/{repo}/issues/{issue_number}/labels",
      {
        owner: "Roll20",
        repo: repository,
        issue_number: pr.number,
        labels: [NEW_SHEET_LABEL],
      }
    );
    core.debug(`Response: ${JSON.stringify(response)}`);
  }
}

export async function checkNewSheet(sheetDirectoryName: string): Promise<ValidationStatus[]> {
  try {
    const httpService = await fetch("https://sheet-http.production.roll20preflight.net/list?processed=false");
    const response = await httpService.json();
    const existingSheet = response.find((sheetData) => sheetData.path === sheetDirectoryName);
    await toggleLabel(!existingSheet);
    return existingSheet ? [] : [VALIDATION_STATUS.NEW_SHEET];
  }
  catch (e) {
    return [VALIDATION_STATUS.SHEET_HTTP_GET_FAILED];
  }
}
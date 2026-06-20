import * as core from "@actions/core";

import { VALIDATION_STATUS, ValidationStatus } from "../statuses";
import { getSheetFile, appendAnnotation, getOctokit, getPRInfo } from "../helpers/utils";

export type CodeOwners = {
  groups: Record<string, string[]>,
  sheets: Record<string, string[]>
};

export async function validateCodeOwners(sheetName: string): Promise<ValidationStatus[]> {
  const codeOwnerStatuses: ValidationStatus[] = [];
  const codeOwners = await getSheetFile("", "CODEOWNERS.json", { removeBinary: false });
  if (!codeOwners) {
    codeOwnerStatuses.push(VALIDATION_STATUS.NO_CODE_OWNERS_FILE);
    return codeOwnerStatuses;
  }
  try {
    const codeOwnersJSON: CodeOwners = JSON.parse(codeOwners);
    const fileCodeOwners = codeOwnersJSON.sheets[sheetName];
    if (!fileCodeOwners) return [];
    const fileCodeOwnerGroups = fileCodeOwners.filter(entry => entry[0] !== "@");
    if (fileCodeOwnerGroups.length) {
      for (const group of fileCodeOwnerGroups) {
        if (group in codeOwnersJSON.groups) {
          fileCodeOwners.push(...codeOwnersJSON.groups[group]);
        }
        else {
          codeOwnerStatuses.push(appendAnnotation(
            VALIDATION_STATUS.NO_OWNER_GROUP_FOUND,
            { title: group },
          ))
          return codeOwnerStatuses;
        }
      }
    }
    if (fileCodeOwners) {
      core.debug(`Code owners data found for sheet: ${JSON.stringify(fileCodeOwners)}`);
      const user = core.getInput("user");
      if (!fileCodeOwners.includes(`@${user}`)) {
        codeOwnerStatuses.push(VALIDATION_STATUS.NOT_CODE_OWNER);
        const octokit = getOctokit();
        const repository = core.getInput("repository");
        const pr = getPRInfo();
        octokit.rest.pulls.requestReviewers({
          owner: "Roll20",
          repo: repository,
          pull_number: pr.number,
          reviewers: fileCodeOwners
            .filter(entry => entry[0] === "@")
            .map((owner) => owner.replace("@", ""))
        });
      }
      else {
        core.debug("User found as official author in code owners, proceed");
        codeOwnerStatuses.push(VALIDATION_STATUS.IS_CODE_OWNER);
      }
    }
    return codeOwnerStatuses;
  } catch (e) {
    codeOwnerStatuses.push(VALIDATION_STATUS.INVALID_CODE_OWNERS_FILE);
    return codeOwnerStatuses;
  }
}
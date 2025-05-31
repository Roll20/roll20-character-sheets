import * as core from "@actions/core";
import { ValidationStatus } from "./statuses";

export function sendAllStatuses(statuses: ValidationStatus[]) {
  statuses.forEach((status) => {
    if (status.type === "error") {
      core.error(status.description, status.annotation);
    }
    if (status.type === "notice") {
      core.notice(status.description, status.annotation);
    }
    if (status.type === "warning") {
      core.warning(status.description, status.annotation);
    }
  });

  const errorStatuses = statuses.filter((status) => status.type === "error");

  if (errorStatuses.length > 0) {
    core.setFailed("There were errors in the validation process.");
  }
};
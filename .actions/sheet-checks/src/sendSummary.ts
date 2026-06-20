import * as core from "@actions/core";
import type { AnnotationProperties } from "@actions/core";
import { ValidationStatus, ValidationType } from "./statuses";
import { getOctokit, getPRInfo } from "./helpers/utils";
import { MarkdownGenerator } from "./helpers/MarkdownGenerator";

type StatusSummary = {
  name: string;
  title: MarkdownGenerator;
  body: MarkdownGenerator;
  instanceCount: number;
}

const getSummaryIcon = (type: ValidationType) => {
  switch (type) {
    case "error":
      return "🚫";
    case "notice":
      return "❕";
    case "warning":
      return "⚠️";
    case "success":
      return "✅";
    default:
      return "";
  }
}

type StatusCounts = {
  error: number;
  warning: number;
  notice: number;
}

function groupBy<T, K extends keyof any>(array: T[], getKey: (item: T) => K): Record<string, T[]> {
  return array.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>)
}

function createSummaryHeader(markdown: MarkdownGenerator, repository: string) {
  markdown.addHeader(2, "Roll20 Pull Request Status");
  markdown.addParagraph(`Thank you for submitting a PR to ${repository}! This comment will be updated to reflect the latest validation status on your sheet.`);
}

function groupStatuses(markdown: MarkdownGenerator, statuses: ValidationStatus[]) {

}

function createStatusSummary(markdown: MarkdownGenerator, statuses: StatusCounts) {
  markdown.startTable(3);
  markdown.startTableHeader();
  markdown.addTableHeader("Errors");
  markdown.addTableHeader("Warnings");
  markdown.addTableHeader("Notices");
  markdown.endTableHeader();
  markdown.startTableRow();
  markdown.addTableCell(`${statuses.error}`);
  markdown.addTableCell(`${statuses.warning}`);
  markdown.addTableCell(`${statuses.notice}`);
  markdown.endTableRow();
  markdown.endTable();
}

function createAnnotation(annotation: AnnotationProperties) {
  const lines = [];
  for (const keyName in annotation) {
    lines.push(`${keyName}: ${annotation[keyName]}`);
  }
  return lines.join("\n");
}

function createResponseGroup(group: string, markdown: MarkdownGenerator, errors: ValidationStatus[]) {
  const groupedErrors = groupBy(errors, (error) => error.name);
  const errorNames = Object.keys(groupedErrors);
  markdown.addRule();
  markdown.addHeader(3, "Errors");
  errorNames.forEach((error) => {
    const errorGroup = groupedErrors[error];
    const firstError = errorGroup[0];
    markdown.addError(firstError.description);
    markdown.startDisclosure("Details");
    errorGroup.forEach((error) => {
      if (error.annotation) {
        const annotation = createAnnotation(error.annotation);
        markdown.addCodeBlock(annotation);
      }
    });
    markdown.endDisclosure();
  });
}

function createWarnings(markdown: MarkdownGenerator, errors: ValidationStatus[]) {}

function createNotices(markdown: MarkdownGenerator, errors: ValidationStatus[]) {}

function createSummaryFooter() {}

export async function sendSummary(statuses: ValidationStatus[]) {
  const octokit = getOctokit();
  const repository = core.getInput("repository");
  const pr = getPRInfo();
  // Look for a comment from roll20deploy that starts with "Roll20 Pull Request Status"
  // if it exists, replace its body with new detection
  // if it doesn't, create it

  const existingComments = await octokit.rest.issues.listComments({
    owner: "Roll20",
    repo: repository,
    issue_number: pr.number,
  });
  core.debug(`Existing Comments on this Issue: ${JSON.stringify(existingComments.data)}`);
  const roll20deployComment = existingComments.data.find((comment) => comment.user.login === "roll20deploy" && comment.body.startsWith("### Roll20 Pull Request Status"));
  const mdGen = new MarkdownGenerator();

  mdGen.addHeader(3, "Roll20 Pull Request Status");
  mdGen.addParagraph(`Thank you for submitting a PR to ${repository}! This comment will be updated to reflect the latest validation status on your sheet.`);
  mdGen.addHeader(4, "Validation Results");

  const hasErrors = statuses.filter(stat => stat.type === "error").length > 0;
  const hasWarnings = statuses.filter(stat => stat.type === "warning").length > 0;
  const hasNotices = statuses.filter(stat => stat.type === "notice").length > 0;
  if (!hasErrors && !hasWarnings) {
    mdGen.addParagraph("Sheet validation checks passed. ", false);
    if (hasNotices) {
      mdGen.addParagraph("However, the following was found:");
    }
  }
  else {
    mdGen.addParagraph("Sheet validation found the following problems:");
  }

  const statusSummary: StatusSummary[] = [];
  statuses.forEach((status) => {
    const existingError = statusSummary.find(stat => stat.name === status.name);
    if (existingError && status.annotation) {
      existingError.body.addLineBreak();
      const keys = [];
      for (const keyName in status.annotation) {
        keys.push(`${keyName}: ${status.annotation[keyName]}`);
      }
      existingError.body.addCodeBlock(keys.join("\n"));
      existingError.instanceCount++;
    }
    else {
      const title = new MarkdownGenerator();
      title.startComplexLine()
        .addText(getSummaryIcon(status.type))
        .addBold(`${status.type.toUpperCase()}:`)
        .addText(" " + status.description)
      title.endComplexLine();
      // title.addLine(`${getSummaryIcon(status.type)}**${status.type.toUpperCase()}:** ${status.description}`);
      let body = new MarkdownGenerator();
      if (status.annotation) {
        const keys = [];
        for (const keyName in status.annotation) {
          keys.push(`${keyName}: ${status.annotation[keyName]}`);
        }
        body.addCodeBlock(keys.join("\n"));
      }
      statusSummary.push({
        name: status.name,
        title,
        body,
        instanceCount: 1,
      });
    }
  });

  statusSummary.forEach((summary) => {
    if (summary.instanceCount > 1) {
      summary.title.addText(` (${summary.instanceCount} instances)`);
    }
    summary.title.addLineBreak();
    mdGen.addLine(summary.title.getMessage());
    mdGen.addParagraph(summary.body.getMessage());
  })

  if (hasErrors) {
    mdGen.addParagraph("Please resolve the applicable errors before moving forward with your PR.");
  }

  mdGen.addParagraph("Have a 20tastic day!");

  core.debug(`Sending summary to comment: ${mdGen.getMessage()}`);

  // #region Send To Github
  if (roll20deployComment) {
    const response = octokit.rest.issues.updateComment({
      owner: "Roll20",
      repo: repository,
      comment_id: roll20deployComment.id,
      body: mdGen.getMessage(),
    });
    core.debug(`Response: ${JSON.stringify(response)}`);
  }
  else {
    const response = octokit.rest.issues.createComment({
      owner: "Roll20",
      repo: repository,
      issue_number: pr.number,
      body: mdGen.getMessage(),
    });
    core.debug(`Response: ${JSON.stringify(response)}`);
  }
}
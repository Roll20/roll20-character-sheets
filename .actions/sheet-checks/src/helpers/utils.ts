import { join } from "path";
import { readFile } from "fs/promises";
import { isBinaryFile } from "isbinaryfile";
import * as core from "@actions/core";
import * as github from "@actions/github";
import { type ValidationStatus } from "../statuses";
import type { AnnotationProperties } from "@actions/core"

export async function getSheetFile(sheetFolder: string, fileName: string, { removeBinary = true } = {}) {
  const workspace = process.env["GITHUB_WORKSPACE"];
  if (!workspace && workspace !== "") {
    console.log("No workspace provided");
  }
  if (!fileName && fileName !== "") {
    console.log("No file name provided");
  }
  if (!sheetFolder && sheetFolder !== "") {
    console.log("No sheet folder provided");
  }
  const filePath = join(
    process.env["GITHUB_WORKSPACE"],
    sheetFolder,
    fileName,
  );
  try {
    if (removeBinary) {
      const isBinary = await isBinaryFile(filePath);
      if (isBinary) {
        return null;
      }
    }
    const file = await readFile(filePath, { encoding: "utf-8" });
    return file;
  } catch (e) {
    return null;
  }
};

export function getSheetFolder(filePath: string) {
  const pathParts = filePath.split("/");
  return pathParts[0];
};

export function appendAnnotation(status: ValidationStatus, annotation: AnnotationProperties): ValidationStatus {
  return {
    ...status,
    annotation
  }
}

export type Singletons = {
  octokit: ReturnType<typeof github.getOctokit> | undefined;
};

const singletonStorage: Singletons = {
  octokit: undefined,
};

export function getOctokit() {
  if (singletonStorage.octokit) {
    return singletonStorage.octokit;
  }

  const token = core.getInput("github-token", { required: true });
  singletonStorage.octokit = github.getOctokit(token);
  return singletonStorage.octokit;
};

export function getPRInfo() {
  const pr = github.context.payload.pull_request;
  if (!pr) {
    throw new Error("No PR found in context");
  }
  return pr;
}
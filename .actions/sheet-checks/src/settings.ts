import * as github from "@actions/github";

export const getSettings = (): any => {
  // Env vars are a mess in the way we have github actions.
  // Going to just use the branch as our test.
  let branch = github.context.ref.replace("refs/heads/", "");
  let repoName = github.context.repo.repo;

  let retval = {};

  if (["staging"].includes(branch)) {
    retval = {
      apiKey: process.env["STAGING_API_KEY"],
      sheetHttpUrl: "https://sheet-http.staging.roll20preflight.net",
      repoName: repoName,
      simulate: false,
    };
  } else if (["master"].includes(branch)) {
    retval = {
      apiKey: process.env["PRODUCTION_API_KEY"],
      sheetHttpUrl: "https://sheet-http.production.roll20preflight.net",
      repoName: repoName,
      simulate: false,
    };
  }
  return retval;
};

import * as core from "@actions/core";

export function getFileList() {
  const rawFileList = core.getInput("file-list");
  const sep = core.getInput("separator");
  const rawFiles = rawFileList.split(sep);
  core.debug(`Changed files in this commit: ${JSON.stringify(rawFiles)}`);
  return rawFiles;
};

export function convertToUtf8(input: string) {
  // Remove surrounding quotes
  const cleanedString = input.replace(/^['"]|['"]$/g, '');
  // Replace octal escape sequences with their UTF-8 characters
  const tmp = cleanedString.replace(/\\([0-3][0-7]{2})/g, (_, octal) => {
      // Convert octal to decimal, then to a UTF-8 character
      return String.fromCharCode(parseInt(octal, 8));
  });
  return Buffer.from(tmp, 'latin1').toString('utf8');
};

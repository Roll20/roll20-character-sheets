import {
  processLegacyCss,
  processLegacyHtml,
} from "@roll20/charsheet-relay-sdk";
import { BunFile } from "bun";

async function tryHtml(file: BunFile, legacySanitization: boolean) {
  const input = await file.text();
  return processLegacyHtml({ html: input, legacySanitization });
}

async function tryCss(file: BunFile, advanced: boolean | null) {
  const input = await file.text();
  return processLegacyCss(input, !!advanced);
}

async function handleChangedSheet(sheetDir: string) {
  const sheetMetadataFile = Bun.file(`${sheetDir}/sheet.json`);

  console.log("Sheet change detected: " + sheetDir);

  const sheet = await sheetMetadataFile.json();
  const { html, css, legacy: legacySanitization, advanced } = sheet;

  const htmlRes = await tryHtml(
    Bun.file(`${sheetDir}/${html}`),
    legacySanitization
  );
  console.log("Parsed HTML successfully: ", { [sheetDir]: Object.keys(htmlRes) });

  const cssRes = await tryCss(Bun.file(`${sheetDir}/${css}`), advanced);
  console.log(`Parsed CSS successfully (length=${cssRes.length})`);
}

async function main(args: string[]) {
  return Promise.all(
    args.map((path) => handleChangedSheet(path.split("/sheet.json")[0]))
  );
}

let jobStatus = 0;

main(Bun.argv.slice(2))
  .then()
  .catch(() => {
    jobStatus = 1;
  })
  .finally(() => {
    console.log("Job finished: " + jobStatus);
    process.exit(jobStatus);
  });

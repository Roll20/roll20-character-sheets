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
  return { css: processLegacyCss(input, !!advanced), rawCss: input };
}

async function onSheetChange(sheetDir: string) {
  const sheetMetadataFile = Bun.file(`${sheetDir}/sheet.json`);

  const sheet = await sheetMetadataFile.json();
  const {
    html: htmlPath,
    css: cssPath,
    legacy: legacySanitization,
    advanced,
  } = sheet;

  const htmlRes = await tryHtml(
    Bun.file(`${sheetDir}/${htmlPath}`),
    legacySanitization
  );
  const {
    html,
    workers: sheetworkers,
    rollTemplates: rolltemplates,
    mancer: mancertemplates,
  } = htmlRes;

  const cssRes = await tryCss(Bun.file(`${sheetDir}/${cssPath}`), advanced);
  const { css, rawCss } = cssRes;

  const data = {
    characterSheet: {
      css,
      rawCss,
      html,
      mancertemplates,
      rolltemplates,
      sheetworkers,
    },
  };
  await Bun.write(Bun.stdout, JSON.stringify(data));
}

async function main(args: string[]) {
  return Promise.all(
    args.map((path) => onSheetChange(path.split("/sheet.json")[0]))
  );
}

let jobStatus = 0;

main(Bun.argv.slice(2))
  .then()
  .catch(() => {
    jobStatus = 1;
  })
  .finally(() => {
    process.exit(jobStatus);
  });

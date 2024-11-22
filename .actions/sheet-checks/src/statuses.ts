import type { AnnotationProperties } from "@actions/core"

// Validation Types
export const VALIDATION_TYPES = {
  ERROR: "error",
  NOTICE: "notice",
  WARNING: "warning",
  SUCCESS: "success",
} as const;

export type ValidationTypeKey = keyof typeof VALIDATION_TYPES;
export type ValidationType = typeof VALIDATION_TYPES[keyof typeof VALIDATION_TYPES];

export const RESPONSIBILITY = {
  ROLL20: "Roll20",
  CONTRIBUTOR: "Contributor",
} as const;

export type ResponsibilityKey = keyof typeof RESPONSIBILITY;
export type Responsibility = typeof RESPONSIBILITY[keyof typeof RESPONSIBILITY];

export type ValidationStatus = {
  name: string;
  description: string;
  type: ValidationType;
  helpLink?: string;
  responsibility?: Responsibility;
  annotation?: AnnotationProperties;
};

// Validation Statuses
const INCORRECT_LINE_ENDINGS: ValidationStatus = {
  name: "INCORRECT_LINE_ENDINGS",
  description: "You have `CRLF` line endings in an attached file:",
  type: "error",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
}

const NO_SHEET_JSON: ValidationStatus = {
  name: "NO_SHEET_JSON",
  description: "Could not find a sheet.json in the provided files.",
  type: "error",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
};

const NO_PARSE_JSON: ValidationStatus = {
  name: "NO_PARSE_JSON",
  description: "Could not open the sheet.json as JSON.",
  type: "error",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
};

const NO_HTML_KEY: ValidationStatus = {
  name: "NO_HTML_KEY",
  description: "Could not find an 'html' key in sheet.json.",
  type: "error",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
};

const NO_HTML_FILE: ValidationStatus = {
  name: "NO_HTML_FILE",
  description: "Could not find a file by the name specified in your sheet.json.",
  type: "error",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
};

const TABLES_IN_HTML: ValidationStatus = {
  name: "TABLES_IN_HTML",
  description: "You have `<table>` tags in your HTML file. Please consult our Good Code policies to be sure they should be in your sheet.",
  type: "warning",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
}

const NO_CSS_KEY: ValidationStatus = {
  name: "NO_CSS_KEY",
  description: "Could not find a 'css' key in sheet.json.",
  type: "error",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
};

const CSS_FONT_ERROR: ValidationStatus = {
  name: "CSS_FONT_ERROR",
  description: "There is an error in the CSS file",
  type: "notice",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
}

const NO_CSS_FILE: ValidationStatus = {
  name: "NO_CSS_FILE",
  description: "Could not find a CSS file by the name specified in your sheet.json.",
  type: "error",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
};

const NO_TRANSLATION_FILE: ValidationStatus = {
  name: "NO_TRANSLATION_KEY",
  description: "Could not find a 'translation' file in your sheet. If you'd like to translate your sheet, more info can be found under 'Character Sheet Translation' at help.roll20.net.",
  type: "notice",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
};

const NO_PARSE_TRANSLATION: ValidationStatus = {
    name: "NO_PARSE_TRANSLATION",
    description: "Could not open the translation.json as JSON.",
    type: "error",
    responsibility: RESPONSIBILITY.CONTRIBUTOR,
}

const NO_PREVIEW_KEY: ValidationStatus = {
  name: "NO_PREVIEW_KEY",
  description: "Could not find a 'preview' key in sheet.json.",
  type: "error",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
};

const NO_PREVIEW_FILE: ValidationStatus = {
  name: "NO_PREVIEW_FILE",
  description: "Could not find a 'preview' file in your sheet.",
  type: "error",
  responsibility: RESPONSIBILITY.CONTRIBUTOR,
};

const SHEET_HTTP_GET_FAILED: ValidationStatus = {
  name: "SHEET_HTTP_GET_FAILED",
  description: "Could not reach sheet-http service.",
  type: "warning",
  responsibility: RESPONSIBILITY.ROLL20,
}

const NEW_SHEET: ValidationStatus = {
  name: "NEW_SHEET",
  description: "This is a new sheet, the development team will have to add this to the database.",
  type: "notice",
  responsibility: RESPONSIBILITY.ROLL20,
}

const CHANGING_DOT_FILE: ValidationStatus = {
  name: "CHANGING_DOT_FILE",
  description: "Pull Request attempting to change a configuration file.",
  type: "notice",
  responsibility: RESPONSIBILITY.ROLL20,
};

const CHANGING_ROOT_FILE: ValidationStatus = {
  name: "CHANGING_ROOT_FILE",
  description: "Pull Request attempting to change a file in the root directory.",
  type: "error",
  responsibility: RESPONSIBILITY.ROLL20,
};

const CHANGING_MULTIPLE_SHEETS: ValidationStatus = {
  name: "CHANGING_MULTIPLE_SHEETS",
  description: "Pull Request attempting to change files in multiple subdirectories.",
  type: "error",
  responsibility: RESPONSIBILITY.ROLL20,
};

const NO_SHEET_FOLDER: ValidationStatus = {
  name: "NO_SHEET_FOLDER",
  description: "Could not determine the sheet folder from the provided files.",
  type: "error",
  responsibility: RESPONSIBILITY.ROLL20,
};

const SKIPPED_ADVANCED_SHEET: ValidationStatus = {
  name: "SKIPPED_ADVANCED_SHEET",
  description: "This is an advanced sheet, so we didn't run any checks. If this sounds wrong, check your sheet.json!",
  type: "notice",
  responsibility: RESPONSIBILITY.ROLL20,
};

const NO_CODE_OWNERS_FILE: ValidationStatus = {
  name: "NO_CODE_OWNERS_FILE",
  description: "Could not find a CODEOWNERS file in the repository.",
  type: "error",
  responsibility: RESPONSIBILITY.ROLL20,
};

const INVALID_CODE_OWNERS_FILE: ValidationStatus = {
  name: "INVALID_CODE_OWNERS_FILE",
  description: "CODEOWNERS file is not formatted correctly.",
  type: "error",
  responsibility: RESPONSIBILITY.ROLL20,
};

const NOT_CODE_OWNER: ValidationStatus = {
  name: "NOT_CODE_OWNER",
  description: "The user submitting this PR is not listed as an authorized contributor to this sheet.",
  type: "error",
  responsibility: RESPONSIBILITY.ROLL20,
};

const IS_CODE_OWNER: ValidationStatus = {
  name: "IS_CODE_OWNER",
  description: "This user is an authorized contributor to this sheet.",
  type: "notice",
  responsibility: RESPONSIBILITY.ROLL20,
}

const NO_OWNER_GROUP_FOUND: ValidationStatus = {
  name: "NO_OWNER_GROUP_FOUND",
  description: "The following group could not be found in CODEOWNERS:",
  type: "error",
  responsibility: RESPONSIBILITY.ROLL20,
};

export const VALIDATION_STATUS = {
  INCORRECT_LINE_ENDINGS,
  NO_SHEET_JSON,
  NO_PARSE_JSON,
  NO_HTML_KEY,
  NO_HTML_FILE,
  TABLES_IN_HTML,
  NO_CSS_KEY,
  NO_CSS_FILE,
  NO_TRANSLATION_FILE,
  NO_PARSE_TRANSLATION,
  NO_PREVIEW_KEY,
  NO_PREVIEW_FILE,
  SHEET_HTTP_GET_FAILED,
  NEW_SHEET,
  CHANGING_DOT_FILE,
  CHANGING_ROOT_FILE,
  CHANGING_MULTIPLE_SHEETS,
  NO_SHEET_FOLDER,
  SKIPPED_ADVANCED_SHEET,
  CSS_FONT_ERROR,
  NO_CODE_OWNERS_FILE,
  INVALID_CODE_OWNERS_FILE,
  NOT_CODE_OWNER,
  IS_CODE_OWNER,
  NO_OWNER_GROUP_FOUND,
} as const;
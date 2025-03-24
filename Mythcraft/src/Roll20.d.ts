// Type definitions for Roll20 built-in functions and variables
// Definitions by: Karl Erik Hofseth https://github.com/Karlinator

declare type EventInfo = {
  newValue: string;
  previousValue: string;
  removedInfo: string;
  sourceAttribute: string;
  sourceType: string;
  triggerName: string;
};

declare type AttrValue = string | number | boolean;

declare type Attrs = { [key: string]: AttrValue };

declare function getAttrs(
  attributes: string[],
  callback?: (values: { [key: string]: string }) => void
): void;

declare function setAttrs(
  values: { [key: string]: AttrValue },
  options?: { silent?: boolean },
  callback?: (values: { [key: string]: string }) => void
): void;

declare function getSectionIDs(
  section_name: string,
  callback: (values: string[]) => void
): void;

declare function generateRowID(): string;

declare function removeRepeatingRow(RowID: string): void;

declare function getTranslationByKey(key: string): string | false;

declare function getTranslationLanguage(): string;

declare function setDefaultToken(values: { [key: string]: string }): void;

declare function on(
  event: string,
  callback: (eventInfo: EventInfo) => void
): void;

//- Drag & Drop
declare type CompendiumAttributes = {
  name: string;
  data: {
    Category: string;
    blobs: { [key: string]: unknown };
    expansion: number;
    //- This custom data added by the compendium owner
    [key: string]: AttrValue;
  };
  content: string;
};

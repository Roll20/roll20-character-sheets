export type SheetJSON = {
  html: string;
  css: string;
  authors: string;
  roll20userid: string;
  preview: string;
  instructions: string;
  compendium?: string;
  printable?: boolean;
  tags?: string;
  useroptions?: JSON;
  legacy?: boolean;
  advanced?: boolean;
};
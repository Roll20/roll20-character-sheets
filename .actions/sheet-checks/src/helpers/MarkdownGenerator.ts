export class MarkdownGenerator {
  private message: string = "";
  private defaultLineEnd = true;
  private complexLine: MarkdownGenerator | null = null;
  private tableWidth: number = 0;

  private insertLine(add: boolean): string {
    return add ? "\n" : "";
  }

  public addText(text: string): this {
    this.message += text;
    return this;
  }

  public addLine(line: string, lineEnd = this.defaultLineEnd): this {
    this.message += `${line}${this.insertLine(lineEnd)}`;
    return this;
  }

  public addParagraph(line: string, lineEnd = this.defaultLineEnd): this {
    this.message += `${line}${this.insertLine(lineEnd)}${this.insertLine(lineEnd)}`;
    return this;
  }

  public addHeader(size: number, header: string, lineEnd = this.defaultLineEnd): this {
    this.message += `${"#".repeat(size)} ${header}${this.insertLine(lineEnd)}`;
    return this;
  }

  public addBold(text: string, lineEnd = this.defaultLineEnd): this {
    this.message += `**${text}**${this.insertLine(lineEnd)}`;
    return this;
  }

  public addItalics(text: string, lineEnd = this.defaultLineEnd): this {
    this.message += `__${text}__${this.insertLine(lineEnd)}`;
    return this;
  }

  public addCodeBlock(code: string): this {
    this.message += `\`\`\`\n${code}\n\`\`\``;
    return this;
  }

  public addLink(text: string, url: string, lineEnd = this.defaultLineEnd): this {
    this.message += `[${text}](${url})${this.insertLine(lineEnd)}`;
    return this;
  }

  public addLineBreak(count = 1): this {
    this.message += "\n".repeat(count);
    return this;
  }

  public startDisclosure(summary: string): this {
    this.message += `<details>${this.insertLine(true)}`;
    return this;
  }

  public addDisclosureSummary(summary: string, lineEnd = this.defaultLineEnd): this {
    this.message += `<summary>${summary}</summary>${this.insertLine(lineEnd)}`;
    return this;
  }

  public endDisclosure(): this {
    this.message += `</details>${this.insertLine(true)}`;
    return this;
  }

  public startTable(width: number): this {
    this.tableWidth = width;
    return this;
  }

  public startTableHeader(): this {
    this.message += "|".padEnd(2);
    return this;
  }

  public addTableHeader(header: string): this {
    this.message += header.padEnd(this.tableWidth + 2) + "|";
    return this;
  }

  public endTableHeader(): this {
    this.message += this.insertLine(true);
    this.message += "|".padEnd(2) + "-".repeat(this.tableWidth).padEnd(this.tableWidth + 2, "-") + "|";
    return this;
  }

  public startTableRow(): this {
    this.message += "|".padEnd(2);
    return this;
  }

  public addTableCell(cell: string): this {
    this.message += cell.padEnd(this.tableWidth + 2) + "|";
    return this;
  }

  public endTableRow(): this {
    this.message += this.insertLine(true);
    return this;
  }

  public endTable(): this {
    this.tableWidth = 0;
    return this;
  }

  public addQuote(text: string, lineEnd = this.defaultLineEnd): this {
    this.message += `> ${text}${this.insertLine(lineEnd)}`;
    return this;
  }

  public addRule(lineEnd = this.defaultLineEnd): this {
    this.message += `---${this.insertLine(lineEnd)}`;
    return this;
  }

  public addNotice(text: string, lineEnd = this.defaultLineEnd): this {
    this.message += `> [!NOTE] ${this.insertLine(true)}`;
    this.message += `> ${text}${this.insertLine(lineEnd)}`;
    return this;
  }

  public addWarning(text: string, lineEnd = this.defaultLineEnd): this {
    this.message += `> [!WARNING] ${this.insertLine(true)}`;
    this.message += `> ${text}${this.insertLine(lineEnd)}`;
    return this;
  }

  public addError(text: string, lineEnd = this.defaultLineEnd): this {
    this.message += `> [!CAUTION] ${this.insertLine(true)}`;
    this.message += `> ${text}${this.insertLine(lineEnd)}`;
    return this;
  }

  public startComplexLine(): MarkdownGenerator {
    this.complexLine = new MarkdownGenerator();
    return this.complexLine;
  }

  public endComplexLine(): this {
    if (this.complexLine) {
      this.message += this.complexLine.getMessage();
      this.complexLine = null;
    }
    return this;
  };

  public getMessage(): string {
    return this.message;
  }
}
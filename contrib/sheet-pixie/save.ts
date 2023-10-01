function saveToFile(path: string, content: string) {
  return Bun.write(path, content);
}
export { saveToFile };

function saveToFile(path: string, content: string) {
  console.log("Writing content to file: " + path);
  return Bun.write(path, content);
}
export { saveToFile };

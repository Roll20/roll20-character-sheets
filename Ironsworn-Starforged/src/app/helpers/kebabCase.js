function kebabCase(string) {
  return string
    .toLowerCase()
    .replace(/[\s\/_]/g, '-') // catchng slashes in '50/50', etc
    .replace(/-+/g, '-'); // fixes stuff with spaces + dash
}

module.exports = kebabCase;

const setDropAttrs = (update: Attrs, silent = { silent: true }) => {
  try {
    setAttrs(update, silent);
  } catch (e) {
    dropWarning(`Error setting attributes: ${e}`);
  }
};

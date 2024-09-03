const resetRepeatingRows = (sections) => {
  sections.forEach((section) => {
    getSectionIDs(`repeating_${section}`, (ids) => {
      ids.forEach((id) => {
        removeRepeatingRow(`repeating_${section}_${id}`);
      });
    });
  });
};

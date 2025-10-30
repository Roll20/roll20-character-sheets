/* Sort Basic Spells Sheetworker */
on('clicked:sortspellsalphabetcially', function (eventInfo) {
  console.log(`Change detected: Sort Spells A-Z`);
  getSectionIDs('repeating_spells', (ids) => {
    // No repeating entries found... bail
    if (!ids.length) return;

    // Build a list of all attributes to fetch
    const fields = [];
    ids.forEach((id) => {
      fields.push(`repeating_spells_${id}_spell_name`);
    });

    getAttrs([...fields], (v) => {
      const spells = ids.map((id) => ({
        id,
        name: (v[`repeating_spells_${id}_spell_name`] || '').trim(),
      }));

      // A-Z Sorting logic
      spells.sort((a, b) => a.name.localeCompare(b.name, undefined, {sensitivity: 'base'}));

      // Apply the new order
      const order = spells.map((s) => `${s.id}`);
      setSectionOrder('spells', order);
      console.log(`Reordered repeating_spells:`, spells);
    });
  });
});
/* End of Sort Basic Spells Sheetworker */

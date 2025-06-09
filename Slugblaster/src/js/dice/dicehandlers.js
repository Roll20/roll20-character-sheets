on('clicked:roll-character', async (eventInfo) => {
  makeCharacterRoll();
});

on('clicked:roll-character-trick', async (eventInfo) => {
  makeCharacterRoll(true);
});

on('clicked:disaster', async (eventInfo) => {
  makeDisasterRoll();
});

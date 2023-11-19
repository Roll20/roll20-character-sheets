/**
 * This doesn't really work.
 * It gets the attributes that have values assigned, but not attributes that don't.
 * So most of each repeating section is empty since most modifier attributes aren't set.
 */
on("ready", () => {
  const getAttributes = (characterName) => {
    log(characterName);
    const characters = findObjs({ _type: "character", name: characterName });
    log(characters);
    const attributes = findObjs({
      _type: "attribute",
      _characterid: characters[0].id,
    });

    const an = attributes.reduce((p, a) => {
      if (a.get("name").includes("dark")) {
        p.push(a.get("name"));
      }
      return p;
    }, []);
    log(an);
    return;

    const attributeNames = attributes.map((a) => a.get("name"));
    log(attributeNames);
    log(attributeNames.length);
    const core = [];
    const repeating = {};
    attributeNames.forEach((name) => {
      if (name.startsWith("repeating")) {
        const [r, section, rowId, ...splitAttributeName] = name.split("_");
        const joinedAttributeName = splitAttributeName.join("_");
        repeating[section] = repeating[section] || new Set();
        repeating[section].add(joinedAttributeName);
      } else {
        core.push(name);
      }
    });
    Object.keys(repeating).forEach((sectionName) => {
      repeating[sectionName] = Array.from(repeating[sectionName]);
    });
    log(core);
    log(repeating);
  };

  on("chat:message", (msg) => {
    if ("api" === msg.type && /^!getattributes/.test(msg.content)) {
      log("getattributes");
      let args = msg.content.split(/\s+/);
      getAttributes(args[1]);
    }
  });
});

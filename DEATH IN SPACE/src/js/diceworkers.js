const makeRollString = (params) => {
  const { header, ability, category } = params;

  const template = [
    `@{wtype}`,
    `&{template:dis}`,
    `{{name=@{character_name}}}`,
    `{{header=${header}}}`,
    `{{category=${category}}}`,
    `{{roll=[[@{rtype}+${ability}]]}}`,
  ];

  return template.join(' ');
};

const makeRoll = async (rollString) => {
  const result = await startRoll(rollString);
  const { rollId, results } = result;
  finishRoll(rollId, results);
};

const rollAbility = async (ability) => {
  const [abilityName, abilityWord] = helpers.getTranslationByArray([ability, 'ability']);
  const abilityTag = `@{${ability}}[${abilityName}]`;

  const params = {
    header: abilityName,
    category: abilityWord,
    ability: abilityTag,
  };

  const rollString = makeRollString(params);
  makeRoll(rollString);
};

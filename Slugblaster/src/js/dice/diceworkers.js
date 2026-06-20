/**
 *
 * @param {*} params
 * @returns
 */
const makeRollTemplate = (params) => {
  const { title, subtitle, type, trick, dice, boosts, kicks } = params;
  const roll = params.roll || '[[1d6]]';

  const template = [
    '&{template:slugblaster}',
    '{{character=@{character_name}}}',
    `{{title=${title}}}`,
    subtitle ? `{{subtitle=${subtitle}}}` : '',
    `{{${type}=true}}`,
    `{{roll=${roll}}}`,
    '{{result=[[0]]}}',
  ];

  if (trick) template.push('{{trick=true}}');
  if (type === 'action') {
    template.push('{{@{dicetray_dare}=true}}');
    template.push(`{{boosts=${boosts}}}`);
    template.push(`{{kicks=${kicks}}}`);
  }

  Array.from(Array(dice).keys(), (die) => {
    template.push(`{{die${die + 1}=[[0]]}}`);
  });

  return template.filter((line) => line).join(' ');
};

const handleRollResults = async (results) => {
  const final = {};
  const { result, dice } = results.roll;

  dice.forEach((die, index) => {
    const key = `die${index + 1}`;
    final[key] = die;
  });

  final.result = result <= 3 ? 'fail' : result <= 5 ? 'mixed' : result === 6 ? 'success' : 'unk';

  return final;
};

const makeRoll = async (template) => {
  const result = await startRoll(template);
  const { rollId, results } = result;
  const parsed = await handleRollResults(results);
  finishRoll(rollId, parsed);
};

const makeCharacterRoll = (trick = false) => {
  const request = ['dicetray_boosts', 'dicetray_kicks', 'dicetray_dare'];
  getAttrs(request, (values) => {
    const boosts = +values.dicetray_boosts || 0;
    const kicks = +values.dicetray_kicks || 0;
    const dare = values.dicetray_dare || '';

    const dice = 1 + boosts + (dare === 'plus_1d6' ? 1 : 0);
    const kick = 0 + kicks + (dare === 'plus_kick' ? 1 : 0);
    const params = {
      title: 'Action Roll',
      // subtitle: 'Slugblaster Subtitle',
      type: 'action',
      dice: dice,
      roll: `[[${dice}d6kh1sd]]`,
      trick: trick,
      boosts: dice - 1,
      kicks: kick,
    };

    const template = makeRollTemplate(params);
    makeRoll(template);

    setAttrs({
      dicetray_boosts: 0,
      dicetray_kicks: 0,
      dicetray_dare: '',
    });
  });
};

const makeDisasterRoll = () => {
  const request = ['trouble', 'trouble_max'];
  getAttrs(request, (values) => {
    const trouble = +values.trouble || 0;
    const troubleMax = +values.trouble_max || G_CONSTANTS.trouble_max;
    const dice = troubleMax - trouble;
    const params = {
      title: 'Disaster Strikes!',
      subtitle: 'Everyone’s luck runs out eventually',
      type: 'disaster',
      dice: dice,
      roll: `[[${dice}d6kh1sd]]`,
    };

    const template = makeRollTemplate(params);
    makeRoll(template);
  });
};

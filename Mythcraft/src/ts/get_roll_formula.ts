const getRollFormula = (isPrimarySource: boolean, isSpellCard?: boolean) => {
  if (isSpellCard) {
    return "{{description=@{description}}}";
  }

  let abilityModifier = "@{spellcasting_ability}";

  if (!isPrimarySource) {
    abilityModifier = `ceil(${abilityModifier}/2)`;
  }

  return `{{dice=[[1d20+${abilityModifier}[ability]+(@{modifier}[modifier])+(?{TA/TD|0})[tactical bonus]+(@{luck_negative_modifier}[negative luck modifier])cs>@{critical_range}]]}} {{damage=[Damage](~repeating_spells-roll_damage)}} {{description=@{description}}}`;
};

const updateCreatureAttackRollFormula = (event: EventInfo) => {
  const { sourceAttribute, newValue, sourceType } = event;

  if (sourceType !== "player") {
    return;
  }

  const row = getFieldsetRow(sourceAttribute);
  const isAttack = newValue === "on";

  if (isAttack) {
    const update = {
      [`${row}_roll_formula`]:
        "{{dice=[[1d20+(@{bonus})+(?{TA/TD|0}[tactical bonus])]]}} {{action=@{range} @{type}. @{bonus} vs @{defense} }} {{damage=[Damage](~repeating_actions-roll_damage)}}",
    };
    setAttrs(update);
    return;
  }

  setAttrs({
    [`${row}_roll_formula`]: "{{description=@{description}}}",
  });
};

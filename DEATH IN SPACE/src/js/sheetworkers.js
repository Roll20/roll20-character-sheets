const setRollQueries = () => {
  const update = {};

  const [rollType, normal, advantage, disadvantage] = helpers.getTranslationByArray([
    'roll_type',
    'normal',
    'advantage',
    'disadvantage',
  ]);

  const rollQuery = `?{${rollType}|${normal}, 1d20|${advantage}, 2d20kh1|${disadvantage}, 2d20kl1}`;

  update[G_ROLL_ATTRIBUTE] = rollQuery;
  setAttrs(update);
};

const calculateTotalSlots = () => {
  getAllAttrs(
    (values, sections) => {
      const update = {};

      let total = 0;

      Object.keys(sections).forEach((section) => {
        switch (section) {
          case 'repeating_inventory': {
            const itemslots = sections[section].reduce((sum, id) => {
              const slot = +values[`${section}_${id}_item_slots`] || 0;
              const count = 1; // +values[`${section}_${id}_item_count`] || 0;
              return (sum += slot * count);
            }, 0);

            total += itemslots;
            break;
          }

          case 'repeating_weapons': {
            const wpnslots = sections[section].reduce((sum, id) => {
              return (sum += +values[`${section}_${id}_weapon_slots`] || 0);
            }, 0);

            total += wpnslots;
            break;
          }
        }
      });

      update.carry = total;
      setAttrs(update);
    },
    [...G_INVENTORY_REPEATING]
  );
};

const calculateTotalPowerCost = () => {
  getAllAttrs(
    (values, sections) => {
      const update = {};

      const total = Object.values(values).reduce((sum, val) => {
        return sum + (+val || 0);
      }, 0);

      update.total_power_cost = total;
      setAttrs(update);
      console.log(update);
      calculateOverheated(total);
    },
    [...G_MODULES_REPEATING]
  );
};

const calculateOverheated = (totalPower) => {
  getAttrs(G_MODULES_GLOBAL, (values) => {
    const update = {};
    const output = +values.output_power || 0;
    update.overheated = totalPower > output ? 1 : 0;
    console.log(update);
    setAttrs(update);
  });
};

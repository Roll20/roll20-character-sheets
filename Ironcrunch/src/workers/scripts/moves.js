const moves  = [
  { name: 'Pay the Price', value: 'pay_the_price' },
  { name: 'Ask the Oracle', value: 'ask_the_oracle' },
  { name: 'Burn Momentum', value: 'burn_momentum' },
  { name: 'Make an Effort', value: 'make_an_effort' },
  { name: 'Show Resilience', value: 'show_resilience' },
  { name: 'Find an Opportunity', value: 'find_an_opportunity' },
  { name: 'Reveal a Danger', value: 'reveal_a_danger' },
  { name: 'Manifest Insanity', value: 'manifest_insanity' },
  { name: 'Endure Harm', value: 'endure_harm' },
  { name: 'Endure Stress', value: 'endure_stress' },
  { name: 'Face Death', value: 'face_death' },
  { name: 'Face Desolation', value: 'face_desolation' },
  { name: 'Face a Setback', value: 'face_a_setback' },
  { name: 'Out of Supply', value: 'out_of_supply' },
  { name: 'Take on Overload', value: 'take_on_overload' },
  { name: 'Discover a Site', value: 'discover_a_sight' },
  { name: 'Delve the Depths', value: 'delve_the_depths' },
  { name: 'Check Your Gear', value: 'check_your_gear' },
  { name: 'Locate Your Objective', value: 'locate_your_objective' },
  { name: 'Escape the Depths', value: 'escape_the_depths' },
  { name: 'Face Danger', value: 'face_danger' },
  { name: 'Secure an Advantage', value: 'secure_an_advantage' },
  { name: 'Gather Information', value: 'gather_information' },
  { name: 'Undertake a Journey', value: 'undertake_a_journey' },
  { name: 'Reach Your Destination', value: 'reach_your_destination' },
  { name: 'Strike', value: 'strike' },
  { name: 'Clash', value: 'clash' },
  { name: 'Turn the Tide', value: 'turn_the_tide' },
  { name: 'Inflict Harm', value: 'inflict_harm' },
  { name: 'Foe Inflicts Harm', value: 'foe_inflicts_harm' },
  { name: 'Enter the Fray', value: 'enter_the_fray' },
  { name: 'Battle', value: 'battle' },
  { name: 'End the Fight', value: 'end_the_fight' },
  { name: 'Heal', value: 'heal' },
  { name: 'Hearten', value: 'hearten' },
  { name: 'Patch Equipment', value: 'patch_equipment' },
  { name: 'Resupply', value: 'resupply' },
  { name: 'Make Camp', value: 'make_camp' },
  { name: 'Take a Downtime', value: 'take_a_downtime' },
  { name: 'Swear An Iron Vow', value: 'swear_an_iron_vow' },
  { name: 'Fulfill Your Vow', value: 'fulfill_your_vow' },
  { name: 'Learn From Faults', value: 'learn_from_faults' },
  { name: 'Advance', value: 'advance' },
  { name: 'Trade', value: 'trade' },
  { name: 'Compel', value: 'compel' },
  { name: 'Sojourn', value: 'sojourn' },
  { name: 'Draw the Circle', value: 'draw_the_circle' },
  { name: 'Forge a Bond', value: 'forge_a_bond' },
  { name: 'Test Your Bond', value: 'test_your_bond' },
  { name: 'Write Your Epilogue', value: 'write_your_epilogue' },
  { name: 'Take Conditional Companion', value: 'take_conditional_companion' },
  { name: 'Conditional Companion Acts', value: 'conditional_companion_acts' },
  { name: 'Strengthen Their Loyalty', value: 'strengthen_their_loyalty' },
  { name: 'Conditional Companion Abandons', value: 'conditional_companion_abandons' },
  { name: 'Order Conditional Companion', value: 'order_conditional_companion' },
  { name: 'Not Assist Conditional Companion', value: 'not_assist_conditional_companion' },
  { name: 'Test Their Loyalty', value: 'test_their_loyalty' },
  { name: 'Companion Becomes Unconditional', value: 'companion_becomes_unconditional' }
]

// Search and Highlight Move
on('change:move_search', function(eventinfo) {
  for (var move of moves) {
    if (!eventinfo.newValue) {
      setAttrs({
        [`${move.value}_highlight`]: 'off'
      });
    } else if (move.name.toLocaleLowerCase().includes(eventinfo.newValue.toLocaleLowerCase())) {
      setAttrs({
        [`${move.value}_highlight`]: 'on'
      });
    } else {
      setAttrs({
        [`${move.value}_highlight`]: 'off'
      });
    };
  };
});

on('change:clear_search', function() {
  setAttrs({
    clear_search: 'off',
    move_search: ''
  });
  for (var move of moves) {
    setAttrs({
      [`${move.value}_highlight`]: 'off',
    });
  };
});

on('change:selected_move', function(eventinfo) {
  if (eventinfo.newValue !== 'none') {
    setAttrs({
      move_view: '2',
      move_preview: eventinfo.newValue
    });
  }
});

on('change:close_move_preview', function() {
  setAttrs({
    move_view: '1',
    selected_move: 'none'
  });
});

on('change:reveal_a_danger_button', function(eventinfo) {
  setAttrs({
    reveal_a_danger_tables: eventinfo.newValue
  });
});

on('change:find_an_opportunity_button', function(eventinfo) {
  setAttrs({
    find_an_opportunity_tables: eventinfo.newValue
  });
});

on('change:manifest_insanity_button', function(eventinfo) {
  setAttrs({
    manifest_insanity_tables: eventinfo.newValue
  });
});
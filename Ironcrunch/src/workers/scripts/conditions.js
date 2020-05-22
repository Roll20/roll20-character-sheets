on('change:amnesiac_button', function(eventinfo) {
  setAttrs({
    amnesiac: eventinfo.newValue
  });
});
on('change:amok_button', function(eventinfo) {
  setAttrs({
    amok: eventinfo.newValue
  });
});
on('change:attached_button', function(eventinfo) {
  setAttrs({
    attached: eventinfo.newValue
  });
});
on('change:blinded_button', function(eventinfo) {
  setAttrs({
    blinded: eventinfo.newValue
  });
});
on('change:compulsed_button', function(eventinfo) {
  setAttrs({
    compulsed: eventinfo.newValue
  });
});
on('change:corrupted_button', function(eventinfo) {
  setAttrs({
    corrupted: eventinfo.newValue
  });
});

on('change:cursed_button', function(eventinfo) {
  setAttrs({
    cursed: eventinfo.newValue
  });
});
on('change:dazed_button', function(eventinfo) {
  setAttrs({
    dazed: eventinfo.newValue
  });
});
on('change:deafened_button', function(eventinfo) {
  setAttrs({
    deafened: eventinfo.newValue
  });
});
on('change:dying_button', function(eventinfo) {
  setAttrs({
    dying: eventinfo.newValue
  });
});
on('change:encumbered_button', function(eventinfo) {
  setAttrs({
    encumbered: eventinfo.newValue
  });
});
on('change:hallucinating_button', function(eventinfo) {
  setAttrs({
    hallucinating: eventinfo.newValue
  });
});
on('change:hyperthermic_button', function(eventinfo) {
  setAttrs({
    hyperthermic: eventinfo.newValue
  });
});
on('change:hypothermic_button', function(eventinfo) {
  setAttrs({
    hypothermic: eventinfo.newValue
  });
});
on('change:maimed_button', function(eventinfo) {
  setAttrs({
    maimed: eventinfo.newValue
  });
});
on('change:mute_button', function(eventinfo) {
  setAttrs({
    mute: eventinfo.newValue
  });
});
on('change:palsied_button', function(eventinfo) {
  setAttrs({
    palsied: eventinfo.newValue
  });
});
on('change:phobiac_button', function(eventinfo) {
  setAttrs({
    phobiac: eventinfo.newValue
  });
});
on('change:poisoned_button', function(eventinfo) {
  setAttrs({
    poisoned: eventinfo.newValue
  });
});
on('change:reeled_button', function(eventinfo) {
  setAttrs({
    reeled: eventinfo.newValue
  });
});
on('change:shaken_button', function(eventinfo) {
  setAttrs({
    shaken: eventinfo.newValue
  });
});
on('change:starved_button', function(eventinfo) {
  setAttrs({
    starved: eventinfo.newValue
  });
});
on('change:stupefied_button', function(eventinfo) {
  setAttrs({
    stupefied: eventinfo.newValue
  });
});
on('change:suffocated_button', function(eventinfo) {
  setAttrs({
    suffocated: eventinfo.newValue
  });
});
on('change:tormented_button', function(eventinfo) {
  setAttrs({
    tormented: eventinfo.newValue
  });
});
on('change:unconscious_button', function(eventinfo) {
  setAttrs({
    unconscious: eventinfo.newValue
  });
});
on('change:unprepared_button', function(eventinfo) {
  setAttrs({
    unprepared: eventinfo.newValue
  });
});
on('change:unsteady_button', function(eventinfo) {
  setAttrs({
    unsteady: eventinfo.newValue
  });
});
on('change:weakened_button', function(eventinfo) {
  setAttrs({
    weakened: eventinfo.newValue
  });
});
on('change:wounded_button', function(eventinfo) {
  setAttrs({
    wounded: eventinfo.newValue
  });
});
on('change:encumbered', function(eventinfo) {
  const state = (eventinfo.newValue == 'on') ? '1' : '0'
  setAttrs({
    encumbered_enabled: state
  });
});
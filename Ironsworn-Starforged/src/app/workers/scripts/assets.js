on('change:repeating_assets:assettype', function(values) {
  setAttrs({
    ['repeating_assets_Asset' + values.previousValue]: 'off',
    ['repeating_assets_Asset' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:asset', function(values) {
  setAttrs({
    ['repeating_assets_' + values.previousValue]: 'off',
    ['repeating_assets_' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets:assettype', function(values) {
  setAttrs({
    ['repeating_module-assets_Asset' + values.previousValue]: 'off',
    ['repeating_module-assets_Asset' + values.newValue]: 'on'
  });
});

on('change:repeating_module-assets:asset', function(values) {
  setAttrs({
    ['repeating_module-assets_' + values.previousValue]: 'off',
    ['repeating_module-assets_' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets:assettype', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets_Asset' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets_Asset' + values.newValue]: 'on'
  });
});

on('change:repeating_support-vehicle-assets:asset', function(values) {
  setAttrs({
    ['repeating_support-vehicle-assets_' + values.previousValue]: 'off',
    ['repeating_support-vehicle-assets_' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:builder-titles', function(values) {
  setAttrs({
    ['repeating_assets_builder-titles-' + values.previousValue]: 'off',
    ['repeating_assets_builder-titles-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:builder-ability-1', function(values) {
  setAttrs({
    ['repeating_assets_builder-ability-1-' + values.previousValue]: 'off',
    ['repeating_assets_builder-ability-1-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:builder-ability-2', function(values) {
  setAttrs({
    ['repeating_assets_builder-ability-2-' + values.previousValue]: 'off',
    ['repeating_assets_builder-ability-2-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:builder-ability-3', function(values) {
  setAttrs({
    ['repeating_assets_builder-ability-3-' + values.previousValue]: 'off',
    ['repeating_assets_builder-ability-3-' + values.newValue]: 'on'
  });
});

on('change:repeating_assets:track-dropdown', function(values) {
  setAttrs({
    ['repeating_assets_track-dropdown-' + values.previousValue]: 'off',
    ['repeating_assets_track-dropdown-' + values.newValue]: 'on'
  });
});

const assets = [
  'ace-ability-1',
  'ace-ability-2',        
  'ace-ability-3',        
  'agent-ability-1',      
  'agent-ability-2',      
  'agent-ability-3',      
  'archer-ability-1',     
  'archer-ability-2',     
  'archer-ability-3',     
  'armored-ability-1',    
  'armored-ability-2',    
  'armored-ability-3',    
  'augmented-ability-1',  
  'augmented-ability-2',  
  'augmented-ability-3',  
  'bannersworn-ability-1',
  'bannersworn-ability-2',
  'bannersworn-ability-3',
  'banshee-ability-1',
  'banshee-ability-2',
  'banshee-ability-3',
  'blademaster-ability-1',
  'blademaster-ability-2',
  'blademaster-ability-3',
  'bonded-ability-1',
  'bonded-ability-2',
  'bonded-ability-3',
  'bounty-hunter-ability-1',
  'bounty-hunter-ability-2',
  'bounty-hunter-ability-3',
  'brawler-ability-1',
  'brawler-ability-2',
  'brawler-ability-3',
  'combat-bot-ability-1',
  'combat-bot-ability-2',
  'combat-bot-ability-3',
  'commander-ability-1',
  'commander-ability-2',
  'commander-ability-3',
  'courier-ability-1',
  'courier-ability-2',
  'courier-ability-3',
  'devotant-ability-1',
  'devotant-ability-2',
  'devotant-ability-3',
  'diplomat-ability-1',
  'diplomat-ability-2',
  'diplomat-ability-3',
  'empath-ability-1',
  'empath-ability-2',
  'empath-ability-3',
  'engine-upgrade-ability-1',
  'engine-upgrade-ability-2',
  'engine-upgrade-ability-3',
  'exosuit-ability-1',
  'exosuit-ability-2',
  'exosuit-ability-3',
  'expanded-hold-ability-1',
  'expanded-hold-ability-2',
  'expanded-hold-ability-3',
  'explorer-ability-1',
  'explorer-ability-2',
  'explorer-ability-3',
  'fated-ability-1',
  'fated-ability-2',
  'fated-ability-3',
  'firebrand-ability-1',
  'firebrand-ability-2',
  'firebrand-ability-3',
  'fugitive-ability-1',
  'fugitive-ability-2',
  'fugitive-ability-3',
  'gearhead-ability-1',
  'gearhead-ability-2',
  'gearhead-ability-3',
  'glowcat-ability-1',
  'glowcat-ability-2',
  'glowcat-ability-3',
  'grappler-ability-1',
  'grappler-ability-2',
  'grappler-ability-3',
  'gunner-ability-1',
  'gunner-ability-2',
  'gunner-ability-3',
  'gunslinger-ability-1',
  'gunslinger-ability-2',
  'gunslinger-ability-3',
  'haunted-ability-1',
  'haunted-ability-2',
  'haunted-ability-3',
  'healer-ability-1',
  'healer-ability-2',
  'healer-ability-3',
  'heavy-cannons-ability-1',
  'heavy-cannons-ability-2',
  'heavy-cannons-ability-3',
  'homesteader-ability-1',
  'homesteader-ability-2',
  'homesteader-ability-3',
  'hoverbike-ability-1',
  'hoverbike-ability-2',
  'hoverbike-ability-3',
  'internal-refit-ability-1',
  'internal-refit-ability-2',
  'internal-refit-ability-3',
  'kinetic-ability-1',
  'kinetic-ability-2',
  'kinetic-ability-3',
  'lore-hunter-ability-1',
  'lore-hunter-ability-2',
  'lore-hunter-ability-3',
  'loyalist-ability-1',
  'loyalist-ability-2',
  'loyalist-ability-3',
  'marked-ability-1',
  'marked-ability-2',
  'marked-ability-3',
  'medbay-ability-1',
  'medbay-ability-2',
  'medbay-ability-3',
  'mercenary-ability-1',
  'mercenary-ability-2',
  'mercenary-ability-3',
  'missile-array-ability-1',
  'missile-array-ability-2',
  'missile-array-ability-3',
  'naturalist-ability-1',
  'naturalist-ability-2',
  'naturalist-ability-3',
  'navigator-ability-1',
  'navigator-ability-2',
  'navigator-ability-3',
  'oathbreaker-ability-1',
  'oathbreaker-ability-2',
  'oathbreaker-ability-3',
  'outcast-ability-1',
  'outcast-ability-2',
  'outcast-ability-3',
  'overseer-ability-1',
  'overseer-ability-2',
  'overseer-ability-3',
  'protocol-bot-ability-1',
  'protocol-bot-ability-2',
  'protocol-bot-ability-3',
  'reinforced-hull-ability-1',
  'reinforced-hull-ability-2',
  'reinforced-hull-ability-3',
  'research-lab-ability-1',
  'research-lab-ability-2',
  'research-lab-ability-3',
  'revenant-ability-1',
  'revenant-ability-2',
  'revenant-ability-3',
  'rockhorn-ability-1',
  'rockhorn-ability-2',
  'rockhorn-ability-3',
  'rover-ability-1',
  'rover-ability-2',
  'rover-ability-3',
  'scavenger-ability-1',
  'scavenger-ability-2',
  'scavenger-ability-3',
  'scoundrel-ability-1',
  'scoundrel-ability-2',
  'scoundrel-ability-3',
  'seer-ability-1',
  'seer-ability-2',
  'seer-ability-3',
  'sensor-array-ability-1',
  'sensor-array-ability-2',
  'sensor-array-ability-3',
  'service-pod-ability-1',
  'service-pod-ability-2',
  'service-pod-ability-3',
  'shade-ability-1',
  'shade-ability-2',
  'shade-ability-3',
  'shields-ability-1',
  'shields-ability-2',
  'shields-ability-3',
  'shuttle-ability-1',
  'shuttle-ability-2',
  'shuttle-ability-3',
  'skiff-ability-1',
  'skiff-ability-2',
  'skiff-ability-3',
  'sidekick-ability-1',
  'sidekick-ability-2',
  'sidekick-ability-3',
  'slayer-ability-1',
  'slayer-ability-2',
  'slayer-ability-3',
  'sniper-ability-1',
  'sniper-ability-2',
  'sniper-ability-3',
  'snub-fighter-ability-1',
  'snub-fighter-ability-2',
  'snub-fighter-ability-3',
  'sprite-ability-1',
  'sprite-ability-2',
  'sprite-ability-3',
  'starship-ability-1',
  'starship-ability-2',
  'starship-ability-3',
  'stealth-tech-ability-1',
  'stealth-tech-ability-2',
  'stealth-tech-ability-3',
  'survey-bot-ability-1',
  'survey-bot-ability-2',
  'survey-bot-ability-3',
  'symbiote-ability-1',
  'symbiote-ability-2',
  'symbiote-ability-3',
  'tech-ability-1',
  'tech-ability-2',
  'tech-ability-3',
  'trader-ability-1',
  'trader-ability-2',
  'trader-ability-3',
  'utility-bot-ability-1',
  'utility-bot-ability-2',
  'utility-bot-ability-3',
  'vanguard-ability-1',
  'vanguard-ability-2',
  'vanguard-ability-3',
  'vehicle-bay-ability-1',
  'vehicle-bay-ability-2',
  'vehicle-bay-ability-3',
  'vestige-ability-1',
  'vestige-ability-2',
  'vestige-ability-3',
  'veteran-ability-1',
  'veteran-ability-2',
  'veteran-ability-3',
  'voidborn-ability-1',
  'voidborn-ability-2',
  'voidborn-ability-3',
  'voidglider-ability-1',
  'voidglider-ability-2',
  'voidglider-ability-3',
  'weapon-master-ability-1',
  'weapon-master-ability-2',
  'weapon-master-ability-3',
  'workshop-ability-1',
  'workshop-ability-2',
  'workshop-ability-3'
]

// function buildAssetEvents (impacts) {
//   return impacts.map(impact => `change:${impact}`).join(' ')
// }

// on('change:repeating_assets:track-dropdown', function(values) {
  
// });
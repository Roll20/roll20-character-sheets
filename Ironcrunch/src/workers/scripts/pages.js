on('change:character_page_button', function(eventinfo) {
  setAttrs({
    character_page: eventinfo.newValue
  });
});

on('change:companion_page_button', function(eventinfo) {
  setAttrs({
    companion_page: eventinfo.newValue
  });
});

on('change:shared_page_button', function(eventinfo) {
  setAttrs({
    shared_page: eventinfo.newValue
  });
});

on('change:mode_button', function(eventinfo) {
  setAttrs({
    mode: eventinfo.newValue,
    modes_choice: 'off'
  });
});

on('change:stat_mode_button', function(eventinfo) {
  setAttrs({
    stat_mode: eventinfo.newValue,
  });
});

on('change:repeating_sites:site_details_button', function(eventinfo) {
  if (eventinfo.newValue == 'on') {
    setAttrs({
      repeating_sites_site_details: eventinfo.newValue,
      repeating_sites_site_theme_domain: 'off',
      repeating_sites_site_theme_domain_button: 'off'
    });
  } else {
    setAttrs({
      repeating_sites_site_details: eventinfo.newValue,
    });
  }
});

on('change:repeating_sites:site_theme_domain_button', function(eventinfo) {
  if (eventinfo.newValue == 'on') {
    setAttrs({
      repeating_sites_site_theme_domain: eventinfo.newValue,
      repeating_sites_site_details: 'off',
      repeating_sites_site_details_button: 'off'
    });
  } else {
    setAttrs({
      repeating_sites_site_theme_domain: eventinfo.newValue,
    });
  }
});

on('change:theme_preview_button', function(eventinfo) {
  setAttrs({
    theme_preview: eventinfo.newValue
  });
});

on('change:domain_preview_button', function(eventinfo) {
  setAttrs({
    domain_preview: eventinfo.newValue,
  });
});
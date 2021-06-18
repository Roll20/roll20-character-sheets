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

on('change:repeating_sites:theme_select', function(eventinfo) {
  setAttrs({
    repeating_sites_theme: eventinfo.newValue,
  });
});

on('change:repeating_sites:domain_select', function(eventinfo) {
  setAttrs({
    repeating_sites_domain: eventinfo.newValue,
  });
});
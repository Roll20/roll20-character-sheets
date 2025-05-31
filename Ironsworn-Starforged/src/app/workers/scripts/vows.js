on("remove:repeating_vow remove:repeating_connection remove:repeating_progress remove:repeating_assets", function() {
  const timestamp = Number(new Date());
  setAttrs({ repeat_delete: timestamp });
});

on("clicked:show_core", (eventInfo) => {
  let toUpdate = {}
  toUpdate["page"] = "core";
  setAttrs(toUpdate);
});
on("clicked:show_bio", (eventInfo) => {
  let toUpdate = {}
  toUpdate["page"] = "bio";
  setAttrs(toUpdate);
});
on("clicked:show_config", (eventInfo) => {
  let toUpdate = {}
  toUpdate["page"] = "config";
  setAttrs(toUpdate);
});
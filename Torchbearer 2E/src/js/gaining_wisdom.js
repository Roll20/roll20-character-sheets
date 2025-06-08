const wiseAttrs = [];

[1, 2, 3, 4].forEach(function (value) {
  wiseAttrs.push("wise" + value + "_pass");
  wiseAttrs.push("wise" + value + "_fail");
  wiseAttrs.push("wise" + value + "_fate");
  wiseAttrs.push("wise" + value + "_persona");
});

wiseAttrs.forEach(function (wises) {
  on("change:" + wises, function (eventInfo) {
    getAttrs(wiseAttrs, function (values) {
      for (let i = 1; i <= 4; i++) {
        if (values["wise" + i + "_pass"] == 1
          && values["wise" + i + "_fail"] == 1
          && values["wise" + i + "_fate"] == 1
          && values["wise" + i + "_persona"] == 1) {
          setAttrs({ rolling_gaining_wisdom: true });
          return;
        }
      }

      setAttrs({ rolling_gaining_wisdom: false });
    });
  });
});

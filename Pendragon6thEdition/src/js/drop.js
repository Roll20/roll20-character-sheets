const handle_drop = (category) => {
  getAttrs(["drop_name", "drop_data", "drop_content"], (v) => {
    let pagedata = v.drop_data;

    try {
      pagedata = JSON.parse(v.drop_data);
    } catch (e) {
      console.log(`Error parsing JSON: ${v.drop_data}`);
    }

    const page = {
      name: v.drop_name,
      data: pagedata,
      content: v.drop_content,
    };
    const category = page.data["Category"];
    // get_repeating_data(function (repeating) {
    //   var results = processDrop(page, v, repeating);
    //   setAttrs(
    //     results.update,
    //     {
    //       silent: true,
    //     },
    //     function () {
    //       results.callbacks.forEach(function (callback) {
    //         callback();
    //       });
    //     }
    //   );
    // });
  });
};

on("change:drop_category", (event) => {
  console.log(event);
  handle_drop(eventinfo.newValue);
});

on("change:drop_name", (event) => {
  console.log(event);
});

on("change:drop_data", (event) => {
  console.log(event);
});

on("change:drop_content", (event) => {
  console.log(event);
});

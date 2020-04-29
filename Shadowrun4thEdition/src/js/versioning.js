const versioning = version => {
  	console.log(`%c Shadowrun 5th Edition versioning, ${version}`, "color: darkblue; font-weight:bold");

    switch(true) {
        case version < 1:
          console.log(`%c Shadowrun 5th Edition versioning, ${version}`, "color: darkblue; font-weight:bold");
          //onepointthreefive()
          //setAttrs({version: 1.35}, () => versioning(1.35))
          break;
        default:
            console.log(`%c Shadowrun 5th Edition is update to date. Version ${version}`, "color: green; font-weight:bold");
    }
};


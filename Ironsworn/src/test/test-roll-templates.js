$(document).ready(() => {
  // store roll templates
  const rollTemplates = {};
  const template = $('rolltemplate');
  template.each(function () {
    const templateId = $(this).attr('class').substring('sheet-rolltemplate-'.length);
    rollTemplates[templateId] = this.innerHTML;
  });
  template.remove();

  // render templates from specs
  rollSpecs.filter(_ => _.display === undefined || _.display).forEach(spec => {
    const template = rollTemplates[spec.templateId];

    // preprocess values
    const rollValues = {};
    for (const name in spec.values) {
      let value = spec.values[name];

      // we want to check that roll values are formatted correctly (i.e. [[value]]),
      // but they must appear with their value when rendering the template,
      // so we store them aside and replace the "[[value]]" with "value" in the spec values.
      if (value.startsWith('[[') && value.endsWith(']]') && value.indexOf(' ') == -1) {
        const numericValue = Number.parseInt(value.substring(2, value.length - 2)).valueOf();
        rollValues[name] = numericValue;

        const rollType = numericValue == 1 ? 'fullfail' : (numericValue == 6 || numericValue == 10) ? 'fullcrit' : '';
        spec.values[name] = `<span class="inlinerollresult showtip tipsy-n-right ${rollType}">${rollValues[name]}</span>`;

      } else {
        // localize values (currently roll20 does not localize inline rolls)
        for (const group of value.matchAll(/\^{(.+?)}/g)) {
          const i18nValue = i18next.t(group[1], '');
          if (i18nValue) {
            value = value.replace(group[0], i18nValue);
          }
        }

        spec.values[name] = value;
      }
    }

    // handle sections with helper functions: parse the template,
    // resolve section that contain a function and store the section name with its computed value
    const computedValues = {};

    Mustache.parse(template).forEach(token => {
      processToken(token);

      function processToken(token) {
        if (token[0] == '#') {
          // WARNING mustache uses ^ and / to open/close an inverted section,
          // but for whatever reason (old mustache version perhaps),
          // roll20 uses #^ and /^, which means the inversion must be computed here,
          // using ^... as section name.
          const sectionName = token[1];
          const isInverted = sectionName.startsWith('^');
          const parts = sectionName.split(' ');
          const functionName = isInverted ? parts[0].substring(1) : parts[0];

          switch (functionName) {
            case 'rollTotal()':
            case 'rollGreater()':
            case 'rollLess()':
            case 'rollBetween()':
              if (computedValues[sectionName] === undefined) {
                computedValues[sectionName] = evaluateFunction(functionName, parts.slice(1), isInverted);
              }
              break;

            default: {
              if (functionName.endsWith('()')) {
                console.warn(`Unsupported function '${functionName}' in template ${spec.templateId}`);
              }
            }
          }
        }

        // continue into the token tree
        if (token[4]) {
          token[4].forEach(token => processToken(token));
        }

        function evaluateFunction(functionName, args, isInverted) {
          const rollValue = getRollValue(args[0]);
          const values = args.slice(1).map(_ => getFunctionValue(_));

          if (rollValue === undefined || values.some(_ => _ === undefined)) {
            return false;

          } else {
            let result;
            switch (functionName) {
              case 'rollTotal()':
                result = rollValue == values[0];
                break;
              case 'rollGreater()':
                result = rollValue > values[0];
                break;
              case 'rollLess()':
                result = rollValue < values[0];
                break;
              case 'rollBetween()':
                result = values[0] <= rollValue && rollValue <= values[1];
                break;
              default:
                throw `Unhandled function name '${functionName}'`;
            }

            return isInverted ? !result : result;
          }
        }

        function getFunctionValue(value) {
          const number = Number.parseInt(value);
          if (Number.isNaN(number)) {
            return getRollValue(value);
          }
          return number.valueOf();
        }

        function getRollValue(rollName) {
          const value = rollValues[rollName];

          if (value !== undefined) {
            return value;

          } else {
            // if the roll was also not in the spec list, that's fine
            if (spec.values[rollName] === undefined) {
              console.warn('Usage of unspecified roll name: ' + rollName);
              return undefined;

              // otherwise this is an error
            } else {
              throw `'${rollName}' is not formatted as a valid inline roll, i.e. [[rollValue]]`;
            }
          }
        }

      }
    });

    const container = $(`<div class="sheet-rolltemplate-${spec.templateId}" style="margin-bottom: 10px"></div>`)
      .append(Mustache.render(template, { ...spec.values, ...computedValues }, undefined, { escape: _ => _ }));
    localize(container);
    $('#rolls').append(container);
  });
});

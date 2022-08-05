const ATTR_PREFIX = 'attr_';
const REPEATING_PREFIX = 'repeating_';

// events handling
const eventHandlers = {};

window.on = (eventNames, fn) => eventNames.split(' ').forEach(eventName => {
  eventName = eventName.toLowerCase();

  let handlers;
  if (!eventHandlers.hasOwnProperty(eventName)) {
    handlers = [];
    eventHandlers[eventName] = handlers;
  } else {
    handlers = eventHandlers[eventName];
  }

  console.log('Registering handler for event ' + eventName);

  handlers.push(fn);
});

$(document).ready(() => {
  const inputSelector = `input[name^='${ATTR_PREFIX}'], select[name^='${ATTR_PREFIX}']`;

  // rename items that are in a fieldset (repeating section)
  function isSharedSheetItem(item) {
    // determines if an item belongs to the shared sheet,
    // i.e. it has a parent with an input marking a shared page
    if (item.siblings(`input[name='${ATTR_PREFIX}shared_page']`).length > 0) {
      return true;
    }

    const parent = item.parent();
    if (parent.length > 0) {
      return isSharedSheetItem(parent);
    }

    return false;
  }

  $('fieldset').each(function () {
    const fieldset = $(this);
    const fieldsetId = fieldset.attr('class').split(' ').find(_ => _.startsWith(REPEATING_PREFIX));

    // exclude fieldsets that are for the shared sheet, because they have the same name as in the character sheet and it fucks up the system
    // (having the same name is not supposed to be supported in roll20 either)
    if (!isSharedSheetItem(fieldset)) {
      fieldset.find(`${inputSelector}, span[name^='${ATTR_PREFIX}']`).each(function () {
        const input = $(this);
        const attributeName = `${fieldsetId}_${input.attr('name').substring(ATTR_PREFIX.length)}`;
        input.attr('name', `${ATTR_PREFIX}${attributeName}`);
      });
    }
  });

  // handle changes for input and select
  $(`input[name^='${ATTR_PREFIX}'], select[name^='${ATTR_PREFIX}']`).each(function () {
    const input = $(this);

    input.change(event => {
      const inputName = input.attr('name');

      // get the value
      let value;
      if (input.attr('type') === 'checkbox') {
        value = event.target.checked ? 'on' : 'off';
      } else {
        value = event.target.value;
      }

      console.log(`New value for input ${inputName}: ${value}`);

      // set the attribute value
      let attributeName = inputName.substring(ATTR_PREFIX.length);
      setAttrs({ [`${attributeName}`]: value });
    });
  });

  // handle rolls
  $("button[type='roll']").each(function () {
    const button = $(this);
    button.click(() => {
      window.alert(button.val());
    });
  });
});

// attributes handling
function getAttributeValue(attributeName) {
  if (attributeStore.hasOwnProperty(attributeName)) {
    return attributeStore[attributeName];
  } else {
    return undefined;
  }
}

window.getAttrs = (attributeNames, fn) => {
  const values = {};
  for (let i = 0; i < attributeNames.length; i++) {
    const attributeName = attributeNames[i];

    values[attributeName] = getAttributeValue(attributeName);
  }

  fn(values);
}

window.setAttrs = attributes => {
  const previousValues = {};
  for (const attributeName in attributes) {
    previousValues[attributeName] = getAttributeValue(attributeName);
  }

  Object.assign(attributeStore, attributes);

  console.log('Stored attributes: ' + JSON.stringify(attributes));

  for (const attributeName in attributes) {
    const attributeValue = attributes[attributeName];

    const fieldsetId = attributeName.startsWith(REPEATING_PREFIX)
      ? attributeName.substring(0, attributeName.indexOf('_', REPEATING_PREFIX.length))
      : null;

    // set input value
    const inputName = ATTR_PREFIX + attributeName.toLowerCase();
    let input = $(`input[name='${inputName}'], select[name='${inputName}']`);

    console.log(`Updating input ${inputName} with value ${attributeValue}`);

    input.val([attributeValue]);

    // set span text
    const span = $(`span[name='${ATTR_PREFIX}${attributeName.toLowerCase()}']`);
    span.text(attributeValue);

    // invoke event handlers
    let eventName;
    if (fieldsetId) {
      const eventAttributeName = attributeName.substring(fieldsetId.length + 1);
      eventName = `change:${fieldsetId}:${eventAttributeName}`;
    } else {
      eventName = `change:${attributeName}`;
    }
    eventName = eventName.toLowerCase();

    if (eventHandlers.hasOwnProperty(eventName)) {
      console.log('Invoking handlers for event: ' + eventName);

      eventHandlers[eventName].forEach(handler => handler({
        previousValue: previousValues[attributeName],
        newValue: attributeValue,
        sourceAttribute: attributeName
      }));
    }
  }
};

// initialize attributes
$(document).ready(() => {
  setAttrs(attributeStore);
});

const ATTR_PREFIX = 'attr_';
const REPEATING_PREFIX = 'repeating_';

// events handling
const eventHandlers = {};

window.on = (eventNames, fn) => eventNames.split(' ').forEach(eventName => {
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
  $(`input[name^='${ATTR_PREFIX}'], select[name^='${ATTR_PREFIX}']`).each(function () {
    const input = $(this);



    input.change(event => {
      const inputName = input.attr('name');
      let value;
      if (input.attr('type') === 'checkbox') {
        value = event.target.checked ? 'on' : 'off';
      } else {
        value = event.target.value;
      }

      console.log(`New value for input ${inputName}: ${value}`);

      let attributeName = inputName.substring(ATTR_PREFIX.length);
      const fieldset = input.closest('fieldset'); // names of attributes in a fieldset are prefixed by its class
      if (fieldset.length > 0) {
        attributeName = `${fieldset.attr('class')}_${attributeName}`;
      }
      setAttrs({ [`${attributeName}`]: value });
    });
  });

  $("button[type='roll']").each(function () {
    const button = $(this);
    button.click(() => {
      console.log(button.val());
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
  const oldValues = {};
  for (const attributeName in attributes) {
    oldValues[attributeName] = getAttributeValue(attributeName);
  }

  Object.assign(attributeStore, attributes);

  console.log('Stored attributes: ' + JSON.stringify(attributes));

  for (const storedAttributeName in attributes) {
    const attributeValue = attributes[storedAttributeName];

    // handle the attribute in a repeating section: its actual name is after the 2nd underscore
    const fieldsetId = storedAttributeName.startsWith(REPEATING_PREFIX) ? storedAttributeName.substring(0, storedAttributeName.indexOf('_', REPEATING_PREFIX.length)) : null;

    let attributeName = storedAttributeName;
    if (fieldsetId) {
      attributeName = storedAttributeName.substring(fieldsetId.length + 1);
    }

    // set input value
    const inputName = ATTR_PREFIX + attributeName;
    const inputSelector = `input[name='${inputName}'], select[name='${inputName}']`;
    let input;
    if (fieldsetId) {
      input = $(`fieldset[class='${fieldsetId}']`).children(inputSelector);
    } else {
      input = $(inputSelector);
    }
    console.log(`Updating input ${inputName} with value ${attributeValue}`);

    input.val([attributeValue]);

    // set span text
    const span = $(`span[name='${ATTR_PREFIX}${attributeName}']`);
    span.text(attributeValue);

    // invoke event handlers
    let eventName;
    if (storedAttributeName.startsWith(REPEATING_PREFIX)) {
      eventName = `change:${fieldsetId}:${attributeName}`;
    } else {
      eventName = `change:${attributeName}`;
    }
    if (eventHandlers.hasOwnProperty(eventName)) {
      console.log('Invoking handlers for event: ' + eventName);

      eventHandlers[eventName].forEach(handler => handler({
        oldValue: oldValues[storedAttributeName],
        newValue: attributeValue,
        sourceAttribute: storedAttributeName
      }));
    }
  }
};

// initialize attributes
$(document).ready(() => {
  setAttrs(attributeStore);
});

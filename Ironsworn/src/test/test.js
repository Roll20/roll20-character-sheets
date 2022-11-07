const ATTR_PREFIX = 'attr_';
const REPEATING_PREFIX = 'repeating_';
const ROWID_PREFIX = 'rowid';

// events handling
const eventHandlers = {}; // stores the handlers for each sheet event: event_name => [handler]

window.on = function (eventNames, fn) {
  eventNames.split(' ').forEach(eventName => {
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
};

// attributes handling
const attributeStore = { // stores the attribute values, backend for getAttrs/setAttrs
  setValue: function (attributeFullName, value) {
    attributeFullName = attributeFullName.toLowerCase();
    this[attributeFullName] = value;
  },

  getValue: function (attributeFullName) {
    attributeFullName = attributeFullName.toLowerCase();
    if (this.hasOwnProperty(attributeFullName)) {
      return this[attributeFullName];
    } else {
      return undefined;
    }
  }
};

let currentRepeatingContext = undefined; // stores the repeating section info when an input change is triggered

window.getAttrs = (attributeNames, fn) => {
  const values = {};
  for (attributeName of attributeNames) {
    const attribute = createAttribute(attributeName);
    values[attributeName] = attributeStore.getValue(attribute.fullName);
  }

  fn(values);
}

window.setAttrs = (attributeValues, isInit) => {
  const attributes = [];

  for (const attributeName in attributeValues) {
    // build attribute
    const attribute = createAttribute(attributeName);
    attribute.currentValue = attributeStore.getValue(attribute.fullName);
    attribute.newValue = attributeValues[attributeName];

    attributes.push(attribute);

    // store the new value
    attributeStore.setValue(attribute.fullName, attribute.newValue);
  }

  console.log(`Stored attributes: ${JSON.stringify(attributeValues)} as ${JSON.stringify(attributes.map(_ => _.fullName))}`);

  // react to value changes
  for (const attribute of attributes) {
    // if the value changed
    if (attribute.currentValue !== attribute.newValue || isInit) {
      // set the value of the inputs matching the attribute, which may be in a section
      if (attribute.sectionName) {
        const repContainers = $(`.repcontainer[data-groupname="${attribute.sectionName}"]`);
        repContainers.each(function () { // loop on all matching containers to support fieldsets with same name
          const repContainer = $(this);
          let repItem = $(`.repitem[data-reprowid="${attribute.rowId}"]`, repContainer);
          if (repItem.length == 0) { // if the specified row does not exist create the item with this row ID
            repItem = createSectionRow(repContainer, attribute.rowId);
          }

          setValue(repItem);
        });
      } else {
        setValue($('body'));
      }

      function setValue(inputParent) {
        // set input value
        const shortName = attribute.shortName;
        const inputName = ATTR_PREFIX + shortName;

        console.log(`Updating input ${inputName}${attribute.sectionName ? ' in ' + attribute.sectionName + '_' + attribute.rowId : ''} with value ${attribute.newValue}`);

        let input = inputParent.find(`input[name='${inputName}'], input[data-attrname='${shortName}'], select[name='${inputName}'], textarea[name='${inputName}'],
          input[name='${inputName.toLowerCase()}'], input[data-attrname='${shortName.toLowerCase()}'], select[name='${inputName.toLowerCase()}'], textarea[name='${inputName.toLowerCase()}']`);
        if (!input.prop('disabled')) { // it seems roll20 explicitly does not update values of disabled inputs (perhaps linked to autocalc inputs needing to be disabled)
          input.val([attribute.newValue]);
        }

        // set span text
        let span = inputParent.find(`span[name='${inputName}'], span[name='${inputName.toLowerCase()}']`);
        span.text(attribute.newValue);
      }

      // invoke event handlers
      if (isInit) { // on init set the context, otherwise event handlers may fail
        if (attribute.sectionName) {
          currentRepeatingContext = {
            sectionName: attribute.sectionName,
            rowId: attribute.rowId
          };
        } else {
          currentRepeatingContext = undefined;
        }
      }

      const eventInfo = {
        previousValue: attribute.currentValue,
        newValue: attribute.newValue,
        sourceAttribute: attribute.fullName
      }
      invokeEvent(`change:${attribute.shortName}`);
      //invokeEvent(`change:${attribute.shortName}_max`);
      if (attribute.sectionName) {
        invokeEvent(`change:${attribute.sectionName}`);
        invokeEvent(`change:${attribute.sectionName}:${attribute.shortName}`);
      }

      function invokeEvent(eventName) {
        eventName = eventName.toLowerCase();

        if (eventHandlers.hasOwnProperty(eventName)) {
          console.log(`Invoking handlers for event ${eventName} with ${JSON.stringify(eventInfo)}`);
          eventHandlers[eventName].forEach(function (handler) { handler(eventInfo) });
        }
      }
    }
  }

  // on init, store again because creating repeating section items initializes the items values,
  // which overwrites initialization values
  if (isInit) {
    for (const attribute of attributes) {
      attributeStore.setValue(attribute.fullName, attribute.newValue);
    }
  }
};

function createAttribute(attributeName) {
  // supported names are:
  // <attribute_name>
  // <sectionName>_<attributeShortname> with sectionName = repeating_<any>
  // <sectionName>_<rowId>_<attributeShortname> with sectionName = repeating_<any> and rowId = rowid<any>
  const attribute = {};
  const nameParts = attributeName.split('_');
  if (attributeName.startsWith(REPEATING_PREFIX)) {
    attribute.sectionName = nameParts[0] + '_' + nameParts[1];
    if (nameParts[2].startsWith(ROWID_PREFIX)) {
      attribute.rowId = nameParts[2];
      attribute.shortName = nameParts.slice(3).join('_');
    } else {
      if (currentRepeatingContext.sectionName != attribute.sectionName) {
        throw `The row ID must be specified when the section name is different from the call context: ${attributeName} vs ${currentRepeatingContext.sectionName}`;
      }
      attribute.rowId = currentRepeatingContext.rowId;
      attribute.shortName = nameParts.slice(2).join('_');
    }
    attribute.fullName = `${attribute.sectionName}_${attribute.rowId}_${attribute.shortName}`;

  } else {
    attribute.shortName = attributeName;
    attribute.fullName = attribute.shortName;
  }

  return attribute;
}

function createSectionRow(repContainer, rowId) {
  const sectionName = repContainer.attr('data-groupname');

  // add a new rep item with the content of the fieldset
  const repItem = $(`<div class="repitem" data-reprowid="${rowId}">`);
  const itemControl = $('<div class="itemcontrol">');
  const deleteButton = $('<button class="btn btn-danger pictos repcontrol_del">#</button>');
  itemControl.append(deleteButton);
  repItem.append(itemControl);

  const fieldset = repContainer.prev();
  repItem.append(fieldset.html());

  // make attribute names unique for radio button to allow proper radio behavior
  const radioId = generateRowID();
  repItem.find(`input[name^="${ATTR_PREFIX}"][type="radio"]`).each(function () {
    const input = $(this);
    const attributeName = getInputAttributeName(input);
    input.attr('name', `${ATTR_PREFIX}${radioId}_${sectionName}_${attributeName}`);
    input.attr('data-attrname', attributeName);
  });

  repContainer.append(repItem);

  // instrument the inputs for the new item
  instrumentInputs(repItem);

  deleteButton.click(e => {
    const button = $(e.target);

    // delete all the rows in the document with the same section and ID
    const repItem = button.parents('.repitem');
    const rowId = repItem.attr('data-reprowid');
    const sectionName = repItem.parent('.repcontainer').attr('data-groupname');

    $(`[data-groupname="${sectionName}"]`).children(`[data-reprowid="${rowId}"]`).remove();
  });

  return repItem;
}

window.generateRowID = () => {
  let result = ROWID_PREFIX;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

$(document).ready(function () {
  // instrument inputs
  instrumentInputs($('body'));

  // instrument fieldsets
  $('fieldset').each(function () {
    const fieldset = $(this);
    fieldset.hide();

    const sectionName = fieldset.attr('class').split(' ').find(_ => _.startsWith(REPEATING_PREFIX));

    // setup container and controls
    const repContainer = $(`<div class="repcontainer ui-sortable" data-groupname="${sectionName}">`);
    fieldset.after(repContainer);
    const repControl = $(`<div class="repcontrol" data-groupname="${sectionName}">`);
    const editButton = $('<button class="btn repcontrol_edit">Modify</button>');
    repControl.append(editButton);
    const addButton = $('<button class="btn repcontrol_add" style="display: inline-block;">+Add</button>');
    repControl.append(addButton)
    repContainer.after(repControl);

    editButton.click(e => {
      const button = $(e.target);

      const repContainer = button.parent().prev();
      const isEditMode = repContainer.hasClass('editmode');

      if (isEditMode) {
        button.siblings('.repcontrol_add').show();
        button.text('Modify');
        repContainer.removeClass('editmode');
      } else {
        button.siblings('.repcontrol_add').hide();
        button.text('Done');
        repContainer.addClass('editmode');
      }
    });

    addButton.click(e => {
      // add new rep items
      const repContainers = $(`.repcontainer[data-groupname="${sectionName}"]`);
      const rowId = generateRowID();
      repContainers.each(function () { // loop on all matching containers to support fieldsets with same name
        const repContainer = $(this);
        createSectionRow(repContainer, rowId);
      });
    });
  });

  // initialize attributes
  setAttrs(initAttributes, true);

  // localize some i18n
  localize($('.charsheet'));
});

/** Initializes the store with the current input values and sets up the "change" event. */
function instrumentInputs(root) {
  const inputSelector = `input[name^='${ATTR_PREFIX}'], select[name^='${ATTR_PREFIX}'], textarea[name^='${ATTR_PREFIX}']`;

  $(inputSelector, root).each(function () {
    const input = $(this);

    // exclude elements in a fieldset
    if (input.parents('fieldset').length > 0) {
      return;
    }

    // init the attributes values in the store
    let attributeName = input.attr('data-attrname') ?? getInputAttributeName(input);

    const repItem = input.parents('.repitem');
    if (repItem.length > 0) {
      const sectionName = repItem.parent().attr('data-groupname');
      const rowId = repItem.attr('data-reprowid');
      attributeName = `${sectionName}_${rowId}_${attributeName}`;
    }

    if (input.attr('type') == 'radio' || input.attr('type') == 'checkbox') {
      if (input.prop('checked')) {
        attributeStore.setValue(attributeName, input.val());
      }
    } else {
      if (input.val() != '') {
        attributeStore.setValue(attributeName, input.val());
      }
    }

    // handle changes for input and select
    input.change(event => {
      // get the value
      let value;
      if (input.attr('type') === 'checkbox') {
        value = event.target.checked ? 'on' : 'off';
      } else {
        value = event.target.value;
      }

      // store the value
      let attributeName = input.attr('data-attrname') ?? getInputAttributeName(input);

      const repItem = input.parents('.repitem');
      if (repItem.length > 0) {
        currentRepeatingContext = {
          sectionName: repItem.parent().attr('data-groupname'),
          rowId: repItem.attr('data-reprowid')
        }

        attributeName = `${currentRepeatingContext.sectionName}_${currentRepeatingContext.rowId}_${attributeName}`;

      } else {
        currentRepeatingContext = undefined;
      }

      console.log(`New value for attribute ${attributeName}: ${value}`);

      setAttrs({ [`${attributeName}`]: value });
    });
  });

  // handle roll buttons: display a popup+log with processed roll value
  $("button[type='roll']", root).each(function () {
    const button = $(this);

    // exclude elements in a fieldset
    if (button.parents('fieldset').length > 0) {
      return;
    }

    // add roll20 classes
    button.addClass('btn');
    button.addClass('ui-draggable');

    button.click(() => {
      const firstSpaceIndex = button.val().indexOf(' ');
      let templateDef = button.val().substring(2, firstSpaceIndex - 1);
      const templateId = templateDef.split(':')[1];

      // replace attributes
      const repItem = button.parents('.repitem');
      if (repItem.length > 0) {
        currentRepeatingContext = {
          sectionName: repItem.parent().attr('data-groupname'),
          rowId: repItem.attr('data-reprowid')
        }
      } else {
        currentRepeatingContext = undefined;
      }

      let rollSpec = button.val().substring(firstSpaceIndex);
      rollSpec = replaceAttributes(rollSpec);

      function replaceAttributes(rollSpec) {
        let hasMatches = false;

        for (const group of rollSpec.matchAll(/@{([^}]+)}/g)) { // this is an iterator, not a standard array: testing "length" is not possible
          hasMatches = true;
          let attributeFullName = group[1];
          if (currentRepeatingContext) {
            attributeFullName = `${currentRepeatingContext.sectionName}_${currentRepeatingContext.rowId}_${attributeFullName}`;
          }
          rollSpec = rollSpec.replace(group[0], attributeStore.getValue(attributeFullName) ?? '@' + group[1]);
        }
        if (hasMatches) {
          return replaceAttributes(rollSpec);
        } else {
          return rollSpec;
        }
      }

      // show result
      const templateSpec = {
        templateId,
        display: true,
        values: {}
      };
      (rollSpec + ' ').match(/\{\{(.+?)\}\}\s/g).map(_ => _.substring(2, _.length - 3)).forEach(_ => {
        const parts = _.split('=');
        templateSpec.values[parts[0]] = parts[1];
      });

      console.log(JSON.stringify(templateSpec, undefined, 2));

      const rollValue = `&\{${templateDef}\}${rollSpec}`;
      console.log(rollValue);
      navigator.clipboard.writeText(rollValue);
    });
  });
}

function getInputAttributeName(input) {
  return input.attr('name').substring(ATTR_PREFIX.length);
}

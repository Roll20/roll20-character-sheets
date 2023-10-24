const maxSegements = 6
function getClockChangeString () {
  let clockArray = []
  for(let index = 1; index <= maxSegements; index++) {
    clockArray.push(`change:repeating_assets-final:clock_${index}`)
  }
  return clockArray.join(' ')
}

on(getClockChangeString(), function(eventinfo) {
  const clockNumber = eventinfo.sourceAttribute.match(/(\d+)[^\d]*$/)[1]
  let attrs = {}
  if (eventinfo.newValue === 'on') {
    for(let index = clockNumber; index >= 1; index--) {
      attrs[`repeating_assets-final_clock_${index}`] = 'on'
    }
  } else {
    for(let index = clockNumber; index <= maxSegements; index++) {
      attrs[`repeating_assets-final_clock_${index}`] = 'off'
    }
  }
  setAttrs(attrs);
});
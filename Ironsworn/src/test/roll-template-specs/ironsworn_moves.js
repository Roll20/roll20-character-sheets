var rollSpecs = [
  { // strong hit
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Learn From Your Failures",
      "name": "Hornst",
      "action": "[[5]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[3]]",
      "challenge2": "[[4]]",
      "momentum": "[[2]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // weak hit
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "roll +spirit",
      "name": "@character_name",
      "action": "[[5]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[3]]",
      "challenge2": "[[6]]",
      "momentum": "[[2]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // miss
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Face danger",
      "name": "@character_name",
      "action": "[[1]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[5]]",
      "challenge2": "[[6]]",
      "momentum": "[[2]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // opportunity
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Face danger",
      "name": "@character_name",
      "action": "[[5]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[1]]",
      "challenge2": "[[1]]",
      "momentum": "[[2]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // complication
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Face danger",
      "name": "@character_name",
      "action": "[[5]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[5]]",
      "challenge2": "[[5]]",
      "momentum": "[[2]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // momentum weak hit
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Face danger",
      "name": "@character_name",
      "action": "[[5]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[5]]",
      "challenge2": "[[8]]",
      "momentum": "[[7]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // momentum strong hit
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Face danger",
      "name": "@character_name",
      "action": "[[5]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[5]]",
      "challenge2": "[[5]]",
      "momentum": "[[7]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // negate1
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Face danger",
      "name": "@character_name",
      "action": "[[4]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[1]]",
      "challenge2": "[[1]]",
      "momentum": "[[-1]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // negate2
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Face danger",
      "name": "@character_name",
      "action": "[[5]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[1]]",
      "challenge2": "[[2]]",
      "momentum": "[[-2]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // negate3
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Face danger",
      "name": "@character_name",
      "action": "[[6]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[1]]",
      "challenge2": "[[4]]",
      "momentum": "[[-3]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // negate4
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Face danger",
      "name": "@character_name",
      "action": "[[7]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[4]]",
      "challenge2": "[[5]]",
      "momentum": "[[-4]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // negate5
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Face danger",
      "name": "@character_name",
      "action": "[[8]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[4]]",
      "challenge2": "[[4]]",
      "momentum": "[[-5]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  },
  { // negate6
    "templateId": "ironsworn_moves",
    "display": true,
    "values": {
      "header": "Face danger",
      "name": "@character_name",
      "action": "[[9]]",
      "negate1": "[[4]]",
      "negate2": "[[5]]",
      "negate3": "[[6]]",
      "negate4": "[[7]]",
      "negate5": "[[8]]",
      "negate6": "[[9]]",
      "challenge1": "[[2]]",
      "challenge2": "[[2]]",
      "momentum": "[[-6]]",
      "stat": "[[2]]",
      "modifiers": "[[3]]",
      "add": "[[1]]"
    }
  }
];

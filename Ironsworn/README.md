# Ironsworn - Character Sheet
## Building Sheet
This sheet uses [pugjs](https://www.google.com) for HTML templating, along with [Stylus](https://www.google.com) from CSS templating.
To build finished sheet run the following commands from command line or terminal:
```bash
cd src
npm install

// Mac or Linux
npm run build:pug 
// Windows
npm run build:pug:win

npm run build:css
```
These will then generate a dist folder that will have the finished code. From their you can upload them into the custom sheet sandbox for testing.
## Compatibility
The sheet has been tested across multiple browsers and devices, show below in the compatibility matrix:
|Browser|Windows|MacOs|Android|iOS|
|---|---|---|---|---|
|Chrome|yes|yes|yes|yes|
|Firefox|yes|yes|yes|yes|
|Safari|no|yes|no|yes|

## Roll Logic
### Wield a Rarity
Structured it using javascript for readability.
```javascript
if (actionWithRarity == (negativeMomentum + modifiers)) {
  negateActionDie()
  if (modifiers > firstChallengeDie) {
    if (firstChallengeDie == secondChallengeDie) {
      opportunity()
    } else {
      if (modifiers > secondChallengeDie) {
        strongHit()
      } else {
        weakHit()
      }
    }
  } else {
    if (firstChallengeDie == secondChallengeDie) {
      complication()
    } else {
      if (modifiers > secondChallengeDie) {
        weakHit()
      } else {
        miss()
      }
    }
  }
} else {
  if (actionWithRarity > firstChallengeDie) {
    if (firstChallengeDie == secondChallengeDie) {
      opportunity()
      if (actionWithRarity == (6 + modifiers)) {
        rarityDramatic()
      }
      if (actionWithRarity == (5 + modifiers)) {
        raritySubtle()
      }
    } else {
      if (actionWithRarity > secondChallengeDie) {
        strongHit()
        if (actionWithRarity == (6 + modifiers)) {
          rarityDramatic()
        }
        if (actionWithRarity == (5 + modifiers)) {
          raritySubtle()
        }
      } else {
        if (actionWithRarity == (6 + modifiers)) {
          strongHit()
          rarityDramatic()
        } else {
          weakHit()
          if (actionWithRarity == (5 + modifiers)) {
            raritySubtle()
          }
          if (momentum > secondChallengeDie) {
            burnMomentum('Strong Hit')
          }
        }
      }
    }
  } else {
    if (firstChallengeDie == secondChallengeDie) {
      if (actionWithRarity == (6 + modifiers)) {
        strongHit()
        rarityDramatic()
      } else {
        complication()
        if (actionWithRarity == (1 + modifiers)) {
          rarityMiss()
        }
        if (momentum > firstChallengeDie) {
          burnMomentum('Strong Hit')
          if (actionWithRarity == (5 + modifiers)) {
            raritySubtle()
          }
        }
      }
    } else {
      if (actionWithRarity > secondChallengeDie) {
        if (actionWithRarity == (6 + modifiers)) {
          strongHit()
          rarityDramatic()
        } else {
          weakHit()
          if (actionWithRarity == (5 + modifiers)) {
            raritySubtle()
          }
          if (momentum > firstChallengeDie) {
            if (momentum > secondChallengeDie) {
              burnMomentum('Strong Hit')
            }
          }
        }
      } else {
        if (actionWithRarity == (6 + modifiers)) {
          strongHit()
          rarityDramatic()
        } else {
          miss()
          if (actionWithRarity == (1 + modifiers)) {
            rarityMiss()
          }
          if (momentum > firstChallengeDie) {
            if (momentum > secondChallengeDie) {
              burnMomentum('Strong Hit')
              if (actionWithRarity == (5 + modifiers)) {
                raritySubtle()
              }
            } else {
              burnMomentum('Weak Hit')
              if (actionWithRarity == (5 + modifiers)) {
                raritySubtle()
              }
            }
          } else {
            if (momentum > secondChallengeDie) {
              burnMomentum('Weak Hit')
              if (actionWithRarity == (5 + modifiers)) {
                raritySubtle()
              }
            }
          }
        }
      }
    }
  }
}
```

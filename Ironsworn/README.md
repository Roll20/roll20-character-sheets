# Ironsworn - Character Sheet
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

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
## Pushing Changes
Roll20 does not build our pug/stylus code for when we merge. This needs to be done locally and then the Ironsworn.html and Ironsworn.css need to be copied from the /dist directory and replace the ones in the base directory for Ironsworn.
## Translations
To keep our translation and fallback html content consistent. We opted to store a duplicate of the translation.json file at `src\data\translations.pug`. This should be treated as a mirror of `translations.json`. And when a change is done to `translation.json` copy the json into `translations.pug`. (Ideally there will be no need for this file and we will import the json during build to populate our content, but currently it is fairly complex work)
## Compatibility
The sheet has been tested across multiple browsers and devices, show below in the compatibility matrix:
|Browser|Windows|MacOs|Android|iOS|
|---|---|---|---|---|
|Chrome|yes|yes|yes|yes|
|Firefox|yes|yes|yes|yes|
|Safari|no|yes|no|yes|

## Roll Logic
### Wield a Rarity
Structured it using pseudo code for readability.
```javascript
if rarityDie6 == rarityAction
  if challenge1 == challenge2
    opportunity()
  else
    strongHit()
  if rarityDie6 == rarityAction
    rarityDramatic()
else
  if rarityAction > 10
    if challenge1 == 10
      if challenge2 == 10
        complication()
        if rarityDie1 == rarityAction
          rarityFail()
      else
        weakHit()
        if rarityDie5 == rarityAction
          raritySubtle()
    else
      if challenge2 == 10
        weakHit
        if rarityDie5 == rarityAction
          raritySubtle()
      else
        strongHit
        if rarityDie5 == rarityAction
          raritySubtle()
  else
    if rarityAction > challenge1
      if challenge1 == challenge2
        opportunity()
        if rarityDie5 == rarityAction
          raritySubtle()
      else
        if rarityAction > challenge2
          strongHit()
          if rarityDie5 == rarityAction
            raritySubtle()   
        else
          weakHit()
          if rarityDie5 == rarityAction
            raritySubtle()
    else
      if challenge1 == challenge2
        complication()
        if rarityDie1 == rarityAction
          rarityFail()
      else
        if rarityAction > challenge2
          weakHit()
          if rarityDie5 == rarityAction
            raritySubtle()
        else
          miss()
          if rarityDie1 == rarityAction
            rarityFail()
```
Roll with momentum
```js
if rarityDie6 == rarityAction
  if challenge1 == challenge2
    opportunity()
  else
    strongHit()
  if rarityDie6 == rarityAction
    rarityDramatic()
else
  if rarityAction > 10
    if challenge1 == 10
      if challenge2 == 10
        complication()
        if rarityDie1 == rarityAction
          rarityFail()
      else
        weakHit()
        if rarityDie5 == rarityAction
          raritySubtle()
    else
      if challenge2 == 10
        weakHit
        if rarityDie5 == rarityAction
          raritySubtle()
      else
        strongHit
        if rarityDie5 == rarityAction
          raritySubtle()
  else
    if rarityAction > challenge1
      if challenge1 == challenge2
        opportunity()
        if rarityDie5 == rarityAction
          raritySubtle()
      else
        if rarityAction > challenge2
          strongHit()
          if rarityDie5 == rarityAction
            raritySubtle()
        else
          weakHit()
          if rarityDie5 == rarityAction
            raritySubtle()
          if momentum > challenge2
            momentumStrongHit()
    else
      if challenge1 == challenge2
        complication()
        if rarityDie1 == rarityAction
          rarityFail()
        if momentum > challenge1
          momentumStrongHit()
          if rarityDie5 == rarityAction
            raritySubtle()
      else
        if rarityAction > challenge2
          weakHit()
          if rarityDie5 == rarityAction
            raritySubtle()
          if momentum > challenge1
            momentumStrongHit()
        else
          miss()
          if rarityDie1 == rarityAction
            rarityFail()
          if momentum > challenge1
            if momentum > challenge2
              momentumStrongHit()
              if rarityDie5 == rarityAction
                raritySubtle()
            else
              momentumWeakHit()
              if rarityDie5 == rarityAction
                raritySubtle()
          else
            if momentum > challenge2
              momentumWeakHit()
              if rarityDie5 == rarityAction
                raritySubtle()
```
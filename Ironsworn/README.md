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
These will then generate a `dist` folder that will have the finished code. From there you can upload them into the custom sheet sandbox for testing.

## Pushing Changes
Roll20 does not build our pug/stylus code for when we merge. This needs to be done locally by running `npm run gulp:build` in the Ironsworn/src directory.

## Translations
To keep our translation and fallback html content consistent. We are loading the translations into pug under the `locals` global variable. This allows us to call `locals.translations[<translation-key>]` to get our content. This way we can propagate changes and avoid hardcoding content.

## Changelog
You can handle a new version in:
- `src/package.json`: edit the `version` property
- `src/app/workers/scripts/pages.js`: change the value of `changelog_X.Y.Z` to match
- `src/app/pages/index.pug`: change the value of `attr_changelog_X.Y.Z` to match and add a new changelog entry

## Local testing
A minimal framework for testing locally is present in `src/test`.
It allows to generate an html page that almost renders and behaves as on the Sheet sandbox.
It is not meant to replace a validation on the Sheet sandbox but it may be useful for rapid testing or for those without access to the sandbox.

You must create a file `test/attributes.js` that contains the initial values of your attributes.
It may be an empty object if you do not want to initialize some values.
For instance:
``` js
const attributeStore = {
  close_changelog: 'on',
  modes_choice: 'off',
  mode: '0',
  edge: '1',
  heart: '2',
  iron: '3',
  shadow: '4',
  wits: '5',
  momentum_max: 10,
  momentum_reset: 2
}; // don't forget the semi-colon
```

To build for testing, use `npm run gulp:test-watch`.
This compiles `test/Ironsworn.html` and `Ironsworn.css`.
You can open `test/Ironsworn.html` in your browser.

You **MUST** exclude these 2 files **locally** from git: in `.git/info/exclude` add
```
/Ironsworn/src/test/Ironsworn.html
/Ironsworn/src/test/attributes.js
```

### Limitations
- Inputs in repeating sections (fieldset) may not be handled properly
- Shared sheet repeating sections are not handled at all
- Rolls are not interpreted

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
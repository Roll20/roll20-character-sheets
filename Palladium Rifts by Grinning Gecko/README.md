# Palladium Rifts by Grinning Gecko

## Build

This sheet makes use of the following:

- gulp
  - gulp-replace
  - gulp-inject
- sass
- [Roll20Async](https://github.com/onyxring/Roll20Async)

Use `npm i` to install required NPM packages.

Use `npm run watch` to automatically build the `dist/` folder when editing an HTML or JS file. Note that only [rifts.scss](./src/scss/rifts.scss) is monitored, so if you edit one of the other scss files you'll need to save that one too to trigger a build.

## Useful Macros

### Humanoid Knockdown Table

```
&{template:skill} {{title=Humanoid Knockdown}} {{roll=[[d100]]}} ?{Damage|
    1-10,{{target=[[0]]&#125;&#125;|
    11-20,{{target=[[20]]&#125;&#125;|
    21-30,{{target=[[30]]&#125;&#125;|
    31-40,{{target=[[50]]&#125;&#125;|
    41-50,{{target=[[70]]&#125;&#125;|
    51-60,{{target=[[90]]&#125;&#125;|
    61+,{{target=[[100]]&#125;&#125; {{successtext=Knocked off feet and stunned!&#125;&#125; }
```

### Bots, Borgs, & Supernatural Knockdown Table

```
&{template:skill} {{title=Bots, Borgs, & Supernatural Knockdown}} {{roll=[[d100]]}} ?{Damage|
    1-30,{{target=[[0]]&#125;&#125;|
    31-50,{{target=[[10]]&#125;&#125;|
    51-70,{{target=[[20]]&#125;&#125;|
    71-100,{{target=[[40]]&#125;&#125;|
    101-150,{{target=[[60]]&#125;&#125;|
    151-200,{{target=[[80]]&#125;&#125;|
    201+,{{target=[[100]]&#125;&#125; {{successtext=Knocked off feet and stunned!&#125;&#125; }
```

### Apply Damage to Character

> This macro requires API access.

> Add the `ChatSetAttr` script from the Script Library.

For each character in the party (or any NPCs you may want to use this on), copy everything after, and including, `{{Character Name`. Then replace each instance of `Character Name` in each section with the names of your characters. Running the macro will prompt for damage, then put a table in chat where you can click the damage value to set it on that particular characters' sheet, then click Apply to trigger the Apply Damage action button.

```
&{template:custom} {{title=Armor}} {{Character Name (@{Character Name|active_armor_mdc})=[?{Damage?|0}](!&#13;!setattr --nocreate --name Character Name --armordamage|?{Damage?|0}) [Apply](~Character Name|armorapplydamage)}}
```

### Show Player MDC

For each character in the party (or any NPCs you may want to use this on), copy everything after, and including, `{{Character Name`. Then replace each instance of `Character Name` in each section with the names of your characters.

```
&{template:custom} {{title=Armor}} {{Character Name=@{Character Name|active_armor_mdc}}}
```

## API Scripts

### dup-turn

Add this script if you want to use the `TT` button in the Active Profile. Having your token selected and clicking this button will roll intiative and add your attacks to the Turn Tracker, Palladium style.

```js
on("ready", () => {
  const multiplyTurn = (token_id, count) => {
    let to = JSON.parse(Campaign().get("turnorder") || "[]");
    let turn = { pr: -10000 };
    to = to.filter((o) => {
      if (o.id !== token_id) {
        return true;
      }
      if (o.id === token_id) {
        if (o.pr > turn.pr) {
          turn = o;
        }
      }
      return false;
    });
    if (turn.id) {
      [...Array(parseInt(count)).keys()].forEach((n) => {
        to.push(Object.assign({}, turn, { pr: parseInt(turn.pr) - 100 * n }));
      });
    }
    Campaign().set({
      turnorder: JSON.stringify(
        to.sort((a, b) => parseFloat(b.pr) - parseFloat(a.pr))
      ),
    });
  };

  on("chat:message", (msg) => {
    if ("api" === msg.type && /^!dup-turn/.test(msg.content)) {
      let args = msg.content.split(/\s+/);
      let count = args[1] || 2;

      msg.selected.forEach((m) => multiplyTurn(m._id, count));
    }
  });
});
```

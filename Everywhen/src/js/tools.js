function normalizeDice(input) {
  const regex = /^(\d+)?[dD](\d+)([hHlL])?(?:\s*([+-])\s*(\d+))?$/;
  const match = input.replace(/\s+/g, '').match(regex);

  if (!match) {
    return "-1";
  }

  let [, x, y, hl, op, z] = match;

  x = x ? parseInt(x, 10) : 1;
  y = parseInt(y, 10);
  z = z ? parseInt(z, 10) : null;

  const newX = hl ? x + 1 : x;
  const keep = hl ? `k${hl.toLowerCase()}${x}` : '';

  let result = `${newX}d${y}${keep}`;

  if (z !== null && op) {
    result += `${op}${z}`;
  }

  return result;
}

function diceValue(input) {
  const regex = /^\s*(\d+)?\s*[dD]\s*(\d+)/;
  const match = input.match(regex);

  if (!match) {
    throw new Error("Format invalide");
  }

  return parseInt(match[2], 10);
}

function averageDice(input) {
  const regex = /^\s*(\d+)?\s*[dD]\s*(\d+)\s*([hHlL])?\s*(?:([+-])\s*(\d+))?\s*$/;
  const match = input.match(regex);

  if (!match) {
    throw new Error("Format invalide");
  }

  let [, x, y, hl, op, z] = match;

  x = x ? parseInt(x, 10) : 1;
  y = parseInt(y, 10);
  z = z ? parseInt(z, 10) : 0;

  // moyenne d’un dé Y faces
  const avgDie = (y + 1) / 2;

  let avg;

  if (!hl) {
    // cas simple : X dés
    avg = x * avgDie;
  } else {
    // cas H/L : on lance X+1 dés, on garde X
    const n = x + 1;

    // approximation : moyenne en retirant min ou max attendu
    const expectedMin = 1 + (y - 1) / (n + 1);
    const expectedMax = y - (y - 1) / (n + 1);

    if (hl.toLowerCase() === "h") {
      avg = n * avgDie - expectedMin; // drop lowest
    } else {
      avg = n * avgDie - expectedMax; // drop highest
    }
  }

  if (op === "+") avg += z;
  if (op === "-") avg -= z;

  return avg;
}

function getPositiveSign(num)
{
  return num < 0 ? "" : "+";
}
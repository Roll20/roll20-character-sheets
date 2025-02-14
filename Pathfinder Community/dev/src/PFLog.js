'use strict';
export const PFLog = {
 // PFLog just a little helper to write to console using fancy type
 l: '%cס§₪₪₪₪§|(Ξ≥≤≥≤≥≤ΞΞΞΞΞΞΞΞΞΞ>    ',
 r: '    <ΞΞΞΞΞΞΞΞΞΞ≥≤≥≤≥≤Ξ)|§₪₪₪₪§ס',
 bg: 'background: linear-gradient(to right,green,white,white,green); color:black;text-shadow: 0 0 8px white;',
 modulecount: 0
};

export const PFConsole = {
  log: (text) => {
    console.log(PFLog.l + text + PFLog.r, PFLog.bg);
  }
};

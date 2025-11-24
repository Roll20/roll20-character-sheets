  on("change:gmroll", function () {
    getAttrs(["gmroll"], function (values) {
      let gmroll = values.gmroll || "";
      switch (gmroll) {
        case "nogm":
          setAttrs({ abilityroll: "/me" });
          break;
        case "gm":
          setAttrs({ abilityroll: "/w GM **@{character_name}**" });
          break;
      }
    });
  });

  function calc_attributbonus(attribut) {
    if (attribut <=  1) return -3;
    if (attribut <=  2) return -2;
    if (attribut <=  4) return -1;
    if (attribut <=  5) return  0;
    if (attribut <=  7) return  1;
    if (attribut <=  9) return  2;
    if (attribut <= 11) return  3;
    if (attribut <= 13) return  4;
    if (attribut <= 15) return  5;
    return 6;
  }

  on("change:st change:st_bonus", function () {
    getAttrs(["st", "st_bonus"], function (values) {
      let st = parseInt(values.st) + parseInt(values.st_bonus) || 0;
      setAttrs({ stb: calc_attributbonus(st) });
    });
  });

  on("change:ge change:ge_bonus", function () {
    getAttrs(["ge", "ge_bonus"], function (values) {
      let ge = parseInt(values.ge) + parseInt(values.ge_bonus) || 0;
      setAttrs({ geb: calc_attributbonus(ge) });
    });
  });

  on("change:ko change:ko_bonus", function () {
    getAttrs(["ko", "ko_bonus"], function (values) {
      let ko = parseInt(values.ko) + parseInt(values.ko_bonus) || 0;
      setAttrs({ kob: calc_attributbonus(ko) });
    });
  });

  on("change:in change:in_bonus", function () {
    getAttrs(["in", "in_bonus"], function (values) {
      let int = parseInt(values.in) + parseInt(values.in_bonus) || 0;
      setAttrs({ inb: calc_attributbonus(int) });
    });
  });

  on("change:ch change:ch_bonus", function () {
    getAttrs(["ch", "ch_bonus"], function (values) {
      let ch = parseInt(values.ch) + parseInt(values.ch_bonus) || 0;
      setAttrs({ chb: calc_attributbonus(ch) });
    });
  });

  on("change:ep", function () {
    getAttrs(["ep"], function (values) {
      let ep = parseInt(values.ep) || 0;
      if      (ep <   1000) setAttrs({ stufe: 1 });
      else if (ep <   4000) setAttrs({ stufe: 2 });
      else if (ep <   8000) setAttrs({ stufe: 3 });
      else if (ep <  13000) setAttrs({ stufe: 4 });
      else if (ep <  19000) setAttrs({ stufe: 5 });
      else if (ep <  26000) setAttrs({ stufe: 6 });
      else if (ep <  34000) setAttrs({ stufe: 7 });
      else if (ep <  43000) setAttrs({ stufe: 8 });
      else if (ep <  53000) setAttrs({ stufe: 9 });
      else if (ep <  64000) setAttrs({ stufe: 10 });
      else if (ep <  76000) setAttrs({ stufe: 11 });
      else if (ep <  89000) setAttrs({ stufe: 12 });
      else if (ep < 103000) setAttrs({ stufe: 13 });
      else if (ep < 118000) setAttrs({ stufe: 14 });
      else if (ep < 134000) setAttrs({ stufe: 15 });
      else if (ep < 151000) setAttrs({ stufe: 16 });
      else if (ep < 169000) setAttrs({ stufe: 17 });
      else if (ep < 188000) setAttrs({ stufe: 18 });
      else if (ep < 208000) setAttrs({ stufe: 19 });
      else                  setAttrs({ stufe: 20 });
    });
  });

on("change:beruf change:stufe change:kob change:calcleben", function () {
  getAttrs(["kob", "beruf", "stufe", "calcleben"], function (values) {
    let calcleben = parseInt(values.calcleben) || 0;
    if (calcleben == 1) {
      let beruf = values.beruf || "";
      let kob = parseInt(values.kob) || 0;
      let stufe = parseInt(values.stufe) || 0;
      switch (beruf) {
        case "Zauberer":
          setAttrs({ leben_max: Math.floor((4 + kob) * stufe) });
          break;
        case "Barde":
        case "Dieb":
        case "Schamane":
          setAttrs({ leben_max: Math.floor((6 + kob) * stufe) });
          break;
        case "Priester":
        case "Waldläufer":
          setAttrs({ leben_max: Math.floor((8 + kob) * stufe) });
          break;
        case "Krieger":
          setAttrs({ leben_max: Math.floor((10 + kob) * stufe) });
          break;
      }
    }
  });
});

on("change:beruf change:inb change:chb change:mag change:calcmana", function () {
  getAttrs(["beruf", "inb", "chb", "mag", "calcmana"], function (values) {
    let calcmana = parseInt(values.calcmana) || 0;
    if (calcmana == 1) {
      let beruf = values.beruf || "";
      let mag = parseInt(values.mag) || 0;
      switch (beruf) {
        case "Dieb":
        case "Krieger":
        case "Waldläufer":
        case "Zauberer":
          let inb = parseInt(values.inb) || 0;
          setAttrs({ mana_max: Math.floor((inb + 3) * mag) });
          break;
        case "Barde":
        case "Priester":
        case "Schamane":
          let chb = parseInt(values.chb) || 0;
          setAttrs({ mana_max: Math.floor((chb + 3) * mag) });
          break;
      }
    }
  });
});

  on("change:mu change:kl change:tt change:gf change:calcmoney", function () {
    getAttrs(["mu", "kl", "tt", "gf", "calcmoney"], function (values) {
      let calcmoney = parseInt(values.calcmoney) || 0;
      if (calcmoney == 1) {
        let mu = parseInt(values.mu) || 0;
        let kl = parseInt(values.kl) || 0;
        let tt = parseInt(values.tt) || 0;
        let gf = parseInt(values.gf) || 0;
        let sum = mu + 10 * kl + 100 * tt + 1000 * gf;
        gf = Math.floor(sum / 1000);
        sum = sum % 1000;
        tt = Math.floor(sum / 100);
        sum = sum % 100;
        kl = Math.floor(sum / 10);
        mu = sum % 10;
        setAttrs({
          mu: mu,
          kl: kl,
          tt: tt,
          gf: gf,
        });
      }
    });
  });

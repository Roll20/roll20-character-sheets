/* eslint-disable camelcase */
/* eslint-disable no-undef */
on('clicked:rollVehicule', async (info) => {
  const roll = info.htmlAttributes.value;

  let exec = '';

  const listAttrs = [
    'desVehicule',
    'jetModifDes',
    'ODVehicule',
  ];

  const attrs = await getAttrsAsync(listAttrs);

  const base = +attrs.desVehicule || 0;
  const mod = +attrs.jetModifDes || 0;
  const bonus = +attrs.ODVehicule || 0;
  const rollT = base + mod;

  exec = `${roll}{{jet=[[ {[[{${rollT}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}} {{OD=true}} {{vOD=${bonus}}} {{tBonus=[[${bonus}]]}} {{Exploit=[[${rollT}]]}}`;

  startRoll(exec, (results) => {
    const tJet = results.results.jet.result;
    const tBonus = results.results.tBonus.result;
    const tExploit = results.results.Exploit.result;

    const total = tJet + tBonus;

    finishRoll(
      results.rollId,
      {
        jet: total,
      },
    );

    if (tJet !== 0 && tJet === tExploit) {
      startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}} {{jet=[[ {[[{${rollT}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`, (exploit) => {
        const tExploit2 = exploit.results.jet.result;

        finishRoll(
          exploit.rollId,
          {
            jet: tExploit2,
          },
        );
      });
    }
  });
});

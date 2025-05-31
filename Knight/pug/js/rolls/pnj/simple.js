/* eslint-disable camelcase */
/* eslint-disable no-undef */
on('clicked:simplePNJ', async (info) => {
  const roll = info.htmlAttributes.value;

  const listAttrs = [
    'jetModifDes',
    'aspectPNJ',
  ];

  const attrs = await getAttrsAsync(listAttrs);
  let attrsAspect = [];

  const exec = [];
  const isConditionnel = false;

  const mod = +attrs.jetModifDes;
  const aspect = attrs.aspectPNJ;

  const aspectNom = aspect.slice(2, -1);

  const aRoll = [];
  let aNom = '';

  const bonus = [];
  let AE = 0;

  exec.push(roll);

  if (aspect !== '0') {
    attrsAspect = await getAttrsAsync([
      aspectNom,
      `${aspectNom}PNJAE`,
      `${aspectNom}PNJAEMaj`,
    ]);

    const tAE = totalAspect(attrsAspect, aspectNom);

    aNom = AspectNom[aspectNom];
    aRoll.push(attrsAspect[aspectNom]);
    AE += tAE;

    exec.push(`{{vAE=${tAE}}}`);
  }

  exec.push(`{{cBase=${aNom}}}`);

  if (mod !== 0) {
    aRoll.push(mod);
    exec.push(`{{mod=[[${mod}]]}}`);
  }

  if (aRoll.length === 0) { aRoll.push(0); }

  bonus.push(AE);

  exec.push(`{{jet=[[ {[[{${aRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}} {{tBonus=[[${bonus.join('+')}+0]]}} {{Exploit=[[${aRoll.join('+')}]]}}`);

  if (isConditionnel === true) { exec.push('{{conditionnel=true}}'); }

  startRoll(exec.join(' '), (results) => {
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
      startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}} {{jet=[[ {[[{${aRoll.join('+')}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0]]}}`, (exploit) => {
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

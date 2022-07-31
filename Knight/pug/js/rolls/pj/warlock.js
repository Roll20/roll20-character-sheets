/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
const warlockRollCoutrecoups = ['rollWarlockContrecoups', 'rollMALWarlockContrecoups'];

warlockRollCoutrecoups.forEach((button) => {
  on(`clicked:${button}`, (info) => {
    const roll = info.htmlAttributes.value;

    const exec = [];
    exec.push(roll);
    exec.push('{{rollTitre=[[1D6]]}}');
    exec.push('{{rollText=[[1D6]]}}');
    exec.push('{{roll6D6=[[6D6]]}}');
    exec.push('{{roll1D3=[[1D3]]}}');

    startRoll(exec.join(' '), (results) => {
      const tD1 = results.results.rollTitre.result;
      const tD2 = results.results.rollText.result;

      const t6D6D = results.results.roll6D6.dice;
      const t6D6R = results.results.roll6D6.result;

      const t1D3 = results.results.roll1D3.result;

      let resultTitre = '';
      let resultText = '';
      let calcul = 0;

      switch (tD1) {
        case 1:
          switch (tD2) {
            case 1:
              resultTitre = i18n_contreCoupsDechirureT;
              resultText = i18n_contreCoupsDechirureV;
              break;

            case 2:
              resultTitre = i18n_contreCoupsDisparitionT;
              resultText = i18n_contreCoupsDisparitionV;
              break;

            case 3:
            case 4:
              calcul = t6D6D[0] + t6D6D[1] + t6D6D[2] + t6D6D[3];

              resultTitre = i18n_contreCoupsIncidentT;
              resultText = i18n_contreCoupsIncidentV1 + calcul + i18n_contreCoupsIncidentV2;
              break;

            case 5:
              resultTitre = i18n_contreCoupsSiphonT;
              resultText = i18n_contreCoupsSiphonV1 + t6D6R + i18n_contreCoupsSiphonV2;
              break;

            case 6:
              resultTitre = i18n_contreCoupsSursautT;
              resultText = i18n_contreCoupsSursautV1 + t6D6D[0] + i18n_contreCoupsSursautV2;
              break;

            default:
              resultTitre = '';
              resultText = '';
              break;
          }
          break;

        case 2:
          switch (tD2) {
            case 1:
              resultTitre = i18n_contreCoupsDisparitionT;
              resultText = i18n_contreCoupsDisparitionV;
              break;

            case 2:
            case 3:
              calcul = t6D6D[0] + t6D6D[1] + t6D6D[2] + t6D6D[3];

              resultTitre = i18n_contreCoupsIncidentT;
              resultText = i18n_contreCoupsIncidentV1 + calcul + i18n_contreCoupsIncidentV2;
              break;

            case 4:
              calcul = t6D6D[0];

              resultTitre = i18n_contreCoupsFragmentationT;
              resultText = i18n_contreCoupsFragmentationV1 + calcul + i18n_contreCoupsFragmentationV2;
              break;

            case 5:
              resultTitre = i18n_contreCoupsSiphonT;
              resultText = i18n_contreCoupsSiphonV1 + t6D6R + i18n_contreCoupsSiphonV2;
              break;

            case 6:
              resultTitre = i18n_contreCoupsSursautT;
              resultText = i18n_contreCoupsSursautV1 + t6D6D[0] + i18n_contreCoupsSursautV2;
              break;

            default:
              resultTitre = '';
              resultText = '';
              break;
          }
          break;

        case 3:
          switch (tD2) {
            case 1:
              resultTitre = i18n_contreCoupsDisparitionT;
              resultText = i18n_contreCoupsDisparitionV;
              break;

            case 2:
              calcul = t6D6D[0] + t6D6D[1] + t6D6D[2] + t6D6D[3];

              resultTitre = i18n_contreCoupsIncidentT;
              resultText = i18n_contreCoupsIncidentV1 + calcul + i18n_contreCoupsIncidentV2;
              break;

            case 3:
              calcul = t6D6D[0];

              resultTitre = i18n_contreCoupsFragmentationT;
              resultText = i18n_contreCoupsFragmentationV1 + calcul + i18n_contreCoupsFragmentationV2;
              break;

            case 4:
              resultTitre = i18n_contreCoupsSiphonT;
              resultText = i18n_contreCoupsSiphonV1 + t6D6R + i18n_contreCoupsSiphonV2;
              break;

            case 5:
              resultTitre = i18n_contreCoupsSursautT;
              resultText = i18n_contreCoupsSursautV1 + t6D6D[0] + i18n_contreCoupsSursautV2;
              break;

            case 6:
              resultTitre = i18n_contreCoupsDesorientationT;
              resultText = i18n_contreCoupsDesorientationV1 + t6D6D[0] + i18n_contreCoupsDesorientationV2;
              break;

            default:
              resultTitre = '';
              resultText = '';
              break;
          }
          break;

        case 4:
          switch (tD2) {
            case 1:
              calcul = t6D6D[0] + t6D6D[1] + t6D6D[2] + t6D6D[3];

              resultTitre = i18n_contreCoupsIncidentT;
              resultText = i18n_contreCoupsIncidentV1 + calcul + i18n_contreCoupsIncidentV2;
              break;

            case 2:
              calcul = t6D6D[0];

              resultTitre = i18n_contreCoupsFragmentationT;
              resultText = i18n_contreCoupsFragmentationV1 + calcul + i18n_contreCoupsFragmentationV2;
              break;

            case 3:
              resultTitre = i18n_contreCoupsSiphonT;
              resultText = i18n_contreCoupsSiphonV1 + t6D6R + i18n_contreCoupsSiphonV2;
              break;

            case 4:
              resultTitre = i18n_contreCoupsSursautT;
              resultText = i18n_contreCoupsSursautV1 + t6D6D[0] + i18n_contreCoupsSursautV2;
              break;

            case 5:
              resultTitre = i18n_contreCoupsDesorientationT;
              resultText = i18n_contreCoupsDesorientationV1 + t6D6D[0] + i18n_contreCoupsDesorientationV2;
              break;

            case 6:
              calcul = t6D6D[0] + t6D6D[1] + t6D6D[2];

              resultTitre = i18n_contreCoupsDesagregationT;
              resultText = i18n_contreCoupsDesagregationV1 + calcul + i18n_contreCoupsDesagregationV2;
              break;

            default:
              resultTitre = '';
              resultText = '';
              break;
          }
          break;

        case 5:
          switch (tD2) {
            case 1:
            case 2:
              resultTitre = i18n_contreCoupsSiphonT;
              resultText = i18n_contreCoupsSiphonV1 + t6D6R + i18n_contreCoupsSiphonV2;
              break;

            case 3:
              resultTitre = i18n_contreCoupsSursautT;
              resultText = i18n_contreCoupsSursautV1 + t6D6D[0] + i18n_contreCoupsSursautV2;
              break;

            case 4:
              resultTitre = i18n_contreCoupsDesorientationT;
              resultText = i18n_contreCoupsDesorientationV1 + t6D6D[0] + i18n_contreCoupsDesorientationV2;
              break;

            case 5:
              calcul = t6D6D[0] + t6D6D[1] + t6D6D[2];

              resultTitre = i18n_contreCoupsDesagregationT;
              resultText = i18n_contreCoupsDesagregationV1 + calcul + i18n_contreCoupsDesagregationV2;
              break;

            case 6:
              resultTitre = i18n_contreCoupsDefaillanceT;
              resultText = i18n_contreCoupsDefaillanceV1 + t1D3 + i18n_contreCoupsDefaillanceV2;
              break;

            default:
              resultTitre = '';
              resultText = '';
              break;
          }
          break;

        case 6:
          switch (tD2) {
            case 1:
            case 2:
              resultTitre = i18n_contreCoupsSursautT;
              resultText = i18n_contreCoupsSursautV1 + t6D6D[0] + i18n_contreCoupsSursautV1;
              break;

            case 3:
              resultTitre = i18n_contreCoupsDesorientationT;
              resultText = i18n_contreCoupsDesorientationV1 + t6D6D[0] + i18n_contreCoupsDesorientationV2;
              break;

            case 4:
            case 5:
            case 6:
              resultTitre = i18n_contreCoupsDefaillanceT;
              resultText = i18n_contreCoupsDefaillanceV1 + t1D3 + i18n_contreCoupsDefaillanceV2;
              break;

            default:
              resultTitre = '';
              resultText = '';
              break;
          }
          break;

        default:
          resultTitre = '';
          resultText = '';
          break;
      }

      finishRoll(
        results.rollId,
        {
          rollTitre: resultTitre,
          rollText: resultText,
        },
      );
    });
  });
});

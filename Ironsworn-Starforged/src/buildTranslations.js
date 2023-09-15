const { starforged } = require('dataforged')

function keyFormat (inputString) {
  return inputString.toLowerCase().replace(/\s+/g, "-");
}

function convertToHtml(inputText, wrap = true) {
  // Use regular expressions to find and replace the text
  const replacedText = inputText.replace(/\[([^[\]]+)]\(([^)]+)\)/g, '<u>$1</u>');

  // Wrap the replaced text in <p> tags
  const finalText = wrap === true ? `<p>${replacedText}</p>` : replacedText

  return finalText;
}

function buildAssetTranslations () {
  let assetTranslations = {}
  const assetTypes = starforged['Asset Types']

  assetTypes.forEach((assetType) => {
    
    assetType.Assets.forEach((asset) => {
      
      const keyPrefix = `asset-${keyFormat(asset.Name)}`

      assetTranslations[`${keyPrefix}-name`] = asset.Name
      assetTranslations[`${keyPrefix}-asset-type`] = assetType.Name

      asset.Inputs?.forEach((input) => {
        assetTranslations[`${keyPrefix}-textinput-${keyFormat(input.Name)}`] = input.Name
      })

      if(asset.Requirement) {
        assetTranslations[`${keyPrefix}-requirement`] = convertToHtml(asset.Requirement, false)
      }

      if(asset['Condition Meter']) {
        const name = asset['Condition Meter'].Name
        assetTranslations[`${keyPrefix}-meter-${keyFormat(name)}`] = name
      }

      for (let i = 0; i < 3; i++) {
        assetTranslations[`${keyPrefix}-ability-${i + 1}`] = convertToHtml(asset.Abilities[i].Text)
        if (asset.Abilities[i].Inputs) {
          asset.Abilities[i].Inputs.forEach((input) => {
            assetTranslations[`${keyPrefix}-ability-${i + 1}-${keyFormat(input.Name)}`] = input.Name
          })
        }
      }

    })
  })
  return assetTranslations
}

module.exports = { buildAssetTranslations }
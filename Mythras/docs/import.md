# Mythras Roll20 Sheet Documentation: Import
The import function is provided to allow the import of characters from the [Mythras Encounter Generator (MEG)](https://mythras.skoll.xyz/).  To use it please follow the instructions below:
1. Visit the [Mythras Encounter Generator (MEG)](https://mythras.skoll.xyz/).
2. Search for your desired enemy and click to visit its template page.
3. Note the number at the end of the URL in your browser's navigation bar.  For example, if you looked up a zombie and opened its page, you may find the URL is `https://mythras.skoll.xyz/enemy_template/3224/`.  The number we want is `3224`.
4. Go to this url but replace `####` with the number noted in step 3.  `http://skoll.xyz/mythras_eg/generate_enemies_json/?amount=1&id=####`.
    * By default this will generate 1 character but you can repalce `&amount=1` with the number you wish to generate to get more.  Eg, http://skoll.xyz/mythras_eg/generate_enemies_json/?amount=6&id=3224`
    * Some browsers, like Firefox, may render the JSON data in a more human friendly format.  We need the raw data version.  If your browser does this click the `Raw Data` tab to get the format we need.
5. Copy and paste the JSON data into `Import Data`
6. Click the `Import` button to load the character into the Roll20 sheet.
   * By default, the import will automatically determine if the character is a "Creature" sheet type or a "Spirit" sheet type and will configure the sheet as such.
   * If you generated multiple characters in the JSON export you can change the number to import.  Simply enter the number you want in the `#` input.
7. If you want to generate more JSON exports of the same type simply refresh the JSON data page to generate a new copy.

## Notice
* It is always recommended to import with a fresh character.  Importing on an existing character will overwrite data and may have unexpected results.

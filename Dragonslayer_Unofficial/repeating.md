# Character Sheet Development/Repeating Section

**From Roll20 Wiki**

*Page Updated: 2023-11-05*

**Note:** This information pertains to editing (coding) Character Sheets, which requires Pro account access to utilize. For more details, refer to the main page: [Building Character Sheets](https://wiki.roll20.net/Building_Character_Sheets).

## Repeating Sections

### General

Sometimes, you may have a type of object where there may be one or more instances, and it's not known ahead of time how many there are. A good example of this is the Skills listing for a Character in Savage Worlds. Roll20's sheets allow you to define a template for each item in the section, and the player can then add as many of these in the listing as they need.

**Example:**

````html
<h3>Skills</h3>
<fieldset class="repeating_skills">
  <button type="roll" name="roll_skill" value="/em uses @{skillname}, and rolls [[@{dtype}]]"></button>
  <input type="text" name="attr_skillname" value="">
  <select name="attr_dtype" class="dtype"> 
    <option value="d6">d6</option>
    <option value="d10">d10</option>
  </select>
</fieldset>
````

### Definition & Restrictions

To define a repeating section, create a `<fieldset>` element with a unique `class` that starts with the `repeating_` prefix, followed by a name written in lowercase without underscores. Inside the `<fieldset>`, place the input fields that each instance of the section should have.

**Important Points:**

- Each repeating section should have a unique name, and you **cannot use underscores**. For example, use `repeating_melee` or `repeating_meleeweapon`, **not** `repeating_melee_weapon`.
- Attribute names within one repeating section don't have to be unique compared to attribute names in another section. For instance, both `repeating_melee` and `repeating_ranged` can have an attribute named `attr_name`, as they don't affect each other.
- Class names should be all lowercase. If not, you may encounter issues with launching buttons in a repeating section from macros and scripts.
- Nesting repeating sections is not possible. However, you can vote on the suggestion in the [Roll20 forums](https://app.roll20.net/forum/post/123456/nested-repeating-sections-request) and comment on why this feature is desired.
- Referencing buttons in repeating sections behaves slightly differently than in regular parts of a sheet.
- All attributes in a repeating section should have a unique name that isn't already used by a "normal" attribute outside of the repeating section. For example, if you have `attr_spellname` in your repeating section, you cannot have a "normal" `attr_spellname` outside of the repeating section, but it's fine to have `attr_spellname` inside another repeating section.

**Good Example:**

````html
<fieldset class="repeating_spell-level1">
  <input type="text" name="attr_spellname">
</fieldset>
<fieldset class="repeating_spell-level2">
  <input type="text" name="attr_spellname">
</fieldset>
````

**Bad Example:**

````html
<input type="text" name="attr_spellname">
<fieldset class="repeating_spell-level1">
  <input type="text" name="attr_spellname">
</fieldset>
````

In the good example, the attribute `attr_spellname` is only present inside repeating sections, allowing its reuse in this way. In the bad example, the attribute `attr_spellname` is present both as a "normal" attribute and within a repeating section, which should be avoided.

- Repeating sections are hard or impossible to create around an HTML `<table>` and are recommended to be placed within a single cell if you insist on trying to use `<table>`.
- Using `<table>` inside repeating sections might interfere with sheetworkers. Refer to the [forum discussion](https://app.roll20.net/forum/post/123456/button-sheetworker-not-working) for more details.

When the sheet is displayed, Roll20 will automatically include:

- **Add** buttons, allowing players to add as many of each item as needed.
- **Modify** buttons, which, when pressed, enable players to drag and reorder items in the repeating section, along with showing the delete button (`#`) for deleting individual items.

Each item will have its own set of fields (in the example above, each has its own `attr_dtype` and `attr_skillname`).

Internally, each repeating item is stored in an attribute like so: `repeating_skills_-ABC123_dtype` or `repeating_skills_$0_skillname`. The rowID (the `-ABC123` part of the previous example) will never change for a repeating section row, so you can reference it in macros, abilities, and API scripts. New rows that you add will be randomly assigned a new unique ID. By default, rows are ordered in the order in which they were created, the oldest at the top.

### Styling Repeating Sections

It's possible to style your repeating sections in a variety of ways. However, you can't just write your CSS as though the `<fieldset>` that's in your HTML source is what the user is viewing. After writing the code for your repeating section, here is how it will look when rendered to the user:

````html
<fieldset class="repeating_my-repeating-section" style="display: none;">
    <!-- my-repeating-section HTML -->
</fieldset>
<div class="repcontainer" data-groupname="repeating_my-repeating-section">
    <div class="repitem">
        <div class="itemcontrol">
            <button class="btn btn-danger pictos repcontrol_del">#</button>
            <a class="btn repcontrol_move">≡</a>
        </div>
        <!-- my-repeating-section HTML -->
    </div>
    <!-- there will be a div.repitem for each item the user has actually added to the sheet -->
</div>
<div class="repcontrol" data-groupname="repeating_my-repeating-section">
    <button class="btn repcontrol_edit">Modify</button>
    <button class="btn repcontrol_add">+Add</button>
</div>
````

When you click the **Modify** button, the **Add** button is set to `display: none` and the text of the **Modify** button is changed to "Done". When you click **Done**, the **Add** button is set to `display: inline-block` and the text of the **Done** button is changed back to "Modify". While modifying repitems, the repcontainer gains the class "editmode".

**Example of Multiple Repeating Items per Row:**

````css
.repcontainer[data-groupname="repeating_skills"] > .repitem {
    display: inline-block;
}
````

**Note:** You do not prefix the `rep*` classes with `sheet-`!

Remember to use the `[data-groupname="repeating_..."]` attribute selector if you want to apply the style to a single repeating section. If you want the style to apply to every repeating section on your sheet, simply use the `.repcontainer` selector without the attribute.

### Other Considerations

- Be cautious with HTML elements inside repeating sections, as some elements like `<table>` might cause conflicts or unexpected behavior.
- Always test your character sheet thoroughly to ensure that all buttons, macros, and API scripts work as expected.

For more detailed information, refer to the full article on the Roll20 Wiki.


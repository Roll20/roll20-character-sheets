function numberArrowIncrement(
    attrName: string,
    increment: 1 | -1 | 2 | -2 | 0
): void {
    getAttrs([attrName, `${attrName}_max`, `${attrName}_min`], (v) => {
        setAttrs({
            [attrName]: Math.max(
                Math.min(
                    (parseInt(v[attrName]) || 0) + increment,
                    parseInt(v[`${attrName}_max`]) || 100
                ),
                parseInt(v[`${attrName}_min`]) || 0
            ),
        });
    });
}

$20('.decrement').on('click', (event) => {
    const attrName = event.htmlAttributes.class.split(' ')[0];
    numberArrowIncrement(attrName, -1);
});

$20('.increment').on('click', (event) => {
    const attrName = event.htmlAttributes.class.split(' ')[0];
    numberArrowIncrement(attrName, 1);
});

$20('.decrement2').on('click', (event) => {
    const attrName = event.htmlAttributes.class.split(' ')[0];
    numberArrowIncrement(attrName, -2);
});

$20('.increment2').on('click', (event) => {
    const attrName = event.htmlAttributes.class.split(' ')[0];
    numberArrowIncrement(attrName, 2);
});

$20('.number-input-arrows input').on('change', (e) => {
    numberArrowIncrement(e.htmlAttributes.name.slice(5), 0);
});

function setAdvSkillsLines(id: string) {
    // getAttrs([id], (v) => {
    //     const value = v[id];
    //     if (value.length > 19) {
    //         $20(`#${id}`).addClass('double-line');
    //     } else {
    //         $20(`#${id}`).removeClass('double-line');
    //     }
    //     setAttrs({ [id]: value.replace(/\r\n|\r|\n/g, '') });
    // });
}

$20('.advskills textarea').on('change', (event) => {
    setAdvSkillsLines(event.htmlAttributes.id);
});

on('sheet:opened', () =>
    [0, 1, 2, 3, 4, 5, 6, 7].forEach((i) =>
        setAdvSkillsLines(`advskill_${i}_name`)
    )
);

(['strength', 'toughness', 'insight'] as const).map((attr) =>
    on(`change:${attr}`, (e) =>
        showHideAbility(e.sourceAttribute, parseInt(e.newValue))
    )
);

([0, 1, 2, 3, 4, 5] as const).map((n) =>
    on(
        `change:skill_custom_${n}`,
        (e) =>
            parseInt(e.newValue) < 1 &&
            setAttrs({ [`${e.sourceAttribute}`]: 1 })
    )
);

([0, 1, 2, 3, 4, 5] as const).map((n) =>
    on(
        `change:skill_advskill_${n}_value`,
        (e) =>
            parseInt(e.newValue) < 1 &&
            setAttrs({ [`${e.sourceAttribute}`]: 1 })
    )
);

on('change:armor_max_dents', (e) => showHideDents(parseInt(e.newValue)));
on('change:armor_max_resilience', (e) =>
    showHideResilience(parseInt(e.newValue) || 0)
);

on('change:tab', (e) => toggleActiveTab(e.newValue));

on('sheet:opened', (e) => {
    const attributes = ['strength', 'toughness', 'insight'] as const;
    getAttrs(attributes, (v) => {
        attributes.forEach((attr) => showHideAbility(attr, parseInt(v[attr])));
    });
    getAttrs(['armor_max_dents', 'armor_max_resilience'], (v) => {
        showHideDents(parseInt(v.armor_max_dents));
        showHideResilience(parseInt(v.armor_max_resilience));
    });
    getAttrs(['tab'], (v) => toggleActiveTab(v.tab));
    ([0, 1, 2, 3, 4, 5] as const).map((n) =>
        getAttrs(
            [`skill_custom_${n}`],
            (v) =>
                parseInt(v[`skill_custom_${n}`]) < 1 &&
                setAttrs({ [`skill_custom_${n}`]: 1 })
        )
    );
    ([0, 1, 2, 3, 4, 5] as const).map((n) =>
        getAttrs(
            [`skill_advskill_${n}_value`],
            (v) =>
                parseInt(v[`skill_advskill_${n}_value`]) < 1 &&
                setAttrs({ [`skill_advskill_${n}_value`]: 1 })
        )
    );
});

type ActionRoll = 'successes' | 'difficulty' | 'setback' | 'extra_successes';

/**
 * Start an Action Roll
 * @param config Config object for the roll.
 * @param callback Callback function which receives the roll results.
 */
function startActionRoll(
    {
        ability,
        difficulty,
        title,
        useExtra,
        template = 'ability',
    }: {
        ability: number;
        difficulty?: number;
        title?: string;
        useExtra?: boolean;
        template?: string;
    },
    callback?: RollCallback<ActionRoll>
) {
    if (!useExtra) {
        myStartRoll(
            template,
            { title: title ?? 'Action Roll', charname: '@{character_name}' },
            {
                difficulty: `${difficulty ?? '@{ability_difficulty}'}`,
                successes: `${ability}d10`,
            },
            callback as RollCallback<'difficulty' | 'successes'>
        );
    } else {
        myStartRoll(
            template,
            { title: title ?? 'Action Roll', charname: '@{character_name}' },
            {
                difficulty: `${difficulty ?? '@{ability_difficulty}'}`,
                successes: `${ability}d10`,
                setback: '0',
                extra_successes: '0',
            },
            callback
        );
    }
}

/**
 * Processes an action roll to give calculated number of successes, setback die, and extra successes
 * @param results The raw results from an action roll
 */
function processActionRoll(results: RollResults<ActionRoll>): {
    [key in ActionRoll]: number;
} {
    const successes = results.successes.dice
        .map((d) => (d === 10 ? 2 : d > 7 ? 1 : (0 as number)))
        .reduce((a, b) => a + b, 0);
    return {
        successes,
        difficulty: results.difficulty.result,
        setback: results.successes.dice[0],
        extra_successes: successes - results.difficulty.result,
    };
}

/**
 * Perform a full Action roll, start to finish
 * @param ability number of ability dice to roll
 * @param difficulty Difficulty of the roll, else uses set difficulty from sheet
 * @param title Title of the roll in the template
 * @param useExtra Whether to include Setback and extra successes
 * @param save Whether to save the roll in the reroll buffer
 * @param template the name of the roll template to use
 */
function rollActionDice(
    ability: number,
    difficulty?: number,
    title = 'Action Roll',
    useExtra = true,
    save = true,
    template = 'ability'
) {
    startActionRoll(
        { ability, difficulty, title, useExtra, template },
        ({ rollId, results }) => {
            const finalResults = processActionRoll(results);
            finishRoll(rollId, finalResults);
            save &&
                setAttrs({
                    last_roll: btoa(JSON.stringify(results)),
                });
        }
    );
}

on('clicked:roll_action_dice', (e) =>
    rollActionDice(parseInt(e.htmlAttributes.value || '1') || 1)
);

on('clicked:roll_damage_h_l', () => {
    myStartRoll(
        'damage',
        { title: 'DAMAGE', dice: 'H+L', charname: '@{character_name}' },
        { damage: '3d6' },
        ({ rollId, results }) => {
            finishRoll(rollId, {
                roll: results.damage.dice
                    .sort()
                    .filter((_, i) => i != 1)
                    .reduce((a, b) => a + b, 0),
            });
        }
    );
});

on('clicked:roll_doom_roll5', () => {
    getAttrs(['doom_points'], ({ doom_points }) => {
        if ((parseInt(doom_points) || 0) > 0) {
            setAttrs({ doom_points: parseInt(doom_points) - 1 });
            rollActionDice(5, undefined, 'ACTION ROLL 5');
        }
    });
});

on('clicked:roll_doom_reroll', () => {
    getAttrs(['last_roll', 'doom_points'], (v) => {
        if (!v.last_roll) {
            console.log('You must roll something before you can reroll it!');
            return;
        }
        if ((parseInt(v.doom_points) || 0) < 1) {
            console.log('Not enough Doom Points!');
            return;
        }
        setAttrs({ doom_points: parseInt(v.doom_points) - 1 });
        const lastRoll: RollResults<ActionRoll> = JSON.parse(atob(v.last_roll));
        const computedLastRoll = processActionRoll(lastRoll);
        const failedDice = lastRoll.successes.dice.filter((d) => d < 8).length;
        startActionRoll(
            {
                ability: failedDice,
                difficulty: lastRoll.difficulty.result,
                title: 'Action Reroll',
                useExtra: true,
            },
            ({ rollId, results }) => {
                const computedResults = processActionRoll(results);
                finishRoll(rollId, {
                    successes:
                        computedLastRoll.successes + computedResults.successes,
                    setback:
                        computedLastRoll.setback > 7
                            ? computedLastRoll.setback
                            : computedResults.setback,
                    extra_successes:
                        computedLastRoll.successes +
                        computedResults.successes -
                        results.difficulty.result,
                });
            }
        );
    });
});

on('clicked:doom_roll', () => {
    getAttrs(['doom_points'], ({ doom_points }) => {
        rollActionDice(
            parseInt(doom_points) || 0,
            2,
            'Doom Roll',
            false,
            false,
            'doom'
        );
    });
});

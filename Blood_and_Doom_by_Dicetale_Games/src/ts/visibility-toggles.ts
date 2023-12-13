function showHideAbility(ability: string, value: number): void {
    if (value < 4) {
        $20(`.${ability}-4, .${ability}-5`).addClass('hidden');
    } else if (value < 5) {
        $20(`.${ability}-5`).addClass('hidden');
        $20(`.${ability}-4`).removeClass('hidden');
    } else {
        $20(`.${ability}-4, .${ability}-5`).removeClass('hidden');
    }
}

function showHideDents(value: number): void {
    $20(
        [2, 3, 4, 5, 6]
            .filter((n) => n <= value)
            .map((n) => `.dented-${n}`)
            .join(', ')
    ).removeClass('hidden');
    $20(
        [2, 3, 4, 5, 6]
            .filter((n) => n > value)
            .map((n) => `.dented-${n}`)
            .join(', ') || 'this-does-not-exist' // It's _fine_
    ).addClass('hidden');
}

function showHideResilience(value: number): void {
    $20(
        [2, 4, 6, 8, 10]
            .filter((n) => n <= value)
            .map((n) => `.resilience-${n}`)
            .join(', ')
    ).removeClass('hidden');
    $20(
        [2, 4, 6, 8, 10]
            .filter((n) => n > value)
            .map((n) => `.resilience-${n}`)
            .join(', ') || 'this-does-not-exist' // It's _fine_
    ).addClass('hidden');
}

function toggleActiveTab(tab: string) {
    $20('.header .tabs label').removeClass('active');
    $20(`.header .tabs .tab-${tab}`).addClass('active');
}

const calculateAbilityMod = (ability: number) => {
    if (ability < 4) return -2;
    if (ability < 7) return -1;
    if (ability < 14) return 0;
    if (ability < 18) return 1;
    return 2;
};

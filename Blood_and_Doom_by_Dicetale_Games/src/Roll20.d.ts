// Type definitions for Roll20 built-in functions and variables
// Project: Roll20 Stars Without Number Revised
// Definitions by: Karl Erik Hofseth https://github.com/Karlinator

declare type EventInfo = {
    htmlAttributes?: {
        name: string;
        [key: string]: string;
    };
    sourceAttribute: string;
    triggerName: string;
    sourceType: 'player' | 'sheetworker';
    previousValue: string;
    newValue: string;
    removedInfo: string;
};

declare interface RollResult {
    result: number;
    dice: number[];
    expression: string;
    rolls: [
        {
            dice: number;
            sides: number;
            results: number[];
        }
    ];
}

declare type RollResults<T extends string> = { [key in T]: RollResult };

declare type RollCallback<T extends string> = (arg: {
    rollId: string;
    results: { [key in T]: RollResult };
}) => void;

declare type AttributeContent = string | number | boolean;

declare function getAttrs<T extends string>(
    attributes: T[] | readonly T[],
    callback?: (values: { [key in T]: string }) => void
): void;

declare function setAttrs(
    values: { [key: string]: AttributeContent },
    options?: { silent?: boolean },
    callback?: (values: { [key: string]: string }) => void
): void;

declare function getSectionIDs(
    section_name: string,
    callback: (values: string[]) => void
): void;

declare function generateRowID(): string;

declare function removeRepeatingRow(RowID: string): void;

declare function getTranslationByKey(key: string): string | false;

declare function getTranslationLanguage(): string;

declare function setDefaultToken(values: { [key: string]: string }): void;

declare function startRoll(roll: string, callback?: RollCallback<string>): void;

declare function finishRoll(
    rollId: string,
    computedResults?: { [key: string]: string | number }
): void;

declare function on(
    event: 'sheet:opened',
    callback: (e: {
        sourceAttribute: undefined;
        sourceType: 'player';
        triggerName: typeof event;
    }) => void
): void;

declare function on(
    event: 'sheet:compendium-drop',
    callback: (e: {
        sourceAttribute: undefined;
        sourceType: 'player';
        triggerName: typeof event;
    }) => void
): void;

declare function on<T extends string>(
    event: `clicked:${T}`,
    callback: (e: {
        triggerName: typeof event;
        sourceType: undefined;
        sourceAttribute: undefined;
        htmlAttributes: {
            type: 'action';
            name: `act_${T}`;
            tagName: string;
            [key: string]: string;
        };
    }) => void
): void;

declare function on<T extends string>(
    event: `change:_reporder:${T}`,
    callback: (e: {
        sourceAttribute: `_reporder_repeating_${T}`;
        sourceType: 'player' | 'sheetworker';
        triggerName: `_reporder_repeating_${T}`;
    }) => void
): void;

declare function on<T extends string>(
    event: `remove:repeating_${T}`,
    callback: (e: {
        sourceAttribute: `repeating_${T}_${string}`;
        sourceType: 'player' | 'sheetworker';
        triggerName: typeof event;
    }) => void
): void;

// These need to go from high specificity to low specificity event string, so that they match correctly
// Otherwise, everything would just match on(`change:${string}`)

declare function on<T extends string, U extends string>(
    event: `change:repeating_${T}:${U}`,
    callback: (e: {
        newValue: string;
        previousValue: string;
        sourceAttribute: `repeating_${T}_${string}_${U}`;
        sourceType: 'player' | 'sheetworker';
        triggerName: `repeating_${T}_${U}`;
    }) => void
): void;

declare function on<T extends string>(
    event: `change:repeating_${T}`,
    callback: (e: {
        newValue: string;
        previousValue: string;
        sourceAttribute: `repeating_${T}_${string}_${string}`;
        sourceType: 'player' | 'sheetworker';
        triggerName: `repeating_${T}_${string}`;
    }) => void
): void;

declare function on<T extends string>(
    event: `change:${T}`,
    callback: (e: {
        sourceAttribute: T;
        sourceType: 'player' | 'sheetworker';
        triggerName: T;
        previousValue: string;
        newValue: string;
    }) => void
): void;

declare type Roll20Event =
    | 'change'
    | 'click'
    | 'hover'
    | 'mouseenter'
    | 'mouseleave';

declare interface Roll20EventInfo {
    htmlAttributes: {
        class: string;
        id: string;
        [key: string]: string;
    };
    altKey: boolean;
    shiftKey: boolean;
    ctrlKey: boolean;
    pageX: number;
    pageY: number;
}

declare interface Roll20Element {
    on: (
        event: Roll20Event,
        callback: (event: Roll20EventInfo) => void
    ) => void;
    addClass: (className: string) => void;
    removeClass: (className: string) => void;
    toggleClass: (className: string) => void;
}

declare function $20(selector: string): Roll20Element;

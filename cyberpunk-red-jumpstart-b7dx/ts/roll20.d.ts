declare type EventSourceType = "player" | "sheetworker"

declare interface Event {
    sourceAttribute: string
    sourceType: EventSourceType
    previousValue: string
    newValue: string
    removedInfo: Record<string, string>
    triggerName: string
}

declare interface Token {
    bar1_value: string
    bar1_max: string
    bar2_value: string
    bar2_max: string
    bar3_value: string
    bar3_max: string
    aura1_square: string
    aura1_radius: string
    aura1_color: string
    aura2_square: string
    aura2_radius: string
    aura2_color: string
    tint_color: string
    showname: string
    showplayers_name: string
    playersedit_name: string
    showplayers_bar1: string
    playersedit_bar1: string
    showplayers_bar2: string
    playersedit_bar2: string
    showplayers_bar3: string
    playersedit_bar3: string
    showplayers_aura1: string
    playersedit_aura1: string
    showplayers_aura2: string
    playersedit_aura2: string
    light_radius: string
    light_dimradius: string
    light_angle: string
    light_otherplayers: string
    light_hassight: string
    light_losangle: string
    light_multiplier: string
}

declare function on(eventString: string, callback: (event: Event) => void): void;

declare function getAttrs(referenceArray: string[], callback: (object: Record<string, string>) => void): void;

declare function setAttrs(referenceValueObject: Record<string, string>, option?: unknown, callback?: () => void): void;

declare function getSectionIDs(repeatingName: string, callback: (repeatingIdArray: string[]) => void): void;
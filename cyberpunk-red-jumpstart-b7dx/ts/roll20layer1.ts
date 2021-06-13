/// <reference path="./utility.ts"/>
/// <reference path="./roll20.d.ts"/>

namespace Roll20Layer1 {

    import Eq = Utility.Eq;
    import Maybe = Utility.Maybe;
    import Ord = Utility.Ord;
    import Ordering = Utility.Ordering;
    import assign = Utility.assign;
    import deduplicate = Utility.deduplicate;
    import just = Utility.just;
    import nothing = Utility.nothing;
    import require = Utility.require;

    export function onOpen(callback: () => void) {
        require(callback, "callback")

        on("sheet:opened", callback)
    }

    export function onDrop(callback: () => void) {
        require(callback, "callback")

        on("sheet:compendium_drop", callback)
    }

    export interface ReferenceSourceChange {
        matchSourceChange: <T1>(
            fReferenceAttribute: (attributeName: string) => T1,
            fReferenceRepeating: (repeatingName: string) => T1,
            fReferenceRepeatingAttribute: (repeatingName: string, attributeName: string) => T1,
            fReferenceRepeatingIdAttribute: (repeatingName: string, repeatingId: string, attributeName: string) => T1
        ) => T1
    }

    export interface ReferenceSourceValue {
        matchSourceValue: <T1>(
            fReferenceAttribute: (attributeName: string) => T1,
            fReferenceRepeatingIdAttribute: (repeatingName: string, repeatingId: string, attributeName: string) => T1
        ) => T1
    }

    export function ReferenceSourceValueEq(v1: ReferenceSourceValue, v2: ReferenceSourceValue): boolean {
        require(v1, "v1")
        require(v2, "v2")

        return v1.matchSourceValue(
            (attributeName: string) => v2.matchSourceValue(
                (attributeNameInner: string) =>
                    ReferenceAttribute.eq(
                        referenceAttribute(attributeName),
                        referenceAttribute(attributeNameInner)),
                (repeatingName: string, repeatingId: string, attributeName: string) =>
                    false),
            (repeatingName: string, repeatingId: string, attributeName: string) => v2.matchSourceValue(
                (attributeNameInner: string) =>
                    false,
                (repeatingNameInner: string, repeatingIdInner: string, attributeNameInner: string) =>
                    ReferenceRepeatingIdAttribute.eq(
                        referenceRepeatingIdAttribute(repeatingName, repeatingId, attributeName),
                        referenceRepeatingIdAttribute(repeatingNameInner, repeatingIdInner, attributeNameInner))
            )
        )
    }

    export function ReferenceSourceValueOrd(v1: ReferenceSourceValue, v2: ReferenceSourceValue): Ordering {
        require(v1, "v1")
        require(v2, "v2")

        return v1.matchSourceValue(
            (attributeName: string) => v2.matchSourceValue(
                (attributeNameInner: string) =>
                    ReferenceAttribute.ord(
                        referenceAttribute(attributeName),
                        referenceAttribute(attributeNameInner)),
                (repeatingName: string, repeatingId: string, attributeName: string) =>
                    Ordering.LT),
            (repeatingName: string, repeatingId: string, attributeName: string) => v2.matchSourceValue(
                (attributeNameInner: string) =>
                    Ordering.GT,
                (repeatingNameInner: string, repeatingIdInner: string, attributeNameInner: string) =>
                    ReferenceRepeatingIdAttribute.ord(
                        referenceRepeatingIdAttribute(repeatingName, repeatingId, attributeName),
                        referenceRepeatingIdAttribute(repeatingNameInner, repeatingIdInner, attributeNameInner))))
    }

    export interface ReferenceSourceChangeAttribute extends ReferenceSourceChange {
    }

    export interface ReferenceSourceChangeRepeating extends ReferenceSourceChange {
    }

    export class ReferenceAttribute implements ReferenceSourceChangeAttribute, ReferenceSourceValue {
        readonly attributeName: string

        constructor(attributeName: string) {
            require(attributeName, "attributeName")

            this.attributeName = attributeName.toLowerCase()
        }

        matchSourceChange<T1>(
            fReferenceAttribute: (attributeName: string) => T1,
            fReferenceRepeating: (repeatingName: string) => T1,
            fReferenceRepeatingAttribute: (repeatingName: string, attributeName: string) => T1,
            fReferenceRepeatingIdAttribute: (repeatingName: string, repeatingId: string, attributeName: string) => T1): T1 {

            require(fReferenceAttribute, "fReferenceAttribute")
            require(fReferenceRepeating, "fReferenceRepeating")
            require(fReferenceRepeatingAttribute, "fReferenceRepeatingAttribute")
            require(fReferenceRepeatingIdAttribute, "fReferenceRepeatingIdAttribute")

            return fReferenceAttribute(this.attributeName)
        }

        matchSourceValue<T1>(
            fReferenceAttribute: (attributeName: string) => T1,
            fReferenceRepeatingIdAttribute: (repeatingName: string, repeatingId: string, attributeName: string) => T1): T1 {

            require(fReferenceAttribute, "fReferenceAttribute")
            require(fReferenceRepeatingIdAttribute, "fReferenceRepeatingIdAttribute")

            return fReferenceAttribute(this.attributeName)
        }

        toReferenceRepeatingAttribute(repeatingName: string): ReferenceRepeatingAttribute {
            require(repeatingName, "repeatingName")

            return referenceRepeatingAttribute(repeatingName, this.attributeName)
        }

        static eq: Eq<ReferenceAttribute> = (v1: ReferenceAttribute, v2: ReferenceAttribute) => {
            require(v1, "v1")
            require(v2, "v2")

            return v1.attributeName === v2.attributeName
        }

        static ord: Ord<ReferenceAttribute> = (v1: ReferenceAttribute, v2: ReferenceAttribute) => {
            require(v1, "v1")
            require(v2, "v2")

            return ((value) => value === -1 ?
                Ordering.LT :
                value === 0 ?
                    Ordering.EQ :
                    Ordering.GT)(v1.attributeName.localeCompare(v2.attributeName))
        }
    }

    export function referenceAttribute(attributeName: string): ReferenceAttribute {
        return new ReferenceAttribute(attributeName)
    }

    export class ReferenceRepeating implements ReferenceSourceChangeRepeating {
        readonly repeatingName: string

        constructor(repeatingName: string) {
            require(repeatingName, "repeatingName")

            this.repeatingName = repeatingName.toLowerCase()
        }

        matchSourceChange<T1>(
            fReferenceAttribute: (attributeName: string) => T1,
            fReferenceRepeating: (repeatingName: string) => T1,
            fReferenceRepeatingAttribute: (repeatingName: string, attributeName: string) => T1,
            fReferenceRepeatingIdAttribute: (repeatingName: string, repeatingId: string, attributeName: string) => T1): T1 {

            require(fReferenceAttribute, "fReferenceAttribute")
            require(fReferenceRepeating, "fReferenceRepeating")
            require(fReferenceRepeatingAttribute, "fReferenceRepeatingAttribute")
            require(fReferenceRepeatingIdAttribute, "fReferenceRepeatingIdAttribute")

            return fReferenceRepeating(this.repeatingName)
        }

        toReferenceRepeatingAttribute(attributeName: string): ReferenceRepeatingAttribute {
            require(attributeName, "attributeName")

            return referenceRepeatingAttribute(this.repeatingName, attributeName)
        }

        toReferenceRepeatingId(repeatingId: string): ReferenceRepeatingId {
            require(repeatingId, "repeatingId")

            return referenceRepeatingId(this.repeatingName, repeatingId)
        }

        static eq: Eq<ReferenceRepeating> = (v1: ReferenceRepeating, v2: ReferenceRepeating) => {
            require(v1, "v1")
            require(v2, "v2")

            return v1.repeatingName === v2.repeatingName
        }

        static ord: Ord<ReferenceRepeating> = (v1: ReferenceRepeating, v2: ReferenceRepeating) => {
            require(v1, "v1")
            require(v2, "v2")

            return ((value) => value === -1 ?
                Ordering.LT :
                value === 0 ?
                    Ordering.EQ :
                    Ordering.GT)(v1.repeatingName.localeCompare(v2.repeatingName))
        }
    }

    export function referenceRepeating(repeatingName: string): ReferenceRepeating {
        return new ReferenceRepeating(repeatingName)
    }

    export class ReferenceRepeatingAttribute implements ReferenceSourceChangeRepeating {
        readonly repeatingName: string
        readonly attributeName: string

        constructor(repeatingName: string, attributeName: string) {
            require(repeatingName, "repeatingName")
            require(attributeName, "attributeName")

            this.repeatingName = repeatingName.toLowerCase()
            this.attributeName = attributeName.toLowerCase()
        }

        matchSourceChange<T1>(
            fReferenceAttribute: (attributeName: string) => T1,
            fReferenceRepeating: (repeatingName: string) => T1,
            fReferenceRepeatingAttribute: (repeatingName: string, attributeName: string) => T1,
            fReferenceRepeatingIdAttribute: (repeatingName: string, repeatingId: string, attributeName: string) => T1): T1 {

            require(fReferenceAttribute, "fReferenceAttribute")
            require(fReferenceRepeating, "fReferenceRepeating")
            require(fReferenceRepeatingAttribute, "fReferenceRepeatingAttribute")
            require(fReferenceRepeatingIdAttribute, "fReferenceRepeatingIdAttribute")

            return fReferenceRepeatingAttribute(this.repeatingName, this.attributeName)
        }

        toReferenceAttribute(): ReferenceAttribute {
            return referenceAttribute(this.attributeName)
        }

        toReferenceRepeating(): ReferenceRepeating {
            return referenceRepeating(this.repeatingName)
        }

        toReferenceRepeatingIdAttribute(repeatingId: string): ReferenceRepeatingIdAttribute {
            require(repeatingId, "repeatingId")

            return referenceRepeatingIdAttribute(this.repeatingName, repeatingId, this.attributeName)
        }

        static eq: Eq<ReferenceRepeatingAttribute> = (v1: ReferenceRepeatingAttribute, v2: ReferenceRepeatingAttribute) => {
            require(v1, "v1")
            require(v2, "v2")

            return v1.repeatingName === v2.repeatingName &&
                v1.attributeName === v2.attributeName
        }

        static ord: Ord<ReferenceRepeatingAttribute> = (v1: ReferenceRepeatingAttribute, v2: ReferenceRepeatingAttribute) => {
            require(v1, "v1")
            require(v2, "v2")

            return ((value) => value === 0 ?
                ((value) => value === -1 ?
                    Ordering.LT :
                    value === 0 ?
                        Ordering.EQ :
                        Ordering.GT)(v1.attributeName.localeCompare(v2.attributeName)) :
                value)(ReferenceRepeating.ord(v1.toReferenceRepeating(), v2.toReferenceRepeating()))
        }
    }

    export function referenceRepeatingAttribute(repeatingName: string, attributeName: string): ReferenceRepeatingAttribute {
        return new ReferenceRepeatingAttribute(repeatingName, attributeName)
    }

    export class ReferenceRepeatingId {
        readonly repeatingName: string
        readonly repeatingId: string

        constructor(repeatingName: string, repeatingId: string) {
            require(repeatingName, "repeatingName")
            require(repeatingId, "repeatingId")

            this.repeatingName = repeatingName.toLowerCase()
            this.repeatingId = repeatingId.toLowerCase()
        }

        toReferenceRepeating(): ReferenceRepeating {
            return referenceRepeating(this.repeatingName)
        }

        toReferenceRepeatingIdAttribute(attributeName: string): ReferenceRepeatingIdAttribute {
            require(attributeName, "attributeName")

            return referenceRepeatingIdAttribute(this.repeatingName, this.repeatingId, attributeName)
        }

        static eq: Eq<ReferenceRepeatingId> = (v1: ReferenceRepeatingId, v2: ReferenceRepeatingId) => {
            require(v1, "v1")
            require(v2, "v2")

            return v1.repeatingName === v2.repeatingName &&
                v1.repeatingId === v2.repeatingId
        }

        static ord: Ord<ReferenceRepeatingId> = (v1: ReferenceRepeatingId, v2: ReferenceRepeatingId) => {
            require(v1, "v1")
            require(v2, "v2")

            return ((value) => value === 0 ?
                ((value) => value === -1 ?
                    Ordering.LT :
                    value === 0 ?
                        Ordering.EQ :
                        Ordering.GT)(v1.repeatingId.localeCompare(v2.repeatingId)) :
                value)(ReferenceRepeating.ord(v1.toReferenceRepeating(), v2.toReferenceRepeating()))
        }
    }

    export function referenceRepeatingId(repeatingName: string, repeatingId: string): ReferenceRepeatingId {
        return new ReferenceRepeatingId(repeatingName, repeatingId)
    }

    export class ReferenceRepeatingIdAttribute implements ReferenceSourceChangeRepeating, ReferenceSourceValue {
        readonly repeatingName: string
        readonly repeatingId: string
        readonly attributeName: string

        constructor(repeatingName: string, repeatingId: string, attributeName: string) {
            require(repeatingName, "repeatingName")
            require(repeatingId, "repeatingId")
            require(attributeName, "attributeName")

            this.repeatingName = repeatingName.toLowerCase()
            this.repeatingId = repeatingId.toLowerCase()
            this.attributeName = attributeName.toLowerCase()
        }

        matchSourceChange<T1>(
            fReferenceAttribute: (attributeName: string) => T1,
            fReferenceRepeating: (repeatingName: string) => T1,
            fReferenceRepeatingAttribute: (repeatingName: string, attributeName: string) => T1,
            fReferenceRepeatingIdAttribute: (repeatingName: string, repeatingId: string, attributeName: string) => T1): T1 {

            require(fReferenceAttribute, "fReferenceAttribute")
            require(fReferenceRepeating, "fReferenceRepeating")
            require(fReferenceRepeatingAttribute, "fReferenceRepeatingAttribute")
            require(fReferenceRepeatingIdAttribute, "fReferenceRepeatingIdAttribute")

            return fReferenceRepeatingIdAttribute(this.repeatingName, this.repeatingId, this.attributeName)
        }

        matchSourceValue<T1>(
            fReferenceAttribute: (attributeName: string) => T1,
            fReferenceRepeatingIdAttribute: (repeatingName: string, repeatingId: string, attributeName: string) => T1): T1 {

            require(fReferenceAttribute, "fReferenceAttribute")
            require(fReferenceRepeatingIdAttribute, "fReferenceRepeatingIdAttribute")

            return fReferenceRepeatingIdAttribute(this.repeatingName, this.repeatingId, this.attributeName)
        }

        toReferenceRepeatingId(): ReferenceRepeatingId {
            return referenceRepeatingId(this.repeatingName, this.repeatingId)
        }

        toReferenceRepeatingAttribute(): ReferenceRepeatingAttribute {
            return referenceRepeatingAttribute(this.repeatingName, this.attributeName)
        }

        static eq: Eq<ReferenceRepeatingIdAttribute> = (v1: ReferenceRepeatingIdAttribute, v2: ReferenceRepeatingIdAttribute) => {
            require(v1, "v1")
            require(v2, "v2")

            return v1.repeatingName === v2.repeatingName &&
                v1.repeatingId === v2.repeatingId &&
                v1.attributeName === v2.attributeName
        }

        static ord: Ord<ReferenceRepeatingIdAttribute> = (v1: ReferenceRepeatingIdAttribute, v2: ReferenceRepeatingIdAttribute) => {
            require(v1, "v1")
            require(v2, "v2")

            return ((value) => value === 0 ?
                ((value) => value === -1 ?
                    Ordering.LT :
                    value === 0 ?
                        Ordering.EQ :
                        Ordering.GT)(v1.repeatingId.localeCompare(v2.repeatingId)) :
                value)(ReferenceRepeatingAttribute.ord(v1.toReferenceRepeatingAttribute(), v2.toReferenceRepeatingAttribute()))
        }
    }

    function referenceRepeatingIdAttributeFromString(string: string): ReferenceRepeatingIdAttribute {
        const beforeId = string.lastIndexOf("_", string.lastIndexOf("_") - 1)
        const beforeAttribute = string.lastIndexOf("_")

        return referenceRepeatingIdAttribute(
            string.substring("repeating_".length, beforeId),
            string.substring(beforeId + 1, beforeAttribute),
            string.substring(beforeAttribute + 1))
    }

    export function referenceRepeatingIdAttribute(repeatingName: string, repeatingId: string, attributeName: string): ReferenceRepeatingIdAttribute {
        return new ReferenceRepeatingIdAttribute(repeatingName, repeatingId, attributeName)
    }

    export class ReferenceAct {
        readonly actName: string

        constructor(actName: string) {
            require(actName, "actName")

            this.actName = actName.toLowerCase()
        }

        static eq: Eq<ReferenceAct> = (v1: ReferenceAct, v2: ReferenceAct) => {
            require(v1, "v1")
            require(v2, "v2")

            return v1.actName === v2.actName
        }

        static ord: Ord<ReferenceAct> = (v1: ReferenceAct, v2: ReferenceAct) => {
            require(v1, "v1")
            require(v2, "v2")

            return ((value) => value === -1 ?
                Ordering.LT :
                value === 0 ?
                    Ordering.EQ :
                    Ordering.GT)(v1.actName.localeCompare(v2.actName))
        }
    }

    export function referenceAct(actName: string): ReferenceAct {
        return new ReferenceAct(actName)
    }

    export class EventClick<T1> {
        readonly source: T1

        constructor(source: T1) {
            require(source, "source")

            this.source = source
        }

        withSource<T2>(source: T2): EventClick<T2> {
            require(source, "source")

            return new EventClick(source)
        }
    }

    function eventClickString(reference: ReferenceAct): string {
        return `clicked:${reference.actName}`
    }

    export function onClick(reference: ReferenceAct, callback: (event: EventClick<ReferenceAct>) => void) {
        require(reference, "reference")
        require(callback, "callback")

        on(eventClickString(reference), event => callback(new EventClick(reference)))
    }

    export class EventReorder<T1> {
        readonly source: T1
        readonly sourceType: EventSourceType

        constructor(source: T1, sourceType: EventSourceType) {
            require(source, "source")
            require(sourceType, "sourceType")

            this.source = source
            this.sourceType = sourceType
        }

        withSource<T2>(source: T2): EventReorder<T2> {
            require(source, "source")

            return new EventReorder(source, this.sourceType)
        }
    }

    function eventReorderString(reference: ReferenceRepeating): string {
        return `change:_reporder:${reference.repeatingName}`
    }

    export function onReorder(referenceArray: ReferenceRepeating[], callback: (event: EventReorder<ReferenceRepeating>) => void) {
        require(referenceArray, "referenceArray")
        require(callback, "callback")

        referenceArray.map(reference => on(eventReorderString(reference), event => callback(new EventReorder(reference, event.sourceType))))
    }

    export class EventRemove<T1, T2> {
        readonly source: T1
        readonly sourceType: EventSourceType
        readonly sourceRow: T2

        constructor(source: T1, sourceType: EventSourceType, sourceRow: T2) {
            require(source, "source")
            require(sourceType, "sourceType")
            require(sourceRow, "sourceRow")

            this.source = source
            this.sourceType = sourceType
            this.sourceRow = sourceRow
        }

        withSource<T3>(source: T3): EventRemove<T3, T2> {
            require(source, "source")

            return new EventRemove(source, this.sourceType, this.sourceRow)
        }

        map<T3>(f: (value: T2) => T3): EventRemove<T1, T3> {
            require(f, "f")

            return new EventRemove(
                this.source,
                this.sourceType,
                f(this.sourceRow))
        }
    }

    function eventRemoveString(reference: ReferenceRepeating): string {
        return `remove:repeating_${reference.repeatingName}`
    }

    export function onRemove(referenceArray: ReferenceRepeating[], callback: (event: EventRemove<ReferenceRepeatingId, ValueMap<ReferenceRepeatingIdAttribute>>) => void) {
        require(referenceArray, "referenceArray")
        require(callback, "callback")

        function parseRepeatingId(string: string): string {
            return string.substring(string.lastIndexOf("_") + 1)
        }

        referenceArray.map(reference => on(eventRemoveString(reference), event => callback(
            new EventRemove(
                reference.toReferenceRepeatingId(parseRepeatingId(event.sourceAttribute)),
                event.sourceType,
                ValueMap.fromObject(
                    Object.keys(event.removedInfo).map(key => referenceRepeatingIdAttributeFromString(key)),
                    event.removedInfo)))))
    }

    export class EventChange<T1, T2> {
        readonly source: T1
        readonly sourceType: EventSourceType
        readonly valueOld: T2
        readonly valueNew: T2

        constructor(source: T1, sourceType: EventSourceType, valueOld: T2, valueNew: T2) {
            require(source, "source")
            require(sourceType, "sourceType")

            this.source = source
            this.sourceType = sourceType
            this.valueOld = valueOld
            this.valueNew = valueNew
        }

        withSource<T3>(source: T3): EventChange<T3, T2> {
            require(source, "source")

            return new EventChange(
                source,
                this.sourceType,
                this.valueOld,
                this.valueNew)
        }

        map<T3>(f: (value: T2) => T3): EventChange<T1, T3> {
            require(f, "f")

            return new EventChange(
                this.source,
                this.sourceType,
                f(this.valueOld),
                f(this.valueNew))
        }
    }

    function eventChangeAttribute(event: Event): EventChange<ReferenceAttribute, string> {
        return new EventChange(
            referenceAttribute(event.sourceAttribute),
            event.sourceType,
            event.previousValue,
            event.newValue)
    }

    function eventChangeRepeating(event: Event): EventChange<ReferenceRepeatingIdAttribute, string> {
        return new EventChange(
            referenceRepeatingIdAttributeFromString(event.sourceAttribute),
            event.sourceType,
            event.previousValue,
            event.newValue)
    }

    function eventChangeString(reference: ReferenceSourceChange): string {
        return reference
            .matchSourceChange(
                attributeName => `change:${attributeName}`,
                (repeatingName) => `change:repeating_${repeatingName}`,
                (repeatingName, attributeName) => `change:repeating_${repeatingName}:${attributeName}`,
                (repeatingName, repeatingId, attributeName) => `change:repeating_${repeatingName}:${repeatingId}:${attributeName}`)

    }

    export function onChangeAttribute(referenceArray: ReferenceSourceChangeAttribute[], callback: (event: EventChange<ReferenceAttribute, string>) => void) {
        require(referenceArray, "referenceArray")
        require(callback, "callback")

        on(referenceArray.map(reference => eventChangeString(reference)).join(" "), event => callback(eventChangeAttribute(event)))
    }

    export function onChangeRepeating(referenceArray: ReferenceSourceChangeRepeating[], callback: (event: EventChange<ReferenceRepeatingIdAttribute, string>) => void) {
        require(referenceArray, "referenceArray")
        require(callback, "callback")

        on(referenceArray.map(reference => eventChangeString(reference)).join(" "), event => callback(eventChangeRepeating(event)))
    }

    export class ValueMap<T1 extends ReferenceSourceValue> {
        keys: T1[]
        record: Record<string, string>

        private constructor(keys: T1[], record: Record<string, string>) {
            require(keys, "keys")
            require(record, "record")

            this.keys = keys
            this.record = record
        }

        get(key: T1): Maybe<string> {
            require(key, "key")

            return ((value) => value === undefined ? nothing<string>() : just(value))(this.record[nameString(key)])
        }

        upsert(key: T1, ord: Ord<T1>, value: string): ValueMap<T1> {
            require(key, "key")

            return ValueMap.fromObject(deduplicate(this.keys.concat(key), ord), assign({...this.record}, nameString(key), value))
        }

        plus(valueMap: ValueMap<T1>, ord: Ord<T1>): ValueMap<T1> {
            require(valueMap, "valueMap")
            require(ord, "ord")

            return ValueMap.fromObject(deduplicate(this.keys.concat(valueMap.keys), ord), {...this.record, ...valueMap.record})
        }

        static fromObject<T1 extends ReferenceSourceValue>(keys: T1[], record: Record<string, string>): ValueMap<T1> {
            require(keys, "keys")
            require(record, "record")

            return new ValueMap(keys, keys.reduce((recordInner, key: T1) => assign(recordInner, nameString(key), record[nameString(key)]), {} as Record<string, string>))
        }

        static empty<T1 extends ReferenceSourceValue>() {
            return new ValueMap([] as T1[], {} as Record<string, string>)
        }

        static fromFunction<T1 extends ReferenceSourceValue>(keys: T1[], get: (key: T1) => string): ValueMap<T1> {
            require(keys, "keys")
            require(get, "get")

            return new ValueMap(keys, keys.reduce((record, key: T1) => assign(record, nameString(key), get(key)), {} as Record<string, string>))
        }
    }

    function nameString(reference: ReferenceSourceValue): string {
        return reference
            .matchSourceValue(
                attributeName => attributeName,
                (repeatingName, repeatingId, attributeName) => `repeating_${repeatingName}_${repeatingId}_${attributeName}`)
    }

    export function readValueArray<T1 extends ReferenceSourceValue>(referenceArray: T1[], callback: (valueMap: ValueMap<T1>) => void) {
        require(referenceArray, "referenceArray")
        require(callback, "callback")

        getAttrs(referenceArray.map(reference => nameString(reference)), (object) => callback(ValueMap.fromObject(referenceArray, object)))
    }

    export function writeValueArray(valueMap: ValueMap<ReferenceSourceValue>, callback?: () => void) {
        require(valueMap, "valueMap")

        setAttrs(valueMap.record, undefined, callback)
    }

    export function readReferenceRepeatingIdArray(referenceArray: ReferenceRepeating[], callback: (referenceArray: ReferenceRepeatingId[]) => void) {
        require(referenceArray, "referenceArray")
        require(callback, "callback")

        if (referenceArray.length === 0) {
            callback([])
        } else if (referenceArray.length === 1) {
            readReferenceRepeatingIdArrayHelper(referenceArray[0], callback)
        } else {
            readReferenceRepeatingIdArrayHelper(referenceArray[0], referenceArrayInner1 => readReferenceRepeatingIdArray(referenceArray.slice(1), referenceArrayInner2 => callback(deduplicate(referenceArrayInner1.concat(referenceArrayInner2), ReferenceRepeatingId.ord))))
        }
    }

    function readReferenceRepeatingIdArrayHelper(reference: ReferenceRepeating, callback: (referenceArray: ReferenceRepeatingId[]) => void) {
        getSectionIDs(reference.repeatingName, (repeatingIdArray) => callback(repeatingIdArray.map(repeatingId => referenceRepeatingId(reference.repeatingName, repeatingId))))
    }
}

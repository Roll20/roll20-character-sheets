/// <reference path="./utility.ts"/>
/// <reference path="./roll20.d.ts"/>
/// <reference path="./roll20layer1.ts"/>

namespace Roll20Layer2 {

    import EventChange = Roll20Layer1.EventChange;
    import EventClick = Roll20Layer1.EventClick;
    import ReferenceAct = Roll20Layer1.ReferenceAct;
    import ReferenceAttribute = Roll20Layer1.ReferenceAttribute;
    import ReferenceRepeating = Roll20Layer1.ReferenceRepeating;
    import ReferenceRepeatingAttribute = Roll20Layer1.ReferenceRepeatingAttribute;
    import ReferenceSourceValue = Roll20Layer1.ReferenceSourceValue;
    import ReferenceSourceValueOrd = Roll20Layer1.ReferenceSourceValueOrd;
    import ValueMap = Roll20Layer1.ValueMap;
    import assign = Utility.assign;
    import deduplicate = Utility.deduplicate;
    import onChangeAttribute = Roll20Layer1.onChangeAttribute;
    import onChangeRepeating = Roll20Layer1.onChangeRepeating;
    import onClick = Roll20Layer1.onClick;
    import onRemove = Roll20Layer1.onRemove;
    import readReferenceRepeatingIdArray = Roll20Layer1.readReferenceRepeatingIdArray;
    import readValueArray = Roll20Layer1.readValueArray;
    import referenceAct = Roll20Layer1.referenceAct;
    import referenceAttribute = Roll20Layer1.referenceAttribute;
    import referenceRepeatingAttribute = Roll20Layer1.referenceRepeatingAttribute;
    import require = Utility.require;
    import writeValueArray = Roll20Layer1.writeValueArray;
    import SerializerDeserializer = Utility.SerializerDeserializer;
    import Maybe = Utility.Maybe;
    import nothing = Utility.nothing;
    import just = Utility.just;
    import ReferenceRepeatingIdAttribute = Roll20Layer1.ReferenceRepeatingIdAttribute;
    import stringOrd = Utility.stringOrd;
    import serializerDeserializerInteger = Utility.serializerDeserializerInteger;
    import serializerDeserializerBoolean = Utility.serializerDeserializerBoolean;
    import serializerDeserializerString = Utility.serializerDeserializerString;

    function merge(
        record1Outer: Record<string, string | Record<string, Record<string, string>>>,
        record2Outer: Record<string, string | Record<string, Record<string, string>>>): Record<string, string | Record<string, Record<string, string>>> {

        function from6(union1: undefined | string, union2: undefined | string): undefined | string {
            return union1 === undefined ?
                union2 === undefined ?
                    undefined :
                    union2 :
                union2 === undefined ?
                    union1 :
                    union2
        }

        function from5(record1: Record<string, string>, record2: Record<string, string>): Record<string, string> {
            return deduplicate(Object.keys(record1).concat(Object.keys(record2)), stringOrd).reduce(
                (record, attributeName) => assign(record, attributeName, from6(record1[attributeName], record2[attributeName])),
                {})
        }

        function from4(union1: undefined | Record<string, string>, union2: undefined | Record<string, string>): undefined | Record<string, string> {
            return union1 === undefined ?
                union2 === undefined ?
                    undefined :
                    union2 :
                union2 === undefined ?
                    union1 :
                    from5(union1, union2)
        }

        function from3(union1: Record<string, Record<string, string>>, union2: Record<string, Record<string, string>>): Record<string, Record<string, string>> {
            return deduplicate(Object.keys(union1).concat(Object.keys(union2)), stringOrd).reduce(
                (record, repeatingId) => assign(record, repeatingId, from4(union1[repeatingId], union2[repeatingId])),
                {})
        }

        function from2(union1: string | Record<string, Record<string, string>>, union2: string | Record<string, Record<string, string>>): string | Record<string, Record<string, string>> {
            return typeof union1 === "string" ?
                union2 :
                typeof union2 === "string" ?
                    union2 :
                    from3(union1, union2)
        }

        function from1(union1: undefined | string | Record<string, Record<string, string>>, union2: undefined | string | Record<string, Record<string, string>>): undefined | string | Record<string, Record<string, string>> {
            return union1 === undefined ?
                union2 === undefined ?
                    undefined :
                    union2 :
                union2 === undefined ?
                    union1 :
                    from2(union1, union2)
        }

        return deduplicate(Object.keys(record1Outer).concat(Object.keys(record2Outer)), stringOrd).reduce(
            (record, key) => assign(record, key, from1(record1Outer[key], record2Outer[key])),
            {})
    }

    export class Act {
        readonly reference: ReferenceAct

        constructor(reference: ReferenceAct) {
            require(reference, "reference")

            this.reference = reference
        }

        onClick(callback: (event: EventClick<Act>) => void) {
            require(callback, "callback")

            onClick(this.reference, event => callback(event.withSource(this)))
        }
    }

    export function act(actName: string): Act {
        return new Act(referenceAct(actName))
    }

    export abstract class SourceValue<T1> {
        abstract getReferenceAttributeArray(): ReferenceAttribute[]

        abstract getReferenceRepeatingAttributeArray(): ReferenceRepeatingAttribute[]

        getReferenceRepeating(): ReferenceRepeating[] {
            return deduplicate(
                this.getReferenceRepeatingAttributeArray()
                    .map(reference => reference.toReferenceRepeating()),
                ReferenceRepeating.ord)
        }

        abstract getSerializerDeserializerFromValueMap(): SerializerDeserializer<ValueMap<ReferenceSourceValue>, T1>

        abstract getSerializerDeserializerFromObject(): SerializerDeserializer<Record<string, string | Record<string, Record<string, string>>>, T1>

        readReferenceArray(callback: (referenceArray: ReferenceSourceValue[]) => void) {
            require(callback, "callback")

            const referenceRepeatingArray = deduplicate(
                this.getReferenceRepeatingAttributeArray()
                    .map(referenceRepeatingAttribute => referenceRepeatingAttribute.toReferenceRepeating()),
                ReferenceRepeating.ord)

            readReferenceRepeatingIdArray(
                referenceRepeatingArray,
                referenceRepeatingIdArray =>
                    callback(this.getReferenceAttributeArray().concat(
                        referenceRepeatingIdArray.flatMap(
                            referenceRepeatingId => this.getReferenceRepeatingAttributeArray().flatMap(
                                referenceRepeatingAttribute =>
                                    ReferenceRepeating.eq(referenceRepeatingId.toReferenceRepeating(), referenceRepeatingAttribute.toReferenceRepeating()) ?
                                        [referenceRepeatingAttribute.toReferenceRepeatingIdAttribute(referenceRepeatingId.repeatingId)] :
                                        [])))))
        }

        onChangeMaybe(callback: (event: EventChange<SourceValue<T1>, Maybe<T1>>) => void) {
            require(callback, "callback")

            onChangeAttribute(this.getReferenceAttributeArray(), event =>
                this.readReferenceArray(referenceArray => readValueArray(referenceArray, valueMap =>
                    callback(new EventChange(
                        this,
                        event.sourceType,
                        this.getSerializerDeserializerFromValueMap().deserialize(valueMap.upsert(event.source, ReferenceSourceValueOrd, event.valueOld)),
                        this.getSerializerDeserializerFromValueMap().deserialize(valueMap))))))

            onChangeRepeating(this.getReferenceRepeatingAttributeArray(), event =>
                this.readReferenceArray(referenceArray => readValueArray(referenceArray, valueMap =>
                    callback(new EventChange(
                        this,
                        event.sourceType,
                        this.getSerializerDeserializerFromValueMap().deserialize(valueMap.upsert(event.source, ReferenceSourceValueOrd, event.valueOld)),
                        this.getSerializerDeserializerFromValueMap().deserialize(valueMap))))))

            onRemove(this.getReferenceRepeating(), event =>
                this.readReferenceArray(referenceArray => readValueArray(referenceArray, valueMap =>
                    callback(new EventChange(
                        this,
                        event.sourceType,
                        this.getSerializerDeserializerFromValueMap().deserialize(valueMap.plus(event.sourceRow, ReferenceSourceValueOrd)),
                        this.getSerializerDeserializerFromValueMap().deserialize(valueMap))))))
        }

        onChange(callback: (event: EventChange<SourceValue<T1>, T1 | undefined>) => void) {
            require(callback, "callback")

            this.onChangeMaybe((event: EventChange<SourceValue<T1>, Maybe<T1>>) => callback(event.map(source => source.map<T1 | undefined>(value => value).orValue(undefined))))
        }

        readMaybe(callback: (sourceValue: SourceValue<T1>, value: Maybe<T1>) => void) {
            require(callback, "callback")

            this.readReferenceArray(referenceArray => readValueArray(referenceArray, valueMap => callback(this, this.getSerializerDeserializerFromValueMap().deserialize(valueMap))))
        }

        read(callback: (sourceValue: SourceValue<T1>, value: T1 | undefined) => void) {
            require(callback, "callback")

            this.readMaybe((sourceValue: SourceValue<T1>, value: Maybe<T1>) => callback(sourceValue, value.map<T1 | undefined>(value => value).orValue(undefined)))
        }

        writeMaybe(value: Maybe<T1>, callback?: () => void) {
            require(value, "value")

            writeValueArray(value.bind(value => this.getSerializerDeserializerFromValueMap().serialize(value)).orValue(ValueMap.empty()), callback)
        }

        write(value: T1 | undefined, callback?: () => void) {
            require(value, "value")

            this.writeMaybe(value === undefined ? nothing() : just(value), callback)
        }

        plus<T2>(sourceValue: SourceValue<T2>): SourceValue<Record<string, string | Record<string, Record<string, string>>>> {
            require(sourceValue, "sourceValue")

            return sourceValueSum(this, sourceValue)
        }

        intersects<T2>(sourceValue: SourceValue<T2>): boolean {
            require(sourceValue, "sourceValue")

            return this.getReferenceAttributeArray().some(reference => sourceValue.getReferenceAttributeArray().some(referenceInner => ReferenceAttribute.eq(reference, referenceInner))) ||
                this.getReferenceRepeatingAttributeArray().some(reference => sourceValue.getReferenceRepeatingAttributeArray().some(referenceInner => ReferenceRepeatingAttribute.eq(reference, referenceInner)))
        }
    }


    class SourceValueSum<T2, T3> extends SourceValue<Record<string, string | Record<string, Record<string, string>>>> {
        readonly sourceValue1: SourceValue<T2>
        readonly sourceValue2: SourceValue<T3>

        constructor(sourceValue1: SourceValue<T2>, sourceValue2: SourceValue<T3>) {
            super()

            require(sourceValue1, "sourceValue1")
            require(sourceValue2, "sourceValue2")

            this.sourceValue1 = sourceValue1
            this.sourceValue2 = sourceValue2
        }

        getReferenceAttributeArray(): ReferenceAttribute[] {
            return deduplicate(
                this.sourceValue1.getReferenceAttributeArray().concat(
                    this.sourceValue2.getReferenceAttributeArray()),
                ReferenceAttribute.ord)
        }

        getReferenceRepeatingAttributeArray(): ReferenceRepeatingAttribute[] {
            return deduplicate(
                this.sourceValue1.getReferenceRepeatingAttributeArray().concat(
                    this.sourceValue2.getReferenceRepeatingAttributeArray()),
                ReferenceRepeatingAttribute.ord)
        }

        getSerializerDeserializerFromValueMap(): SerializerDeserializer<ValueMap<ReferenceSourceValue>, Record<string, string | Record<string, Record<string, string>>>> {
            const that = this

            return new class {
                deserialize(valueMap: ValueMap<ReferenceSourceValue>): Maybe<Record<string, string | Record<string, Record<string, string>>>> {
                    require(valueMap, "valueMap")

                    const record1Maybe = that.sourceValue1.getSerializerDeserializerFromValueMap().deserialize(valueMap).bind(value => that.sourceValue1.getSerializerDeserializerFromObject().serialize(value))
                    const record2Maybe = that.sourceValue2.getSerializerDeserializerFromValueMap().deserialize(valueMap).bind(value => that.sourceValue2.getSerializerDeserializerFromObject().serialize(value))

                    return record1Maybe
                        .map(record1 => record2Maybe
                            .map(record2 => merge(record1, record2))
                            .orValue(record1))
                        .orMaybe(record2Maybe)
                }

                serialize(value: Record<string, string | Record<string, Record<string, string>>>): Maybe<ValueMap<ReferenceSourceValue>> {
                    require(value, "value")

                    const valueMap1Maybe = that.sourceValue1.getSerializerDeserializerFromObject().deserialize(value).bind(value => that.sourceValue1.getSerializerDeserializerFromValueMap().serialize(value))
                    const valueMap2Maybe = that.sourceValue2.getSerializerDeserializerFromObject().deserialize(value).bind(value => that.sourceValue2.getSerializerDeserializerFromValueMap().serialize(value))

                    return valueMap1Maybe
                        .map(valueMap1 => valueMap2Maybe
                            .map(valueMap2 => valueMap1.plus(valueMap2, ReferenceSourceValueOrd))
                            .orValue(valueMap1))
                        .orMaybe(valueMap2Maybe)
                }
            }
        }

        getSerializerDeserializerFromObject(): SerializerDeserializer<Record<string, string | Record<string, Record<string, string>>>, Record<string, string | Record<string, Record<string, string>>>> {
            const that = this

            return new class {
                deserialize(value: Record<string, string | Record<string, Record<string, string>>>): Maybe<Record<string, string | Record<string, Record<string, string>>>> {
                    require(value, "value")

                    return just(value)
                }

                serialize(value: Record<string, string | Record<string, Record<string, string>>>): Maybe<Record<string, string | Record<string, Record<string, string>>>> {
                    require(value, "value")

                    return just(value)
                }
            }
        }
    }

    export function sourceValueSum<T2, T3>(sourceValue1: SourceValue<T2>, sourceValue2: SourceValue<T3>): SourceValue<Record<string, string | Record<string, Record<string, string>>>> {
        return new SourceValueSum(sourceValue1, sourceValue2)
    }

    export class Attribute<T1> extends SourceValue<T1> {
        readonly reference: ReferenceAttribute
        readonly serializerDeserializerFromString: SerializerDeserializer<string, T1>
        readonly serializerDeserializerFromValueMap: SerializerDeserializer<ValueMap<ReferenceSourceValue>, T1>
        readonly serializerDeserializerFromObject: SerializerDeserializer<Record<string, string | Record<string, Record<string, string>>>, T1>

        constructor(reference: ReferenceAttribute, serializerDeserializerFromString: SerializerDeserializer<string, T1>) {
            super()

            require(reference, "reference")
            require(serializerDeserializerFromString, "serializerDeserializerFromString")

            this.reference = reference
            this.serializerDeserializerFromString = serializerDeserializerFromString
            this.serializerDeserializerFromValueMap = new class {
                deserialize(valueMap: ValueMap<ReferenceSourceValue>): Maybe<T1> {
                    require(valueMap, "valueMap")

                    return valueMap.get(reference)
                        .bind(value => serializerDeserializerFromString.deserialize(value))
                }

                serialize(value: T1): Maybe<ValueMap<ReferenceSourceValue>> {
                    require(value, "value")

                    return serializerDeserializerFromString.serialize(value)
                        .map(value => ValueMap.empty().upsert(reference, ReferenceSourceValueOrd, value))
                }
            }

            this.serializerDeserializerFromObject = new class {
                deserialize(value: Record<string, string | Record<string, Record<string, string>>>): Maybe<T1> {
                    require(value, "value")

                    function forRecord(recordOuter: Record<string, Record<string, string>>): Maybe<T1> {
                        return nothing()
                    }

                    function forString(string: string): Maybe<T1> {
                        return serializerDeserializerFromString.deserialize(string)
                    }

                    function forUnion(union: undefined | string | Record<string, Record<string, string>>): Maybe<T1> {
                        return union === undefined ?
                            nothing() :
                            typeof union === "string" ?
                                forString(union) :
                                forRecord(union)
                    }

                    return forUnion(value[reference.attributeName])
                }

                serialize(value: T1): Maybe<Record<string, string | Record<string, Record<string, string>>>> {
                    require(value, "value")

                    return serializerDeserializerFromString.serialize(value)
                        .map(value => assign({}, reference.attributeName, value))
                }
            }
        }

        getReferenceAttributeArray(): ReferenceAttribute[] {
            return [this.reference]
        }

        getReferenceRepeatingAttributeArray(): ReferenceRepeatingAttribute[] {
            return []
        }

        getSerializerDeserializerFromValueMap(): SerializerDeserializer<ValueMap<ReferenceSourceValue>, T1> {
            return this.serializerDeserializerFromValueMap
        }

        getSerializerDeserializerFromObject(): SerializerDeserializer<Record<string, string | Record<string, Record<string, string>>>, T1> {
            return this.serializerDeserializerFromObject
        }
    }

    export function attribute<T1>(attributeName: string, serializerDeserializer: SerializerDeserializer<string, T1>): Attribute<T1> {
        return new Attribute(referenceAttribute(attributeName), serializerDeserializer)
    }

    export function attributeInteger(attributeName: string,): Attribute<number> {
        return new Attribute(referenceAttribute(attributeName), serializerDeserializerInteger)
    }

    export function attributeString(attributeName: string): Attribute<string> {
        return new Attribute(referenceAttribute(attributeName), serializerDeserializerString)
    }

    export function attributeBoolean(attributeName: string): Attribute<boolean> {
        return new Attribute(referenceAttribute(attributeName), serializerDeserializerBoolean)
    }

    export class RepeatingAttribute<T1> extends SourceValue<Record<string, T1>> {
        readonly reference: ReferenceRepeatingAttribute
        readonly serializerDeserializerFromString: SerializerDeserializer<string, T1>
        readonly serializerDeserializerFromValueMap: SerializerDeserializer<ValueMap<ReferenceSourceValue>, Record<string, T1>>
        readonly serializerDeserializerFromObject: SerializerDeserializer<Record<string, string | Record<string, Record<string, string>>>, Record<string, T1>>

        constructor(reference: ReferenceRepeatingAttribute, serializerDeserializerFromString: SerializerDeserializer<string, T1>) {
            super()

            require(reference, "reference")
            require(serializerDeserializerFromString, "serializerDeserializerFromString")

            this.reference = reference
            this.serializerDeserializerFromString = serializerDeserializerFromString
            this.serializerDeserializerFromValueMap = new class {
                deserialize(valueMap: ValueMap<ReferenceSourceValue>): Maybe<Record<string, T1>> {
                    require(valueMap, "valueMap")

                    return just(valueMap.keys.reduce((record, referenceSourceValue) => referenceSourceValue.matchSourceValue(
                        (attributeName: string) => record,
                        (repeatingName: string, repeatingId: string, attributeName: string) =>
                            ReferenceRepeatingAttribute.eq(reference, referenceRepeatingAttribute(repeatingName, attributeName)) ?
                                valueMap.get(reference.toReferenceRepeatingIdAttribute(repeatingId))
                                    .bind(value => serializerDeserializerFromString.deserialize(value).map(value => assign(record, repeatingId, value)))
                                    .orValue(record) :
                                record),
                        {}))
                }

                serialize(value: Record<string, T1>): Maybe<ValueMap<ReferenceSourceValue>> {
                    require(value, "value")

                    return just(Object.keys(value)
                        .reduce(
                            (valueMap, repeatingId) => serializerDeserializerFromString.serialize(value[repeatingId])
                                .map(value => valueMap.upsert(reference.toReferenceRepeatingIdAttribute(repeatingId), ReferenceRepeatingIdAttribute.ord, value))
                                .orValue(valueMap),
                            ValueMap.empty<ReferenceRepeatingIdAttribute>()))
                }
            }

            this.serializerDeserializerFromObject = new class {
                deserialize(value: Record<string, string | Record<string, Record<string, string>>>): Maybe<Record<string, T1>> {
                    require(value, "value")

                    function forRecord(recordOuter: Record<string, Record<string, string>>): Maybe<Record<string, T1>> {
                        return just(Object.keys(recordOuter)
                            .reduce(
                                (record, repeatingId) => recordOuter[repeatingId][reference.attributeName] === undefined ?
                                    record :
                                    serializerDeserializerFromString.deserialize(recordOuter[repeatingId][reference.attributeName])
                                        .map(value => assign(record, repeatingId, value))
                                        .orValue(record),
                                {} as Record<string, T1>))
                    }

                    function forString(string: string): Maybe<Record<string, T1>> {
                        return nothing()
                    }

                    function forUnion(union: undefined | string | Record<string, Record<string, string>>): Maybe<Record<string, T1>> {
                        return union === undefined ?
                            nothing() :
                            typeof union === "string" ?
                                forString(union) :
                                forRecord(union)
                    }

                    return forUnion(value[reference.repeatingName])
                }

                serialize(value: Record<string, T1>): Maybe<Record<string, string | Record<string, Record<string, string>>>> {
                    require(value, "value")

                    return just(assign({}, reference.repeatingName, Object.keys(value).reduce(
                        (record, repeatingId) => assign(record, repeatingId, assign({}, reference.attributeName, value[repeatingId])),
                        {})))
                }
            }
        }

        getReferenceAttributeArray(): ReferenceAttribute[] {
            return []
        }

        getReferenceRepeatingAttributeArray(): ReferenceRepeatingAttribute[] {
            return [this.reference]
        }

        getSerializerDeserializerFromValueMap(): SerializerDeserializer<ValueMap<ReferenceSourceValue>, Record<string, T1>> {
            return this.serializerDeserializerFromValueMap
        }

        getSerializerDeserializerFromObject(): SerializerDeserializer<Record<string, string | Record<string, Record<string, string>>>, Record<string, T1>> {
            return this.serializerDeserializerFromObject
        }
    }

    export function repeatingAttribute<T1>(repeatingName: string, attributeName: string, serializerDeserializer: SerializerDeserializer<string, T1>): RepeatingAttribute<T1> {
        return new RepeatingAttribute(referenceRepeatingAttribute(repeatingName, attributeName), serializerDeserializer)
    }

    export function repeatingAttributeInteger(repeatingName: string, attributeName: string,): RepeatingAttribute<number> {
        return new RepeatingAttribute(referenceRepeatingAttribute(repeatingName, attributeName), serializerDeserializerInteger)
    }

    export function repeatingAttributeString(repeatingName: string, attributeName: string): RepeatingAttribute<string> {
        return new RepeatingAttribute(referenceRepeatingAttribute(repeatingName, attributeName), serializerDeserializerString)
    }

    export function repeatingAttributeBoolean(repeatingName: string, attributeName: string): RepeatingAttribute<boolean> {
        return new RepeatingAttribute(referenceRepeatingAttribute(repeatingName, attributeName), serializerDeserializerBoolean)
    }

    export class Sheet<T1, T2> {
        sourceValueReadonly: Maybe<SourceValue<T1>>
        sourceValue: Maybe<SourceValue<T2>>
        valueReadonly: Maybe<T1>
        value: Maybe<T2>

        constructor(sourceValueReadonly: Maybe<SourceValue<T1>>, valueReadonly: Maybe<T1>, sourceValue: Maybe<SourceValue<T2>>, value: Maybe<T2>) {
            require(sourceValueReadonly, "sourceValueReadonly")
            require(valueReadonly, "valueReadonly")
            require(sourceValue, "sourceValue")
            require(value, "value")

            this.sourceValue = sourceValue
            this.value = value
            this.sourceValueReadonly = sourceValueReadonly
            this.valueReadonly = valueReadonly
        }

        set<T3>(sourceValue: SourceValue<T3>, value: Maybe<T3>): Maybe<Sheet<T1, T3 | Record<string, string | Record<string, Record<string, string>>>>> {
            require(sourceValue, "sourceValue")
            require(value, "value")

            return this.sourceValueReadonly.map(sourceValueReadonlyInner => sourceValueReadonlyInner.intersects(sourceValue)).orValue(false) ?
                nothing() :
                just(this.sourceValue
                    .map<Sheet<T1, T3 | Record<string, string | Record<string, Record<string, string>>>>>(sourceValueInner => {

                        const recordOld = this.value.bind(valueInner => sourceValueInner.getSerializerDeserializerFromObject().serialize(valueInner))
                        const recordNew = value.bind(valueInner => sourceValue.getSerializerDeserializerFromObject().serialize(valueInner))
                        const recordMerge = recordOld
                            .map(recordOldInner => recordNew
                                .map(recordNewInner => merge(recordOldInner, recordNewInner))
                                .orValue(recordOldInner))
                            .orMaybe(recordNew)

                        sourceValueSum(sourceValueInner, sourceValue)

                        return new Sheet(
                            this.sourceValueReadonly,
                            this.valueReadonly,
                            just(sourceValueSum(sourceValueInner, sourceValue)),
                            recordMerge)
                    })
                    .orValue(
                        new Sheet(
                            this.sourceValueReadonly,
                            this.valueReadonly,
                            just(sourceValue),
                            value)))
        }

        get<T3>(sourceValue: SourceValue<T3>): Maybe<T3> {
            require(sourceValue, "sourceValue")

            const recordReadonly = this.sourceValueReadonly.bind(sourceValueReadonlyInner => this.valueReadonly.bind(valueReadonlyInner => sourceValueReadonlyInner.getSerializerDeserializerFromObject().serialize(valueReadonlyInner)))
            const record = this.sourceValue.bind(sourceValueInner => this.value.bind(valueInner => sourceValueInner.getSerializerDeserializerFromObject().serialize(valueInner)))
            const recordMerge = recordReadonly
                .map(recordReadonlyInner => record
                    .map(recordInner => merge(recordReadonlyInner, recordInner))
                    .orValue(recordReadonlyInner))
                .orMaybe(record)

            return recordMerge.bind(recordMergeInner => sourceValue.getSerializerDeserializerFromObject().deserialize(recordMergeInner))
        }

        write(callback?: () => void) {
            this.sourceValue.map(sourceValue => sourceValue.writeMaybe(this.value, callback))
        }
    }

    export function sheetReadonly<T1, T2>(sourceValueReadonly: SourceValue<T1>, valueReadonly: Maybe<T1>): Sheet<T1, T2> {
        return new Sheet(just(sourceValueReadonly), valueReadonly, nothing(), nothing())
    }

    export function sheet<T1, T2>(sourceValue: SourceValue<T2>, value: Maybe<T2>): Sheet<T1, T2> {
        return new Sheet(nothing(), nothing(), just(sourceValue), value)
    }
}

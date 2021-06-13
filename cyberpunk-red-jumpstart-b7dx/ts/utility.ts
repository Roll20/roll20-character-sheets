namespace Utility {

    export function require<T1>(value: T1, message: string): T1 {
        if (value === undefined || value === null) {
            throw new Error(message)
        } else {
            return value
        }
    }

    export type Eq<T1> = (v1: T1, v2: T1) => boolean

    export enum Ordering {
        LT = -1,
        GT = 1,
        EQ = 0
    }

    export type Ord<T1> = (v1: T1, v2: T1) => Ordering

    export function stringOrd(v1: string, v2: string): Ordering {
        require(v1, "v1")
        require(v2, "v2")

        return v1.localeCompare(v2)
    }

    export abstract class Maybe<T1> {
        abstract match<T2>(
            fNothing: () => T2,
            fJust: (value: T1) => T2): T2

        static Eq<T1>(eq: Eq<T1>): (v1: Maybe<T1>, v2: Maybe<T1>) => boolean {
            require(eq, "eq")

            return (v1, v2) => {
                require(v1, "v1")
                require(v2, "v2")

                return v1.match(
                    () => v2.match(
                        () => true,
                        valueInner => false),
                    value => v2.match(
                        () => false,
                        valueInner => eq(value, valueInner)))
            }
        }

        map<T2>(f: (value: T1) => T2): Maybe<T2> {
            require(f, "f")

            return this.match(
                () => nothing(),
                value => just(f(value)))
        }

        bind<T2>(f: (value: T1) => Maybe<T2>): Maybe<T2> {
            require(f, "f")

            return this.match(
                () => nothing(),
                value => f(value))
        }

        orValue(value: T1) {
            return this.match(
                () => value,
                value => value)
        }

        orMaybe(maybe: Maybe<T1>) {
            require(maybe, "maybe")

            return this.match(
                () => maybe,
                value => just(value))
        }

        sequenceRight<T2>(f: (maybe: Maybe<T1>) => Maybe<T2>): Maybe<T2> {
            return f(this)
        }

        sequenceLeft<T2>(f: (maybe: Maybe<T1>) => Maybe<T2>): Maybe<T1> {
            f(this)
            return this
        }
    }

    export class Nothing<T1> extends Maybe<T1> {
        match<T2>(
            fNothing: () => T2,
            fJust: (value: T1) => T2): T2 {

            require(fNothing, "fNothing")
            require(fJust, "fJust")

            return fNothing()
        }
    }

    export function nothing<T1>(): Maybe<T1> {
        return new Nothing<T1>()
    }

    export class Just<T1> extends Maybe<T1> {
        readonly value: T1

        constructor(value: T1) {
            super()
            this.value = value
        }

        match<T2>(
            fNothing: () => T2,
            fJust: (value: T1) => T2): T2 {

            require(fNothing, "fNothing")
            require(fJust, "fJust")

            return fJust(this.value)
        }
    }

    export function just<T1>(value: T1): Maybe<T1> {
        return new Just(value)
    }

    export function deduplicate<T1>(arrayOuter: T1[], ord: Ord<T1>): T1[] {
        require(arrayOuter, "arrayOuter")
        require(ord, "ord")

        return arrayOuter
            .sort(ord)
            .reduce((array: T1[], element: T1) => {
                return array.length === 0 || ord(array[array.length - 1], element) !== Ordering.EQ ?
                    array.concat(element) :
                    array
            }, []);
    }

    export function assign<K extends string | number | symbol, V>(record: Record<K, V>, key: K, value: V): Record<K, V> {
        require(record, "record")
        require(key, "key")

        record[key] = value
        return record
    }

    export interface SerializerDeserializer<S1, D1> {
        deserialize(value: S1): Maybe<D1>

        serialize(value: D1): Maybe<S1>
    }

    export function serializerDeserializer<S1, D1>(serialize: (value: D1) => Maybe<S1>, deserialize: (value: S1) => Maybe<D1>): SerializerDeserializer<S1, D1> {
        require(serialize, "serialize")
        require(deserialize, "deserialize")

        return new class {
            deserialize(value: S1): Maybe<D1> {
                return deserialize(value)
            }

            serialize(value: D1): Maybe<S1> {
                return serialize(value)
            }
        }
    }

    export const serializerDeserializerInteger = serializerDeserializer<string, number>(
        (number: number) => just(number.toString()),
        (string: string) => isNaN(parseInt(string)) ? nothing() : just(parseInt(string)))

    export const serializerDeserializerString = serializerDeserializer<string, string>(
        (string: string) => just(string),
        (string: string) => just(string))

    export const serializerDeserializerBoolean = serializerDeserializer<string, boolean>(
        (boolean: boolean) => just(boolean.toString()),
        (string: string) => string === "true" ? just(true) : string === "false" ? just(false) : nothing())
}
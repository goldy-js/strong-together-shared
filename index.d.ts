declare global {
  interface Array<T> {
    /**
     * inspired by ruby .to_h
     * @example
     * [["key", "value"]]._toH() -> { key: "value" }
     */
    _toH(): object

    /** returns the last element of the array */
    _last: any
  }
}

declare global {
  interface Number {
    /**
     * @examples
     * 5110._prettify() -> 5.1k
     * 5110._prettify(2) -> 5.10k
     * 1000000._prettify() -> 1m
     */
    _prettify(digits?: number): string
  }
}
declare global {
  interface Object {
    /**
     * obj._stringify() === JSON.stringify(obj, null, 2)
     */
    _stringify({ spacing } = { spacing: number }): string

    /**
     * const obj = { a: 1, b: undefined, c: null }
     * obj._compact() -> { a: 1 }
     */
    _compact(): string
  }
}

declare global {
  interface String {
    /**
     * someVar._parse() == JSON.parse(someVar)
     */
    _parse(): any

    /**
     * someVar._stringify() == JSON.stringify(someVar)
     *
     * For compatibility with the extended {@link Object._stringify},
     * so we could safetly call
     * maybeAStringVar._stringify()
     */
    _stringify(): this
  }
}

export default {}

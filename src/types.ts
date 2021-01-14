export interface Data {
    [key: string]: any
}

export interface Query {
    (strings: readonly string[]): string
}

export default interface Fter {
    /**
     * @version 1.0.0-beta.1
     * filter object by query
     * @example
     * const query = fter({ search: 'hello', limit: 10, sort: 'name' })
     * const path = query`
     *  search
     *  limit?10
     *  sort
     *  order=asc
     *  page?
     * `
     * console.log(path) // /?search=hello&sort=name&order=asc
     */
    (props: Data): Query
    /**
     * Parse object to query path
     */
    parse: (props: Data) => string
}

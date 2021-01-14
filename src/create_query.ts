import parse from './parse'
import { Data, Query } from './types'
import { parseString } from './utils'

export default function create_query(into: Data): Query {
    function query(strings: readonly string[]): string {
        let patterns: string[] = []

        for (const str of strings) {
            patterns = str.split(/\s/g).filter((key) => key)
        }

        const response: Record<string, any> = {}

        for (const pattern of patterns) {
            const is_optional = pattern.includes('?')
            const has_default = pattern.includes('=')
            const [key, value] = pattern.split(has_default ? '=' : '?')

            if (key in into && !is_optional) {
                if (into[key] === null) {
                    response[key] = ''
                } else {
                    response[key] = into[key]
                }
            }

            if (!(key in into) && !is_optional) {
                response[key] = 'undefined'
            }

            if (key in into && is_optional && parseString(into[key]) !== value) {
                if (into[key] !== null) {
                    response[key] = into[key]
                }
            }

            if (into[key] === undefined && has_default) {
                response[key] = value || ''
            }
        }

        return parse(response)
    }

    return query
}

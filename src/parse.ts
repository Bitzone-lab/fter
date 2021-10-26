import { Data } from './types'

/**
 * Parse object to query path
 */
export default function parse(props: Data, path: string = ''): string {
    let url = ''
    for (const key in props) {
        const value = props[key]
        if (Array.isArray(value)) {
            url += `${key}=${value.join(',')}&`
        } else {
            url += `${key}=${value}&`
        }
    }

    if (url === '') return ''
    return `${path}?${url.slice(0, -1)}`
}

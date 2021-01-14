import { Data } from './types'

export default function parse(props: Data): string {
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
    return `/?${url.slice(0, -1)}`
}

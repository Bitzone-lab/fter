export function parseString(value: any): string {
    if (typeof value === 'string') return value
    if (typeof value === 'number') return value.toString()
    if (Array.isArray(value)) return value.join(',')
    return JSON.stringify(value)
}

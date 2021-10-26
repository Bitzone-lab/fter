/**
 * Merge params for one path
 */
export default function merge(fullPath: string, params: string) {
    const hasSlashSign = () => params.search(/\/\?/) > -1

    const indicators = hasSlashSign() ? '/?' : '?'

    const currentParams = params.split(indicators)

    const charJoin = fullPath.search(/\?/) > -1 ? '&' : '?'

    const nextParams = currentParams[1] || currentParams[0]

    return `${fullPath.trim()}${nextParams ? charJoin : ''}${nextParams}`.trim()
}

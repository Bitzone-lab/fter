import parse from './parse'
import create_query from './create_query'
import Fter, { Data, Query } from './types'

function fter(props: Data): Query {
    return create_query(props)
}

fter.parse = parse

export { parse }
export default ((): Fter => fter)()

import parse from './parse'
import merge from './merge'
import create_query from './create_query'
import Fter, { Data, Query } from './types'

const fter: Fter = (props: Data): Query => {
    return create_query(props)
}

fter.parse = parse
fter.merge = merge

export { parse, merge }
export default fter

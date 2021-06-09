import fter from '../src'

describe('query', function () {
    it('prop', function () {
        const query = fter({ search: '' })
        const params = query`
            search
        `
        expect(params).toBe('?search=')
    })

    it('optional', function () {
        const query = fter({ search: 'hello' })
        const params = query`
            search
            limit?
        `
        expect(params).toBe('?search=hello')

        const params2 = fter({ search: '' })`
            search?
            limit?
        `
        expect(params2).toBe('')
    })

    it('optional for value', function () {
        const query = fter({ search: 'hello', limit: 10 })
        const params = query`
            search
            limit?10
        `

        expect(params).toBe('?search=hello')

        const params2 = query`
            search
            limit?5
        `
        expect(params2).toBe('?search=hello&limit=10')
    })

    it('default value', function () {
        const query = fter({ search: 'hello', limit: 10 })
        const params = query`
            search
            limit?10
            order=asc
        `

        expect(params).toBe('?search=hello&order=asc')
    })

    it('default value and recieved prop', function () {
        const query = fter({ search: 'hello', limit: 10, order: 'desc' })
        const params = query`
            search
            limit?10
            order=asc
        `

        expect(params).toBe('?search=hello&order=desc')
    })

    it('default value empty paramsing', function () {
        const query = fter({ order: 'desc' })
        const params = query`
            search=
            order=asc
        `

        expect(params).toBe('?search=&order=desc')
    })

    it('optional prop empty paramsing', function () {
        const query = fter({ search: '' })
        const params = query`
            search?
        `

        expect(params).toBe('')

        const query2 = fter({ search: 'hello' })
        const params2 = query2`
            search?
        `

        expect(params2).toBe('?search=hello')
    })

    it('required prop', function () {
        const query = fter({ search: '' })
        const params = query`
            search
            limit
        `

        expect(params).toBe('?search=&limit=undefined')
    })

    it('value null', function () {
        const query = fter({ search: 'hello', users: null })
        const params = query`
            search
            users
        `

        expect(params).toBe('?search=hello&users=')
    })

    it('optional value null', function () {
        const query = fter({ search: 'hello', count: null })
        const params = query`
            search
            count?null
        `

        expect(params).toBe('?search=hello')

        const query2 = fter({ search: 'hello', count: null })
        const params2 = query2`
            search?
            count?
        `

        expect(params2).toBe('?search=hello')
    })

    it('default value null', function () {
        const query = fter({ search: 'hello', count: 5 })
        const params = query`
            search
            count=null
        `

        expect(params).toBe('?search=hello&count=5')

        const query2 = fter({ search: 'hello' })
        const params2 = query2`
            search
            count=null
        `

        expect(params2).toBe('?search=hello&count=null')

        const params3 = fter({ search: null })`
            search=hello
        `
        expect(params3).toBe('?search=')

        const params4 = fter({ search: null })`
            search=
        `
        expect(params4).toBe('?search=')
    })

    it('array', function () {
        const query = fter({ limit: 10, users: [] })
        const params = query`
            limit
            users
        `

        expect(params).toBe('?limit=10&users=')

        const query2 = fter({ limit: 10, users: [1, 5] })
        const params2 = query2`
            limit
            users
        `

        expect(params2).toBe('?limit=10&users=1,5')
    })

    it('array optional', function () {
        const query = fter({ limit: 10, users: [] })
        const params = query`
            limit
            users?
        `

        expect(params).toBe('?limit=10')

        const query2 = fter({ limit: 10, users: [1, 2] })
        const params2 = query2`
            limit
            users?1,2
        `

        expect(params2).toBe('?limit=10')

        const query3 = fter({ limit: 10, users: [1, 2, 3, 'name'] })
        const params3 = query3`
            limit
            users?1,2
        `

        expect(params3).toBe('?limit=10&users=1,2,3,name')
    })

    it('default value array', function () {
        const query = fter({ limit: 10 })
        const params = query`
            limit
            users=1,2
        `

        expect(params).toBe('?limit=10&users=1,2')
    })

    it('boolean', function () {
        const query = fter({ active: false, deleted: true })
        const params = query`
            active
            deleted
        `

        expect(params).toBe(`?active=false&deleted=true`)

        const query2 = fter({ active: false, deleted: true })
        const params2 = query2`
            active?
            deleted?
        `

        expect(params2).toBe(`?active=false&deleted=true`)

        const query3 = fter({ active: true, deleted: false })
        const params3 = query3`
            active?
            deleted
        `

        expect(params3).toBe(`?active=true&deleted=false`)
    })
})

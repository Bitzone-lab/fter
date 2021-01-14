import fter from '../src'

describe('query', function () {
    it('prop', function () {
        const query = fter({ search: '' })
        const str = query`
            search
        `
        expect(str).toBe('/?search=')
    })

    it('optional', function () {
        const query = fter({ search: 'hello' })
        const str = query`
            search
            limit?
        `
        expect(str).toBe('/?search=hello')

        const str2 = fter({ search: '' })`
            search?
            limit?
        `
        expect(str2).toBe('')
    })

    it('optional for value', function () {
        const query = fter({ search: 'hello', limit: 10 })
        const str = query`
            search
            limit?10
        `

        expect(str).toBe('/?search=hello')

        const str2 = query`
            search
            limit?5
        `
        expect(str2).toBe('/?search=hello&limit=10')
    })

    it('default value', function () {
        const query = fter({ search: 'hello', limit: 10 })
        const str = query`
            search
            limit?10
            order=asc
        `

        expect(str).toBe('/?search=hello&order=asc')
    })

    it('default value and recieved prop', function () {
        const query = fter({ search: 'hello', limit: 10, order: 'desc' })
        const str = query`
            search
            limit?10
            order=asc
        `

        expect(str).toBe('/?search=hello&order=desc')
    })

    it('default value empty string', function () {
        const query = fter({ order: 'desc' })
        const str = query`
            search=
            order=asc
        `

        expect(str).toBe('/?search=&order=desc')
    })

    it('optional prop empty string', function () {
        const query = fter({ search: '' })
        const str = query`
            search?
        `

        expect(str).toBe('')

        const query2 = fter({ search: 'hello' })
        const str2 = query2`
            search?
        `

        expect(str2).toBe('/?search=hello')
    })

    it('required prop', function () {
        const query = fter({ search: '' })
        const str = query`
            search
            limit
        `

        expect(str).toBe('/?search=&limit=undefined')
    })

    it('value null', function () {
        const query = fter({ search: 'hello', users: null })
        const str = query`
            search
            users
        `

        expect(str).toBe('/?search=hello&users=')
    })

    it('optional value null', function () {
        const query = fter({ search: 'hello', count: null })
        const str = query`
            search
            count?null
        `

        expect(str).toBe('/?search=hello')

        const query2 = fter({ search: 'hello', count: null })
        const str2 = query2`
            search?
            count?
        `

        expect(str2).toBe('/?search=hello')
    })

    it('default value null', function () {
        const query = fter({ search: 'hello', count: 5 })
        const str = query`
            search
            count=null
        `

        expect(str).toBe('/?search=hello&count=5')

        const query2 = fter({ search: 'hello' })
        const str2 = query2`
            search
            count=null
        `

        expect(str2).toBe('/?search=hello&count=null')

        const str3 = fter({ search: null })`
            search=hello
        `
        expect(str3).toBe('/?search=')

        const str4 = fter({ search: null })`
            search=
        `
        expect(str4).toBe('/?search=')
    })

    it('array', function () {
        const query = fter({ limit: 10, users: [] })
        const str = query`
            limit
            users
        `

        expect(str).toBe('/?limit=10&users=')

        const query2 = fter({ limit: 10, users: [1, 5] })
        const str2 = query2`
            limit
            users
        `

        expect(str2).toBe('/?limit=10&users=1,5')
    })

    it('array optional', function () {
        const query = fter({ limit: 10, users: [] })
        const str = query`
            limit
            users?
        `

        expect(str).toBe('/?limit=10')

        const query2 = fter({ limit: 10, users: [1, 2] })
        const str2 = query2`
            limit
            users?1,2
        `

        expect(str2).toBe('/?limit=10')

        const query3 = fter({ limit: 10, users: [1, 2, 3, 'name'] })
        const str3 = query3`
            limit
            users?1,2
        `

        expect(str3).toBe('/?limit=10&users=1,2,3,name')
    })

    it('default value array', function () {
        const query = fter({ limit: 10 })
        const str = query`
            limit
            users=1,2
        `

        expect(str).toBe('/?limit=10&users=1,2')
    })
})

import fter from '../src'

describe('fter.parse', function () {
    it('empty object', function () {
        const string = fter.parse({})
        expect(string).toBe('')
    })

    it('one prop', function () {
        const string = fter.parse({ search: 'hello' })
        expect(string).toBe('?search=hello')
    })

    it('some props', function () {
        const string = fter.parse({ search: 'hello', limit: 12 })
        expect(string).toBe('?search=hello&limit=12')
    })

    it('array props', function () {
        const string = fter.parse({ ids: [1, 5, '7'], fruits: ['banana', 'apple'] })
        expect(string).toBe('?ids=1,5,7&fruits=banana,apple')
    })

    it('all props', function () {
        const string = fter.parse({
            ids: [1, 5, '7'],
            search: 'hello',
            fruits: ['banana', 'apple'],
            limit: 12
        })
        expect(string).toBe('?ids=1,5,7&search=hello&fruits=banana,apple&limit=12')
    })

    it('with patch', function () {
        const string = fter.parse({ search: 'hello', limit: 12 }, '/brands')
        expect(string).toBe('/brands?search=hello&limit=12')
    })
})

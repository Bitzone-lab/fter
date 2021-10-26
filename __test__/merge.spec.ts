import fter from '../src'

describe('Merge', () => {
    it('simple path', function () {
        const result = fter.merge('localhost', '?search=hi')
        expect(result).toBe('localhost?search=hi')
    })

    it('full path', function () {
        const result = fter.merge('http://localhost:8000/users?limit=10', '?search=hi&order=')
        expect(result).toBe('http://localhost:8000/users?limit=10&search=hi&order=')

        const result2 = fter.merge('http://localhost:8000/users/?limit=10', '?search=hi&order=')
        expect(result2).toBe('http://localhost:8000/users/?limit=10&search=hi&order=')
    })

    it('merge paths', function () {
        const result = fter.merge(
            'http://localhost:8000/users?limit=10',
            'https://my_page?search=hi&order=asc'
        )
        expect(result).toBe('http://localhost:8000/users?limit=10&search=hi&order=asc')
    })

    it('clean params', function () {
        const result = fter.merge('http://localhost', '')
        expect(result).toBe('http://localhost')
    })

    it('set params', function () {
        const result = fter.merge('http://localhost', 'name=jim')
        expect(result).toBe('http://localhost?name=jim')

        const result2 = fter.merge('http://localhost', '?name=jim')
        expect(result2).toBe('http://localhost?name=jim')

        const result3 = fter.merge('http://localhost', '/?name=jim')
        expect(result3).toBe('http://localhost?name=jim')

        const result4 = fter.merge('http://localhost/', '/?name=jim')
        expect(result4).toBe('http://localhost/?name=jim')
    })
})

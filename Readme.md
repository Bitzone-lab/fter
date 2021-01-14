Fter
=========

> Management query string for request

```
npm install fter
```
```js
import fter from 'fter'
```

## Started

```js
// Properties
const filter = {
    search: 'hello',
    limit: 10,
    sort: 'name',
    ids: [1, 5]
}
// queries
fter(filter)`
    search
    limit?10
    sort
    order=asc
    page?
    ids
`
```
> query path:
> `/?search=&sort=name&order=asc&ids=1,5`

## Symbols

* `?` **OPTIONAL**, use when ownership is not required.
* `=` **DEFAULT**, use when you want to generate a default value.

### Optional (?)
It is a non-mandatory property. It can also be optional when a value is specified.
```js
fter({ search: 'hello' })`
    search
    limit?
`
```
> `/?search=hello`
```js
fter({ search: 'hello', limit: 10 })`
    search
    limit?10
`
```
> `/?search=hello`
```js
fter({ search: 'hello', limit: 15 })`
    search
    limit?10
`
```
> `/?search=hello&limit=15`
```js
fter({ ids: [1, 2] }, limit: 10 )`
    ids?1,2
    limit
`
```
> `/?limit=10`
```js
fter({ ids: [1, 2, 3] }, limit: 10 )`
    ids?1,2
    limit
`
```
> `/?ids=1,2,3&limit=10`

### Default (=)

Is when a default value is needed when it is not received from the property.
```js
fter({ limit: 15 })`
    search=bye
    limit
`
```
> `/?search=bye&limit=15`
```js
fter({ search: 'hello', limit: 15 })`
    search=bye
    limit
`
```
> `/?search=hello&limit=15`
```js
fter({ limit: 15 })`
    search=
    limit
`
```
> `/?search=&limit=15`

```js
fter({ limit: 10 }`
    ids=1,2
    limit
`
```
> `/?ids=1,2&limit=10`

```js
fter({ limit: 10 }`
    ids=1,2
    limit
`
```
> `/?ids=1,2&limit=10`

## Required

If no symbol is received, it will be required.
```js
fter({ search: 'hello' })`
    search
    limit
`
```
> `/?search=hello&limit=undefined`

## Null

When it is required.
```js
fter({ search: null })`
    search
`
```
> `/?search=`

When it's optional.
```js
fter({ search: 'hello', count: null })`
    search
    count?
`
```
> `/?search=hello`

When it has a default value
```js
fter({ search: 'hello', count: null })`
    search
    count=2
`
```
> `/?search=hello&count=`

```js
fter({ search: 'hello' })`
    search
    count=null
`
```
> `/?search=hello&count=null`

## Parse

```js
import { parse } from 'fter'
```
```js
import fter from 'fter'
fter.parse({
    name: 'Juan'
})
```
> `/?name=Juan`

Convert an object to link parameters

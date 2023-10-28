
const o = {
  inner1: {
    inner2: 'foo' as const
  }
}

type Lense<T extends {}, L extends (keyof T|keyof T[])> = 
| L extends keyof T ? T[L]
: L extends [keyof T] ? T[L[0]]
: never

function lense <T extends {}, L extends (keyof T | [keyof T])>(config:{
  lense: L
  data: T
  map: (pick:Lense<T, L>) => any
}) {

}

lense({
  data: o,
  lense: ['inner1'],
  map: data => data.inner2
})

// type Lense<T extends {}, L extends keyof T> = {
//   lense: L,
//   data: T,
//   map: (pick:T[L]) => T[L]
// }

// const foo:Lense = {

// }
describe.skip('proxy', () => {
  it('works', () => {
    const container = createProxyContainer()
    const obj = {
      l1: {
        l2: [{foo:'bar'} as any]
      }
    }
    const o = container.createProxy(obj)
    o.l1.l2[0].foo = 'xy'
    o.l1.l2.push({bar: 'tar'})

    console.log(container.reads)
    console.log(container.writes)
    console.log(o.l1.l2[0].foo)
    console.log(obj.l1.l2[0].foo)
  })
})

function createProxyContainer () {
  const reads = new Set<string>()
  const writes = new Map<string,any>()
  const proxies = new Map<string,any>()
  function createProxy <T extends object>(obj:T, parentPath=''):T {
    const proxy = new Proxy(obj, {
      get(target, prop) {
        const path = parentPath + '.' + prop.toString()
        reads.add(path)
        const child = target[prop]
        switch(typeof child) {
          case 'bigint':
          case 'boolean':
          case 'function':
          case 'number':
          case 'string':
          case 'symbol':
          case 'undefined':
            return child
          case 'object': {
            if(child === null) return child
            if(proxies.has(path)) return proxies.get(path)
            const childProxy = createProxy({...child}, path)
            proxies.set(path, childProxy)
            return childProxy
          }
        }
      },
      set(target, prop, value) {
        const path = parentPath + '.' + prop.toString()
        writes.set(path, value)
        target[prop] = value
        return true
      }
    })
    return proxy
  }

  return {
    createProxy,
    reads,
    writes
  }
}

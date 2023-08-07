
export function removeItem <Item>(list:Item[], item:Item) {
  let i, j

  for (i = 0, j = 0; i < list.length; ++i) {
    if (item !== list[i]) {
      list[j] = list[i]
      j++
    }
  }

  if(j < i) list.pop()
}

type AT<T> = T extends { type: infer D } ? D : never
type A<LIST,TYPE> = LIST extends { type: TYPE } ? LIST : never

export function createEventContainer<T extends {type:string}>() {
  const onceList:Record<string,any> = {}
  const onList:Record<string,any> = {}
  
  return {
    once<TYPE extends AT<T>>(type:TYPE, cb:(event:A<T,TYPE>)=>void){
      if(!onceList[type]) onceList[type] = []
      onceList[type].push(cb)
      return () => removeItem(onceList[type], cb)
    },
    on<TYPE extends AT<T>>(type:TYPE, cb:(event:A<T,TYPE>)=>void){
      if(!onList[type]) onList[type] = []
      onList[type].push(cb)
      return () => removeItem(onList[type], cb)
    },
    trigger(event:T){
      let i = 0
      const once = onceList[event.type]
      const on = onList[event.type]

      if(once){
        onceList[event.type] = []
        for(i=0;i<once.length;i++){
          const cb = once[i]
          cb(event)
        }
      }
      if(on){
        for(i=0;i<on.length;i++){
          const cb = on[i]
          cb(event)
        }
      }
    },
    offOnce(type:AT<T>, cb:(event:T)=>void) {
      removeItem(onceList[type], cb)
    },
    clearOnce(type:AT<T>){
      onceList[type] = []
    }
  }
}
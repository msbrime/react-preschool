export function computeMaxScore (questions) {
  let score = 0

  for (let question in questions) {
    score += (questions[question].options.length - 1)
  }

  return score
}

export function createRandomizer() {
  const store = typeof window !== "undefined" ? inflate() : new Map();
  
  function serialize(){
    return encodeURIComponent(JSON.stringify(Array.from(store)))
  }
  
  function inflate(){
    const initialStoreData = JSON.parse(decodeURIComponent(window?.__SERIALIZED_RANDOMS || "[]"));
    return new Map(initialStoreData);
  }
  
  function useRandomiseFrom({name, items}){
    if(!store.has(name)){
      store.set(name, {
        current: null,
        selected: [],
        unselected: items,
        count: items.length
      })
    }
    return select(name);
  }
  
  function select(name){
    let {current, selected, unselected, count} = store.get(name);
    if(current && typeof window == "undefined"){
      return current
    }
  
    if(selected.length === count){
      reset(name)
    }
    ({current, selected, unselected, count} = store.get(name));
    if(current){
      const candidate = current
      store.set(name, {
        ...store.get(name),
        current:null,
        selected: [...selected, candidate],
        unselected
      });
      return candidate
    }
  
    const candidateIndex = Math.floor((Math.random() * unselected.length))
    const candidate = unselected[candidateIndex];
    unselected.splice(candidateIndex,1)
    store.set(name, {
      ...store.get(name),
      current: typeof window !== "undefined" ?  null : candidate,
      selected: typeof window !== "undefined" ?  [...selected, candidate] : selected,
      unselected
    })
    return candidate;
  }
  
  function reset(name){
    if(store.has(name)){
      const value = store.get(name);
      store.set(name, {
        current: null,
        selected: [],
        unselected: value.selected,
        count: value.selected.length
      })
    }
  }

  return {
    serialize,
    inflate,
    useRandomiseFrom
  }
} 
import { initializeApp } from 'firebase/app'
import { useSyncExternalStore } from 'react'
import { getDatabase, ref, onValue, onChildAdded, get } from 'firebase/database'
import config from './config.mjs'

initializeApp(config);
let database = getDatabase();
const store = typeof window !== "undefined" ? inflate() : new Map();
const listeners = new Map();

export async function valueOf(reference){
  if (store.has(reference)) return store.get(reference);
  store.set(reference,{})
  return new Promise((resolve) => {
    get(ref(database, reference)).then(snapshot => {
      if(snapshot.exists()){
        store.set(reference,snapshot.val())
        resolve(store.get(reference))
      } else {
        resolve(store.get(reference))
      }
    })
  });
}

export function serialize(){
  return encodeURIComponent(JSON.stringify(Array.from(store)))
}

export function inflate(){
  const initialStoreData = JSON.parse(decodeURIComponent(window?.__SERIALIZED_STORE || "[]"));
  return new Map(initialStoreData);
}

export function useFirebaseSnapshot(reference) {
  loadSnapshot(reference);
  return useSyncExternalStore(
    subscribeToReference(reference),
    getSnapshotForReference(reference),
    getServerSnapshot(reference)
  )
}

function subscribeToReference(reference) {
  return (listener) => {
    listeners.set(reference, [...listeners.get(reference) || [], listener]);
    return () => {
      const listenersForReference = listeners.get(reference) || [];
      listeners.set(reference, listenersForReference.filter(l => l !== listener))
    };
  }
}

function getSnapshotForReference(reference) {
  return () => store.get(reference)
}

function emitChange(reference) {
  for (let listener of listeners.get(reference) || []) {
    listener();
  }
}

function loadSnapshot(reference) {
  if(store.has(reference)) return;
  store.set(reference,{})
  onValue(ref(database, reference), snapshot => {
    const data = store.get(reference);
    store.set(reference, { ...data, ...snapshot.val() });
    emitChange(reference);

    onChildAdded(ref(database, reference), snapshot => {
      const child = snapshot.val()
      const data = store.get(reference);
      if (!data[child.id]) {
        data[child.id] = child;
        store.set(reference,data)
        emitChange(reference);
      }
    })
  });
}

function getServerSnapshot(reference){
  return () => store.get(reference)
}

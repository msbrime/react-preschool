import { initializeApp } from 'firebase/app'
import { useSyncExternalStore } from 'react'
import { getDatabase, ref, onValue, onChildAdded } from 'firebase/database'
import config from './config'

initializeApp(config);
let database = getDatabase();
const store = new Map();
const listeners = new Map();

export function useFirebaseSnapshot(reference) {
  loadSnapshot(reference);
  return useSyncExternalStore(
    subscribeToReference(reference),
    getSnapshotForReference(reference)
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
  if(store.get(reference)) return;
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

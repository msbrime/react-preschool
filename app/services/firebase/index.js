import { initializeApp } from 'firebase/app'
import { useSyncExternalStore } from 'react'
import { getDatabase, ref, onValue, onChildAdded } from 'firebase/database'
import config from './config'

initializeApp(config);
let database = getDatabase();
let questions = {};
let listeners = [];

export function useQuestionStore() {
  return useSyncExternalStore(subscribe,getSnapshot)
}

function subscribe (listener) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}

function getSnapshot(){
  return questions;
}

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

onValue(ref(database, "questions"), snapshot => {
  questions = {...questions,...snapshot.val()}
  console.log(questions)
  emitChange();

  onChildAdded(ref(database, "questions"), snapshot => {
    const child = snapshot.val()
    if(!questions[child.id]){
      questions[child.id] = child;
      emitChange();
    }

  })
});

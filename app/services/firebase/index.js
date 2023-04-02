import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'
import config from './config'

const fbInstance = initializeApp(config);
let database = getDatabase();

export function getInstance () {
  return fbInstance
}

export function read(reference, callback){
  onValue(ref(database, reference), snapshot => {
    callback(snapshot.val());
  })
}
let fbInstance = {
  read(){

  },
  auth(){

  }
}


export default function firebaseInstance () {
  if (!fbInstance) {
    fbInstance = initializeFb()
  }

  return fbInstance
}

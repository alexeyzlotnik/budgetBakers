import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export const config = {
  // Firebase config
  firebase: {
    apiKey: 'AIzaSyCtwk7aYnIww55UpVYyLNHfa19ObX3Pv1k',
    authDomain: 'budgetbakery-de6d0.firebaseapp.com',
    databaseURL: 'https://budgetbakery-de6d0-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'budgetbakery-de6d0',
    storageBucket: 'budgetbakery-de6d0.appspot.com',
    messagingSenderId: '803121692399',
    appId: '1:803121692399:web:760dc1169312923efaa51a',
    measurementId: 'G-B418BYVHJ3'
  }
}

// Initialize Firebase
const firebaseApp = initializeApp(config.firebase)
//initialize firebase auth
const auth = getAuth()

export { firebaseApp, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }

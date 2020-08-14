import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
    apiKey: "AIzaSyCJKeWBZeAnqKYRS6xzh4PNtTKYknNOFME",
    authDomain: "soft-goal.firebaseapp.com",
    databaseURL: "https://soft-goal.firebaseio.com",
    projectId: "soft-goal",
    storageBucket: "soft-goal.appspot.com",
    messagingSenderId: "702734644087",
    appId: "1:702734644087:web:5f1cc2bf8a718d2431e772",
    measurementId: "G-FY4GPZY5KD"
  };
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const goalInfoCollection = db.collection('goal-info')
const stepsCollection = db.collection('steps')
const userInfoCollection = db.collection('user-info')
const marginCollection = db.collection('margins')

// export utils/refs
export {
  db,
  auth,
  goalInfoCollection,
  stepsCollection,
  userInfoCollection,
  marginCollection
}
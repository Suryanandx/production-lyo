import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'


var config = {
   apiKey: "AIzaSyDf7MGCZNYZhBRu4XpB1QtYciGhVTdXCe4",
    authDomain: "fir-app-f4e99.firebaseapp.com",
    projectId: "fir-app-f4e99",
    storageBucket: "fir-app-f4e99.appspot.com",
    messagingSenderId: "258265038905",
    appId: "1:258265038905:web:c50a51c3f4b1579981cde8",
    measurementId: "G-2DH8KEHHCK"
}

const app = firebase.initializeApp(config)
export const auth = app.auth()
export const storage = app.storage();//storage
export const storageRef = storage.ref()
export const db = app.firestore();
export const database = app.database()
export default app
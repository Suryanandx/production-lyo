import firebase from 'firebase'
import 'firebase/database'

var secondaryAppConfig = {
    apiKey: "AIzaSyCT2GYp_dWJSFu57VklsO-4jpnBZEy5_OE",
    authDomain: "glass-d8bf7.firebaseapp.com",
    databaseURL: "https://glass-d8bf7-default-rtdb.firebaseio.com",
    projectId: "glass-d8bf7",
    storageBucket: "glass-d8bf7.appspot.com",
    messagingSenderId: "145302820149",
    appId: "1:145302820149:web:32cf4fdcfe027e3a8a287c",
    measurementId: "G-MDEDMF6H6G"
}

const secondaryApp = firebase.initializeApp(secondaryAppConfig, "secondary");
export const databased = secondaryApp.database()

export default secondaryApp
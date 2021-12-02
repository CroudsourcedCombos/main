// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import dotenv from 'dotenv'
// dotenv.config()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv2Kn2apOCA3A8o4Bv8mF2QFol5FzUCWs",
  authDomain: "crowdsourcedcombos.firebaseapp.com",
  projectId: "crowdsourcedcombos",
  storageBucket: "crowdsourcedcombos.appspot.com",
  appId: "1:990214478016:web:daf58957d77a25f45a7525",
  messagingSenderId: "990214478016",
  measurementId: "G-B8EN0BFSN0",
}

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig)

// Export our initialize firebase app
export default Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import dotenv from 'dotenv'
// dotenv.config()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_APP_ID,
messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig)

// Export our initialize firebase app
export default Firebase
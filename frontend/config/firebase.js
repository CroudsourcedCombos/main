// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import dotenv from 'dotenv'
dotenv.config()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  appId: process.env.APP_ID,
}

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig)

// Export our initialize firebase app
export default Firebase
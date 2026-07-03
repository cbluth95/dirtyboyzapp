import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'YOUR_PROJECT.firebaseapp.com',
  databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://YOUR_PROJECT.firebaseio.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'YOUR_PROJECT.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'YOUR_SENDER_ID',
  appId: process.env.FIREBASE_APP_ID || 'YOUR_APP_ID'
}

let app, database, auth

if (process.client) {
  app = initializeApp(firebaseConfig)
  database = getDatabase(app)
  auth = getAuth(app)
}

export { app, database, auth }
